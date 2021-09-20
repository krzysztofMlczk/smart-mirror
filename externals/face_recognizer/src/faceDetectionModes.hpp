#pragma once

class FaceDetector;

enum class DetectorMode
{
    RECOGNITION,
    REGISTRATION,
    INVALID
};

class IFaceDetectionMode
{
public:
    IFaceDetectionMode(FaceDetector *instance) : m_instance(instance){};
    virtual ~IFaceDetectionMode() = default;

    virtual bool OnInit(void *data = nullptr) = 0;
    virtual void OnUpdate(void *data = nullptr) = 0;
    virtual void OnStop() = 0;

protected:
    FaceDetector *m_instance;
};

class FaceDetectionModeRegister : public IFaceDetectionMode
{
public:
    FaceDetectionModeRegister(FaceDetector *instance) : IFaceDetectionMode(instance){};
    virtual ~FaceDetectionModeRegister() = default;

    virtual bool OnInit(void *data = nullptr) override;
    virtual void OnUpdate(void *data = nullptr) override;
    virtual void OnStop() override;
};

class FaceDetectionModeRecognize : public IFaceDetectionMode
{
public:
    FaceDetectionModeRecognize(FaceDetector *instance) : IFaceDetectionMode(instance){};
    virtual ~FaceDetectionModeRecognize() = default;

    virtual bool OnInit(void *data = nullptr) override;
    virtual void OnUpdate(void *data = nullptr) override;
    virtual void OnStop() override;
};