#include "communicatorSender.hpp"

#include <sys/socket.h>
#include <unistd.h>
#include <cstring>

#include "macros.hpp"

CommunicatorSenderThread::~CommunicatorSenderThread()
{
  close(m_socketFD);
}

void CommunicatorSenderThread::sendEvent(IEvent *evt)
{
  // Run on main thread
  m_sendMutex.lock();
  m_commandQueue.push(evt->PrepareCommand());
  m_sendMutex.unlock();
}

void CommunicatorSenderThread::ThreadFunction()
{
  ThreadPreStart();

  while (m_running)
  {
    if (!m_commandQueue.empty())
    {
      std::string command = m_commandQueue.front();
      m_commandQueue.pop();

      ASSERT(command.size() <= BUFFER_SIZE, "Command buffer size exceeded!")

      send(m_socketFD, command.c_str(), MATH_MIN(BUFFER_SIZE, command.size()), 0);
    }
  }

  ThreadPreExit();
}

void CommunicatorSenderThread::ThreadPreStart()
{
  ASSERT((m_socketFD = socket(AF_INET, SOCK_STREAM, 0)) >= 0,
         "Socket creation error!");

  m_address.sin_family = AF_INET;
  m_address.sin_port = htons(m_port);

  // Convert IPv4 and IPv6 addresses from text to binary form
  ASSERT(inet_pton(AF_INET, LOCALHOST, &m_address.sin_addr) > 0,
         "Invalid or not supported adress!");

  ASSERT(connect(m_socketFD, (struct sockaddr *)&m_address, sizeof(m_address)) >= 0,
         "Connection failed!");
}

void CommunicatorSenderThread::ThreadPreExit()
{
}
