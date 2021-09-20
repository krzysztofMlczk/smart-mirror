#include "faceDetection.hpp"
#include "imageCropper.hpp"
#include "macros.hpp"

using namespace event;

FaceDetector::FaceDetector(DetectorMode mode)
    : m_cameraIndex(0)
{
    SetMode(mode);
}

FaceDetector::FaceDetector(DetectorMode mode, uint8_t cameraIndex)
    : m_cameraIndex(cameraIndex)
{
    SetMode(mode);
}

FaceDetector::~FaceDetector()
{
    delete m_mode;
}

bool FaceDetector::Init()
{
    if (!m_mode)
    {
        std::string errorMessage = "No mode for detector was specified!";
        LOG_ERROR("%s", errorMessage.c_str());
        NotifyObserversAbout(new EventErrorOccured(errorMessage));
        return false;
    }

    LOG_INFO("Launching the face detector...");

    m_detectedFrames.reserve(MAX_FRAMES);

    // Load classifiers from "haarcascades" directory
    m_nestedCascade.load("./share/opencv4/haarcascades/haarcascade_eye_tree_eyeglasses.xml");
    m_cascade.load("./share/opencv4/haarcascades/haarcascade_frontalcatface.xml");

    m_mode->OnInit();

    // Start capturing
    m_capture.open(m_cameraIndex);

    m_isRunning = m_capture.isOpened();
    return m_isRunning;
}

void FaceDetector::Update()
{
    if (m_isSleeping)
    {
        return;
    }

    Mat frame;
    m_capture >> frame;
    ToGrayScale(frame);

    if (!frame.empty())
    {
        Mat face;

        if (ExtractFace(frame, face))
        {
            std::pair<Mat *, Mat *> _data(&frame, &face);
            m_mode->OnUpdate((void *)&_data);
        }
    }
}

void FaceDetector::Stop()
{
    m_mode->OnStop();
    m_isRunning = false;
}

void FaceDetector::SwitchMode(DetectorMode mode)
{
    Cleanup();
    SetMode(mode);
}

void FaceDetector::ToGrayScale(Mat &img)
{
    // Convert to Gray Scale
    cvtColor(img, img, COLOR_BGR2GRAY);
}

bool FaceDetector::ExtractFace(const Mat &img, Mat &extractedFace)
{
    std::vector<Rect> faces;
    extractedFace = img;

    double fx = 1 / m_scale;

    // Resize the Image
    resize(extractedFace, extractedFace, Size(), fx, fx, INTER_LINEAR);
    equalizeHist(extractedFace, extractedFace);

    // Detect faces of different sizes using cascade classifier
    m_cascade.detectMultiScale(extractedFace, faces, 1.1,
                               2, 0 | CASCADE_SCALE_IMAGE, Size(30, 30));

    // Pick up the biggest one from all detected regions,
    // because there's the highest chance that it'll be a face region
    Rect face;
    float diagonal = 0;
    for (const Rect &region : faces)
    {
        float newDiagonal = sqrt(region.width * region.width + region.height * region.height);

        if (newDiagonal > diagonal)
        {
            diagonal = newDiagonal;
            face = region;
        }
    }

    // If a face was found, we extract it
    if (diagonal > 0)
    {
        if (m_nestedCascade.empty())
            return false;

        extractedFace = extractedFace(face);
        return true;
    }

    return false;
}

bool FaceDetector::GetEyesPosition(const Mat &&img, std::pair<Point, Point> &eyesPosition)
{
    Rect face(0, 0, img.size().width, img.size().height);

    // Detection of eyes int the input image
    std::vector<Rect> nestedObjects;
    m_cascade.detectMultiScale(img, nestedObjects, 1.1, 2,
                               0 | CASCADE_SCALE_IMAGE, Size(30, 30));

    if (nestedObjects.size() == 2)
    {
        Rect leftEyeRect = (nestedObjects[0].x < nestedObjects[1].x) ? nestedObjects[0] : nestedObjects[1];
        Rect rightEyeRect = (nestedObjects[0].x < nestedObjects[1].x) ? nestedObjects[1] : nestedObjects[0];
        Point leftEyeCenter, rightEyeCenter;

        leftEyeCenter.x = cvRound((face.x + leftEyeRect.x + leftEyeRect.width * 0.5) * m_scale);
        leftEyeCenter.y = cvRound((face.y + leftEyeRect.y + leftEyeRect.height * 0.5) * m_scale);

        rightEyeCenter.x = cvRound((face.x + rightEyeRect.x + rightEyeRect.width * 0.5) * m_scale);
        rightEyeCenter.y = cvRound((face.y + rightEyeRect.y + rightEyeRect.height * 0.5) * m_scale);

        eyesPosition = std::pair<Point, Point>(leftEyeCenter, rightEyeCenter);
        return true;
    }

    return false;
}

bool FaceDetector::PushFrame(const FaceFrame &frame)
{
    if (m_detectedFrames.size() < MAX_FRAMES)
    {
        m_detectedFrames.push_back(std::move(frame));
        return true;
    }

    return false;
}

void FaceDetector::Train()
{
    // Read frames and their labels
    std::vector<FaceFrame> frames = FileSystem::GetInstance().LoadFrames();

    std::vector<Mat> images = ExtrudeImages(frames);
    std::vector<int> labels = ExtrudeLabels(frames);

    LOG_INFO("Face dataset was loaded");

    // Create a FaceRecognizer and train it on the given images:
    m_model = cv::face::LBPHFaceRecognizer::create();
    m_model->train(images, labels);
}

bool FaceDetector::Recognize(const Mat &&image, int &predictedLabel, double &confidence)
{
    predictedLabel = -1;
    confidence = 0.0;
    m_model->predict(image, predictedLabel, confidence);

    if (confidence >= PREDICTION_TRESHOLD)
    {
        LOG_INFO("Prediction: %d, Confidence: %lf", predictedLabel, confidence);
        return true;
    }

    return false;
}

bool FaceDetector::Register(const Mat &&image, const std::pair<Point, Point> &eyesPosition)
{
    User currentUser = FileSystem::GetInstance().GetCurrentUser();
    int label = FileSystem::GetInstance().GetUserHash(currentUser);

    FrameMetadata meta;
    meta.leftEyePosition = eyesPosition.first;
    meta.rightEyePosition = eyesPosition.second;
    meta.label = label;

    FaceFrame frame;
    frame.frameImage = image;
    frame.metadata = meta;

    if (!ImageCropper::GetInstance().CropImage(frame, FRAME_SIZE))
    {
        return false;
    }

    return PushFrame(std::move(frame));
}

void FaceDetector::CleanUpFrames(std::vector<FaceFrame> &frames)
{
    Point meanLeftEyePos(0, 0);
    Point meanRightEyePos(0, 0);
    float standardDeviationLeftX = 0.f;
    float standardDeviationLeftY = 0.f;
    float standardDeviationRightX = 0.f;
    float standardDeviationRightY = 0.f;

    for (const auto &frame : frames)
    {
        meanLeftEyePos.x += frame.metadata.leftEyePosition.x;
        meanLeftEyePos.y += frame.metadata.leftEyePosition.y;

        meanRightEyePos.x += frame.metadata.rightEyePosition.x;
        meanRightEyePos.y += frame.metadata.rightEyePosition.y;
    }

    size_t size = frames.size();

    meanLeftEyePos.x /= size;
    meanLeftEyePos.y /= size;
    meanRightEyePos.x /= size;
    meanRightEyePos.y /= size;

    for (const auto &frame : frames)
    {
        standardDeviationLeftX += pow(frame.metadata.leftEyePosition.x - meanLeftEyePos.x, 2);
        standardDeviationLeftY += pow(frame.metadata.leftEyePosition.y - meanLeftEyePos.y, 2);
        standardDeviationRightX += pow(frame.metadata.rightEyePosition.x - meanRightEyePos.x, 2);
        standardDeviationRightY += pow(frame.metadata.rightEyePosition.y - meanRightEyePos.y, 2);
    }

    standardDeviationLeftX = sqrt(standardDeviationLeftX / 10.f);
    standardDeviationLeftY = sqrt(standardDeviationLeftY / 10.f);
    standardDeviationRightX = sqrt(standardDeviationRightX / 10.f);
    standardDeviationRightY = sqrt(standardDeviationRightY / 10.f);

    std::remove_if(frames.begin(), frames.end(),
                   [standardDeviationLeftX,
                    standardDeviationLeftY,
                    standardDeviationRightX,
                    standardDeviationRightY,
                    meanLeftEyePos,
                    meanRightEyePos](const FaceFrame &f)
                   {
                       return abs(f.metadata.leftEyePosition.x - meanLeftEyePos.x) < standardDeviationLeftX &&
                              abs(f.metadata.leftEyePosition.y - meanLeftEyePos.y) < standardDeviationLeftY &&
                              abs(f.metadata.rightEyePosition.x - meanRightEyePos.x) < standardDeviationRightX &&
                              abs(f.metadata.rightEyePosition.x - meanRightEyePos.x) < standardDeviationRightY;
                   });
}

void FaceDetector::SetMode(DetectorMode mode)
{
    switch (mode)
    {
    case DetectorMode::REGISTRATION:
        m_mode = new FaceDetectionModeRegister(this);
        break;

    case DetectorMode::RECOGNITION:
        m_mode = new FaceDetectionModeRecognize(this);
        break;

    case DetectorMode::INVALID:
        ASSERT(false, "Provided invalid mode for FaceDetector or the mode was not specified at all!");
        break;

    default:
        ASSERT(false, "Provided unknown mode for FaceDetector!");
        break;
    }
}

void FaceDetector::Cleanup()
{
    m_detectedFrames.clear();
    m_capture.release();
    m_model.release();
    delete m_mode;
}

std::vector<Mat> FaceDetector::ExtrudeImages(const std::vector<FaceFrame> &frames)
{
    std::vector<Mat> images;

    for (const auto &frame : frames)
    {
        images.push_back(frame.frameImage);
    }

    return images;
}

std::vector<int> FaceDetector::ExtrudeLabels(const std::vector<FaceFrame> &frames)
{
    std::vector<int> labels;

    for (const auto &frame : frames)
    {
        labels.push_back(frame.metadata.label);
    }

    return labels;
}