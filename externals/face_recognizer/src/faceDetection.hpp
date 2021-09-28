#pragma once

#include <cstdint>
#include <string>
#include <vector>
#include <cmath>
#include <fstream>
#include <vector>

#include <objdetect.hpp>
#include <highgui.hpp>
#include <imgproc.hpp>
#include <face.hpp>

#include "faceFrame.hpp"
#include "fileSystem.hpp"
#include "faceDetectionModes.hpp"
#include "module.hpp"

using namespace cv;

struct DetectionParams
{
  float scaleFactor;
  uint8_t minNeighbours;
  int flags;
  uint16_t minSize;
};

class FaceDetector final : public IModule
{
public:
  FaceDetector(DetectorMode mode);
  FaceDetector(DetectorMode mode, uint8_t cameraIndex);

  virtual ~FaceDetector();

  virtual bool Init() override;
  virtual void Update() override;
  virtual void Stop() override;

  void SwitchMode(DetectorMode mode);

private:
  IFaceDetectionMode *m_mode;

  const size_t MAX_FRAMES = 25;
  const size_t FRAME_SIZE = 128;
  double PREDICTION_TRESHOLD = 100.0;

  VideoCapture m_capture;
  CascadeClassifier m_cascade, m_nestedCascade;
  Ptr<face::FaceRecognizer> m_model;

  const uint8_t m_cameraIndex;

  // Face detection params
  float m_scale = 1.0f;
  DetectionParams m_paramsFace;
  DetectionParams m_paramsEyes;

  std::vector<FaceFrame> m_detectedFrames;

  void ToGrayScale(Mat &img);
  bool ExtractFace(const Mat &img, Mat &extractedFace, Vec2i &extractionOffset);
  bool GetEyesPosition(const Mat &&img, std::pair<Point, Point> &eyesPosition);
  bool ApplyCropping(Mat &img, std::pair<Point, Point> &eyesPosition);

  void Train();
  bool Recognize(const Mat &&image, int &label, double &confidence);
  bool Register(const Mat &&image, const std::pair<Point, Point> &eyesPosition);

  bool PushFrame(const FaceFrame &frame);
  static void CleanUpFrames(std::vector<FaceFrame> &frames);

  void SetMode(DetectorMode mode);
  void SetupParams();
  void Cleanup();

  std::vector<Mat> ExtrudeImages(const std::vector<FaceFrame> &frames);
  std::vector<int> ExtrudeLabels(const std::vector<FaceFrame> &frames);

  friend class FaceDetectionModeRecognize;
  friend class FaceDetectionModeRegister;
};
