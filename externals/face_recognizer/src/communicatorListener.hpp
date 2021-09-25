#pragma once

#include "thread.hpp"
#include "eventObservable.hpp"
#include <arpa/inet.h>

class CommunicatorListenerThread : public IThread, public IEventObservable
{
public:
  CommunicatorListenerThread(uint16_t port, uint16_t bufferSize)
      : BUFFER_SIZE(bufferSize), m_port(port){};
  virtual ~CommunicatorListenerThread();

private:
  uint16_t BUFFER_SIZE;

  uint16_t m_port;
  int m_socketFD;
  struct sockaddr_in m_address;

  virtual void ThreadFunction() override;

  virtual void ThreadPreStart() override;
  virtual void ThreadPreExit() override;
};
