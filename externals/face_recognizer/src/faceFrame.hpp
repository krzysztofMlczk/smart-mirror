#pragma once

#include <imgproc.hpp>
#include <opencv.hpp>
#include "serializable.hpp"

struct FrameMetadata : ISerializable
{
    cv::Point leftEyePosition;
    cv::Point rightEyePosition;
    int label;

    virtual void Serialize(std::ostream &outStream) const override;
    virtual void Deserialize(std::istream &inStream) override;
};

struct FaceFrame : ISerializable
{
    cv::Mat frameImage;
    FrameMetadata metadata;

    virtual void Serialize(std::ostream &outStream) const override;
    virtual void Deserialize(std::istream &inStream) override;
};
