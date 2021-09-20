#pragma once

#include "eventObserver.hpp"
#include "faceDetection.hpp"
#include "communicatorListener.hpp"
#include "communicatorSender.hpp"

#include <mutex>
#include <queue>

using namespace event;

class EventDispatcher : public IEventObserver
{
public:
    EventDispatcher(uint16_t communicationPort, FaceDetector *faceDetector);
    ~EventDispatcher() = default;

    virtual void NotifyAbout(IEvent *event) override;
    void Dispatch();

private:
    CommunicatorListenerThread communicatorListener;
    CommunicatorSenderThread communicatorSender;
    FaceDetector *m_faceDetector;

    std::mutex m_mutexNotify;
    std::queue<IEvent *> m_eventQueue;

    void DispatchEvent(IEvent *evt);
};