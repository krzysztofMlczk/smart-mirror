#include "faceDetectionModes.hpp"
#include "macros.hpp"
#include "faceDetection.hpp"
#include "events.hpp"

#include <tuple>

using namespace event;

bool FaceDetectionModeRegister::OnInit(void *data)
{
  LOG_INFO("Started in register mode");
  return true;
}

void FaceDetectionModeRegister::OnUpdate(void *data)
{
  std::tuple<Mat *, Mat *, Vec2i> *_data = static_cast<std::tuple<Mat *, Mat *, Vec2i> *>(data);
  Mat &frame = *std::get<0>(*_data);
  Mat &face = *std::get<1>(*_data);
  Vec2i offset = std::get<2>(*_data);

  std::pair<Point, Point> eyesPosition;

  if (m_instance->PreprocessFrame(frame, eyesPosition, offset, std::move(face)))
  {
    m_instance->Register(std::move(frame), eyesPosition);

    LOG_INFO("Frame %ld/%ld : Detected eyes at (x=%d, y=%d), (x=%d, y=%d)",
             m_instance->m_detectedFrames.size(), m_instance->MAX_FRAMES,
             eyesPosition.first.x, eyesPosition.first.y,
             eyesPosition.second.x, eyesPosition.second.y);

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
  std::tuple<Mat *, Mat *, Vec2i> *_data = static_cast<std::tuple<Mat *, Mat *, Vec2i> *>(data);
  Mat &frame = *std::get<0>(*_data);
  Mat &face = *std::get<1>(*_data);
  Vec2i offset = std::get<2>(*_data);

  std::pair<Point, Point> eyesPosition;

  if (m_instance->PreprocessFrame(frame, eyesPosition, offset, std::move(face)))
  {
    User user;

    if (m_instance->Recognize(std::move(frame), user))
    {
      IEvent *event = new EventFaceRecognized(user.username);
      m_instance->NotifyObserversAbout(event);
    }
  }
}

void FaceDetectionModeRecognize::OnStop()
{
}
