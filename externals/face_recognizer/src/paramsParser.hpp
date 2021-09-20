#pragma once

#include <cstdint>
#include <cstdlib>

#include "user.hpp"
#include "faceDetectionModes.hpp"

struct AppSettings
{
    bool _isValid = true;
    uint8_t cameraId = 0;
    uint16_t port = 8080;
    DetectorMode detectorMode = DetectorMode::INVALID;
    User user;
};

AppSettings parseParams(size_t argc, const char **argv, bool failSilently = false);
bool setParam(AppSettings &settings, const char **params, size_t paramsSize, size_t &currentPos);