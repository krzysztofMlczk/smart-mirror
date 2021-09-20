#pragma once

#include "thread.hpp"
#include "eventObservable.hpp"
#include <arpa/inet.h>

class CommunicatorListenerThread : public IThread, public IEventObservable
{
public:
    CommunicatorListenerThread(uint16_t port) : m_port(port){};
    virtual ~CommunicatorListenerThread() = default;

private:
    uint16_t BUFFER_SIZE = 255;

    uint16_t m_port;
    int m_socketFD;
    struct sockaddr_in m_address;

    virtual void ThreadFunction() override;

    virtual void ThreadPreStart() override;
    virtual void ThreadPreExit() override;
};