#include "faceDetectionModes.hpp"
#include "macros.hpp"
#include "faceDetection.hpp"
#include "events.hpp"

using namespace event;

bool FaceDetectionModeRegister::OnInit(void *data)
{
  LOG_INFO("Started in register mode");
  return true;
}

void FaceDetectionModeRegister::OnUpdate(void *data)
{
  std::pair<Mat *, Mat *> *_data = static_cast<std::pair<Mat *, Mat *> *>(data);
  Mat &frame = *_data->first;
  Mat &face = *_data->second;

  std::pair<Point, Point> eyesPosition;

  if (m_instance->GetEyesPosition(std::move(face), eyesPosition))
  {
    m_instance->Register(std::move(frame), eyesPosition);
    LOG_INFO("Detected eyes at (x=%d, y=%d), (x=%d, y=%d)", eyesPosition.first.x, eyesPosition.first.y, eyesPosition.second.x, eyesPosition.second.y);

    IEvent *event = new EventProgressReport(m_instance->m_detectedFrames.size(), m_instance->MAX_FRAMES);
    m_instance->NotifyObserversAbout(event);
  }

  // Check if already collected enough frames
  if (m_instance->m_detectedFrames.size() == m_instance->MAX_FRAMES)
  {
    FileSystem::GetInstance().WriteFrames(m_instance->m_detectedFrames);

    IEvent *evt = new EventUserRegistered(FileSystem::GetInstance().GetCurrentUser().username);
    m_instance->NotifyObserversAbout(evt);

    // After completing thee registration, put the module to sleep
    m_instance->Sleep();
  }
}

void FaceDetectionModeRegister::OnStop()
{
}

bool FaceDetectionModeRecognize::OnInit(void *data)
{
  LOG_INFO("Started in recognize mode");
  LOG_INFO("Beginning training...");
  m_instance->Train();
  LOG_INFO("Training ended");

  return true;
}

void FaceDetectionModeRecognize::OnUpdate(void *data)
{
  std::pair<Mat *, Mat *> *_data = static_cast<std::pair<Mat *, Mat *> *>(data);
  Mat &face = *_data->second;

  int label;
  double confidence;

  if (m_instance->Recognize(std::move(face), label, confidence))
  {
    User user = FileSystem::GetInstance().GetUserByHash(label);
    IEvent *event = new EventFaceRecognized(user.username, confidence);
    m_instance->NotifyObserversAbout(event);
  }
}

void FaceDetectionModeRecognize::OnStop()
{
}
