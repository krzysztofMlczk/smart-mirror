#include "eventDispatcher.hpp"

EventDispatcher::EventDispatcher(AppSettings settings, FaceDetector *faceDetector)
    : communicatorListener(settings.portReceive, settings.socketBufferSize),
      communicatorSender(settings.portSend, settings.socketBufferSize),
      m_faceDetector(faceDetector)
{
  communicatorListener.AddEventObserver(this);
  communicatorListener.Start();
  communicatorSender.Start();
}

EventDispatcher::~EventDispatcher()
{
  communicatorSender.Stop();
  communicatorListener.Stop();
}

void EventDispatcher::NotifyAbout(IEvent *event)
{
  // Run on main and communicatorListener threads
  m_mutexNotify.lock();
  m_eventQueue.push(event);
  m_mutexNotify.unlock();
}

void EventDispatcher::Dispatch()
{
  // Run on main thread
  while (!m_eventQueue.empty())
  {
    m_mutexNotify.lock();
    IEvent *evt = m_eventQueue.front();
    m_eventQueue.pop();
    m_mutexNotify.unlock();

    DispatchEvent(evt);
  }
}

void EventDispatcher::DispatchEvent(IEvent *evt)
{
#define EVT_CASE_BEGIN(name)   \
  if (evt->GetName() == #name) \
  {
#define EVT_CASE_END }

  // ----- FROM FACE DETECTOR -----
  EVT_CASE_BEGIN(evtProgressReport)
  communicatorSender.sendEvent(evt);
  EVT_CASE_END

  EVT_CASE_BEGIN(evtErrorOccured)
  communicatorSender.sendEvent(evt);
  EVT_CASE_END

  EVT_CASE_BEGIN(evtFatalOccured)
  communicatorSender.sendEvent(evt);
  EVT_CASE_END

  EVT_CASE_BEGIN(evtFaceRecognized)
  communicatorSender.sendEvent(evt);
  EVT_CASE_END

  EVT_CASE_BEGIN(evtUserRegistered)
  communicatorSender.sendEvent(evt);
  EVT_CASE_END

  // ----- FROM ELECTRON -----
  EVT_CASE_BEGIN(evtStartRecognize)
  LOG_INFO("Switching mode to recognize");
  m_faceDetector->SwitchMode(DetectorMode::RECOGNITION);
  EVT_CASE_END

  EVT_CASE_BEGIN(evtStartRegister)
  LOG_INFO("Switching mode to register");
  m_faceDetector->SwitchMode(DetectorMode::REGISTRATION);

  User user;
  user._isValid = true;
  user.username = (static_cast<EventStartRegister *>(evt))->m_username;

  FileSystem::GetInstance().SetCurrentUser(user);
  EVT_CASE_END

  EVT_CASE_BEGIN(evtSleep)
  LOG_INFO("Sending module to sleep");
  m_faceDetector->Sleep();
  EVT_CASE_END

  EVT_CASE_BEGIN(evtWakeup)
  LOG_INFO("Waking up the module");
  m_faceDetector->Wakeup();
  EVT_CASE_END

  EVT_CASE_BEGIN(evtStop)
  LOG_INFO("Stopping the module");
  m_faceDetector->Stop();
  EVT_CASE_END

#undef EVT_CASE_BEGIN
#undef EVT_CASE_END
}
