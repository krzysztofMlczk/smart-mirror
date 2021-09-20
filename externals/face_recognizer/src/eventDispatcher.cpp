#include "eventDispatcher.hpp"

EventDispatcher::EventDispatcher(uint16_t communicationPort, FaceDetector *faceDetector)
    : communicatorListener(communicationPort), communicatorSender(communicationPort),
      m_faceDetector(faceDetector)
{
    communicatorListener.AddEventObserver(this);
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
    if (m_eventQueue.size())
    {
        IEvent *evt = m_eventQueue.front();
        m_eventQueue.pop();

        DispatchEvent(evt);
    }
}

void EventDispatcher::DispatchEvent(IEvent *evt)
{
#define EVT_CASE_BEGIN(name)     \
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
    EVT_CASE_BEGIN(EventStartRecognize)
    m_faceDetector->SwitchMode(DetectorMode::RECOGNITION);
    EVT_CASE_END

    EVT_CASE_BEGIN(EventStartRegister)
    m_faceDetector->SwitchMode(DetectorMode::REGISTRATION);
    EVT_CASE_END

    EVT_CASE_BEGIN(EventSleep)
    m_faceDetector->Sleep();
    EVT_CASE_END

    EVT_CASE_BEGIN(EventWakeup)
    m_faceDetector->Wakeup();
    EVT_CASE_END

    EVT_CASE_BEGIN(EventStop)
    m_faceDetector->Stop();
    EVT_CASE_END

#undef EVT_CASE_BEGIN
#undef EVT_CASE_END
}