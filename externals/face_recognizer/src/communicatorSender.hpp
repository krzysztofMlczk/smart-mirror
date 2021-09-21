#pragma once

#include <arpa/inet.h>

#include <queue>
#include <mutex>

#include "thread.hpp"
#include "events.hpp"

using namespace event;

class CommunicatorSenderThread : public IThread
{
public:
  CommunicatorSenderThread(uint16_t port) : m_port(port){};
  virtual ~CommunicatorSenderThread();

  void sendEvent(IEvent *evt);

private:
  uint16_t BUFFER_SIZE = 255;
  const char *LOCALHOST = "127.0.0.1";

  uint16_t m_port;
  int m_socketFD;
  struct sockaddr_in m_address;
  std::mutex m_sendMutex;

  std::queue<std::string> m_commandQueue;

  virtual void ThreadFunction() override;

  virtual void ThreadPreStart() override;
  virtual void ThreadPreExit() override;
};
