#include "faceFrame.hpp"
#include "macros.hpp"

using namespace cv;

void FrameMetadata::Serialize(std::ostream &outStream) const
{
    outStream.write((char *)&leftEyePosition, sizeof(leftEyePosition));
    outStream.write((char *)&rightEyePosition, sizeof(rightEyePosition));
    outStream.write((char *)&label, sizeof(label));
}

void FrameMetadata::Deserialize(std::istream &inStream)
{
    inStream.read((char *)&leftEyePosition, sizeof(leftEyePosition));
    inStream.read((char *)&rightEyePosition, sizeof(rightEyePosition));
    inStream.read((char *)&label, sizeof(label));
}

void FaceFrame::Serialize(std::ostream &outStream) const
{
    int type = frameImage.type();
    int channels = frameImage.channels();

    // Mat header
    outStream.write((char *)&frameImage.rows, sizeof(frameImage.rows));
    outStream.write((char *)&frameImage.cols, sizeof(frameImage.cols));
    outStream.write((char *)&type, sizeof(type));
    outStream.write((char *)&channels, sizeof(channels));

    // Mat data
    if (frameImage.isContinuous())
    {
        outStream.write(frameImage.ptr<char>(0), frameImage.dataend - frameImage.datastart);
    }
    else
    {
        int rowSize = CV_ELEM_SIZE(type) * frameImage.cols;
        for (int row = 0; row < frameImage.rows; ++row)
        {
            outStream.write(frameImage.ptr<char>(row), rowSize);
        }
    }

    // Metadata
    metadata.Serialize(outStream);
}

void FaceFrame::Deserialize(std::istream &inStream)
{
    // Mat header
    int rows, cols, type, channels;
    inStream.read((char *)&rows, sizeof(rows));
    inStream.read((char *)&cols, sizeof(cols));
    inStream.read((char *)&type, sizeof(type));
    inStream.read((char *)&channels, sizeof(channels));

    // Mat data
    frameImage = Mat(rows, cols, type);
    inStream.read((char *)frameImage.data, CV_ELEM_SIZE(type) * rows * cols);

    // Metadata
    metadata.Deserialize(inStream);
}