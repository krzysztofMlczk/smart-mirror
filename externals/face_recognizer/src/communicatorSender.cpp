#include "communicatorSender.hpp"

#include <sys/socket.h>
#include <unistd.h>
#include <cstring>

#include "macros.hpp"
#include "fileUtils.hpp"

CommunicatorSenderThread::~CommunicatorSenderThread()
{
  if (::utils::IsDescriptorValid(m_socketFD))
  {
    close(m_socketFD);
  }
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

  int newSocket;
  int addressLength = sizeof(m_address);

  // Wait for the first connection
  ASSERT((newSocket = accept(m_socketFD, (struct sockaddr *)&m_address,
                             (socklen_t *)&addressLength)) >= 0,
         "Sender: Accepting connection failed!");

  LOG_INFO("Sender: Connection accepted");

  while (m_running)
  {
    if (!m_commandQueue.empty())
    {
      std::string command = m_commandQueue.front();
      m_commandQueue.pop();

      ASSERT(command.size() < BUFFER_SIZE, "Sender: Command buffer size exceeded!")

      if (send(newSocket, command.c_str(), command.size(), 0) < 0)
      {
        LOG_ERROR("Sender: Message could not be sent: %s", command.c_str());
      }
    }
  }

  ThreadPreExit();
}

void CommunicatorSenderThread::ThreadPreStart()
{
  ::utils::StartSocketServer(m_socketFD, m_port, &m_address, "Sender");
}

void CommunicatorSenderThread::ThreadPreExit()
{
  close(m_socketFD);
}
