#pragma once

#include <utility>
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

  bool CropImage(cv::Mat &image, uint32_t destImageSize, std::pair<cv::Point, cv::Point> &eyesPosition) const;

private:
  ImageCropper() = default;

  static ImageCropper *m_instance;

  cv::Vec2d rotateAround(const cv::Vec2d &p, const cv::Vec2d &pivotPoint, float angle) const;
};
