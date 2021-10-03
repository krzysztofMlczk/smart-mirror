#pragma once

#include <cstdint>
#include <cstdlib>

#include "user.hpp"
#include "faceDetectionModes.hpp"

struct AppSettings
{
  bool _isValid = true;
  const char *executablePath = nullptr;
  uint8_t cameraId = 0;
  uint16_t portSend = 8080;
  uint16_t portReceive = 8081;
  uint16_t socketBufferSize = 255;
  DetectorMode detectorMode = DetectorMode::RECOGNITION;
  User user;
};

AppSettings parseParams(size_t argc, const char **argv, bool failSilently = false);
bool setParam(AppSettings &settings, const char **params, size_t paramsSize, size_t &currentPos);
