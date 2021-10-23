#include "communicatorListener.hpp"

#include <sys/socket.h>
#include <unistd.h>

#include "macros.hpp"
#include "commands.hpp"
#include "eventDispatcher.hpp"
#include "fileUtils.hpp"

using namespace command;
using namespace event;

CommunicatorListenerThread::~CommunicatorListenerThread()
{
  if (::utils::IsDescriptorValid(m_socketFD))
  {
    close(m_socketFD);
  }
}

void CommunicatorListenerThread::ThreadFunction()
{
  ThreadPreStart();

  int newSocket;
  int addressLength = sizeof(m_address);

  // Wait for the first connection
  ASSERT((newSocket = accept(m_socketFD, (struct sockaddr *)&m_address,
                             (socklen_t *)&addressLength)) >= 0,
         "Listener: Accepting connection failed!");

  LOG_INFO("Listener: Connection accepted");

  char *buffer = new char[BUFFER_SIZE];
  uint64_t receivedChars = 0;

  while (m_running)
  {
    if (::utils::PollIn(newSocket))
    {
      receivedChars = read(newSocket, buffer, BUFFER_SIZE);
    }

    ASSERT(receivedChars < BUFFER_SIZE, "Listener: Incoming message exceeded the buffer size!");

    if (receivedChars != 0)
    {
      buffer[receivedChars] = '\0';
      const ICommand *cmd = parseCommand(buffer);

      if (cmd)
      {
        NotifyObserversAbout(cmd->makeEvent());
      }

      receivedChars = 0;
    }
  }

  delete buffer;
  ThreadPreExit();
}

void CommunicatorListenerThread::ThreadPreStart()
{
  ::utils::StartSocketServer(m_socketFD, m_port, &m_address, "Listener");
}

void CommunicatorListenerThread::ThreadPreExit()
{
  close(m_socketFD);
}
