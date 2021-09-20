#pragma once

#include <imgproc.hpp>
#include "eventObservable.hpp"
#include "faceFrame.hpp"

class ImageCropper final : public IEventObservable
{
public:
    ImageCropper(ImageCropper &) = delete;
    ~ImageCropper() = default;

    void operator=(const ImageCropper &) = delete;

    static ImageCropper &GetInstance();

    bool CropImage(FaceFrame &frameData, uint32_t destImageSize) const;

private:
    ImageCropper() = default;

    static ImageCropper *m_instance;

    cv::Vec2d rotateAround(const cv::Vec2d &p, const cv::Vec2d &pivotPoint, float angle) const;
};