#include "imageCropper.hpp"
#include <cmath>
#include <opencv.hpp>

#include "macros.hpp"

using namespace cv;
using namespace event;

ImageCropper *ImageCropper::m_instance = nullptr;

ImageCropper &ImageCropper::GetInstance()
{
    if (!m_instance)
    {
        m_instance = new ImageCropper;
    }

    return *m_instance;
}

bool ImageCropper::CropImage(FaceFrame &frameData, uint32_t destImageSize) const
{
    Mat img = frameData.frameImage;
    Vec2d eyeRight = {(double)frameData.metadata.rightEyePosition.x, (double)frameData.metadata.rightEyePosition.y};
    Vec2d eyeLeft = {(double)frameData.metadata.leftEyePosition.x, (double)frameData.metadata.leftEyePosition.y};

    // specify desired size
    uint32_t destSize[2] = {destImageSize, destImageSize};

    // get the direction
    Vec2d eyeDirection = eyeRight - eyeLeft;
    // calc rotation angle in radians
    float rotation = -atan2(eyeDirection[1], eyeDirection[0]);

    // rotate original image around the left eye
    // to make the vector between eyes a horizontal line
    Mat rotationMatrix = cv::getRotationMatrix2D(Point(eyeLeft[0], eyeLeft[1]), rotation, 1.0);
    cv::warpAffine(img, img, rotationMatrix, img.size());

    // update the position of right eye
    eyeRight = rotateAround(eyeRight, eyeLeft, rotation);

    // distance between eyes
    float dist = norm(eyeLeft - eyeRight);

    // crop the rotated image based on face proportions
    float faceCenterOffsetParam = 1.0f;
    float centerOffset = dist * faceCenterOffsetParam;

    Vec2d faceCenter = (eyeRight + eyeLeft) / 2.0;
    float faceWidth = 2.5 * dist;
    float faceHeight = 3.75 * dist - 0.5 * centerOffset;

    Vec2d cropUpperLeft, cropSize;

    cropUpperLeft[0] = faceCenter[0] - faceWidth / 2;
    cropUpperLeft[1] = faceCenter[1] - faceHeight / 2;

    cv::Rect cropRegion;
    cropRegion.x = MATH_MAX(cropUpperLeft[0], 0);
    cropRegion.y = MATH_MAX(cropUpperLeft[1], 0);
    cropRegion.width = MATH_MIN(faceWidth, img.size().width - cropRegion.x);
    cropRegion.height = MATH_MIN(faceHeight, img.size().height - cropRegion.y);

    if (cropRegion.width == 0 || cropRegion.height == 0)
    {
        std::string errorMessage = "CropImage failed: crop region is empty!";
        LOG_ERROR("%s", errorMessage.c_str());
        NotifyObserversAbout(new EventErrorOccured(errorMessage));
        return false;
    }

    img = img(cropRegion);

    // resize the image
    resize(img, img, Size(destSize[0], destSize[1]), INTER_LINEAR);

    frameData.frameImage = img;
    return true;
}

Vec2d ImageCropper::rotateAround(const Vec2d &p, const Vec2d &pivotPoint, float angle) const
{
    // Rotates point p around pivotPoint in 2D space
    Vec2d rotated;
    rotated[0] = ((p[0] - pivotPoint[0]) * cos(angle)) - ((p[1] - pivotPoint[1]) * sin(angle)) + pivotPoint[0];
    rotated[1] = ((p[0] - pivotPoint[0]) * sin(angle)) + ((p[1] - pivotPoint[1]) * cos(angle)) + pivotPoint[1];
    return rotated;
}