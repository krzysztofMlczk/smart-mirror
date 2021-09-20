#include "communicatorListener.hpp"

#include <sys/socket.h>
#include <unistd.h>

#include "macros.hpp"
#include "commands.hpp"
#include "eventDispatcher.hpp"

using namespace command;
using namespace event;

void CommunicatorListenerThread::ThreadFunction()
{
       ThreadPreStart();

       while (m_running)
       {
              char readBuffer[BUFFER_SIZE];
              int newSocket;
              int addressLength = sizeof(m_address);

              ASSERT((newSocket = accept(m_socketFD, (struct sockaddr *)&m_address,
                                         (socklen_t *)&addressLength)) >= 0,
                     "Accepting connection failed!");

              read(newSocket, readBuffer, BUFFER_SIZE);

              const ICommand *cmd = parseCommand(readBuffer);
              NotifyObserversAbout(cmd->makeEvent());
       }

       ThreadPreExit();
}

void CommunicatorListenerThread::ThreadPreStart()
{
       int opt = 1;

       // Creating socket file descriptor
       // Communication domain : AF_INET means IPv4 protocol
       // Type : SOCK_STREAM means TCP
       // Protocol : 0 means IP protocol
       ASSERT((m_socketFD = socket(AF_INET, SOCK_STREAM, 0)) != 0,
              "Socket open failed!");

       // Forcefully attaching socket to the given port
       ASSERT(!setsockopt(m_socketFD, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt)),
              "Socket attach failed!");

       m_address.sin_family = AF_INET;
       m_address.sin_addr.s_addr = INADDR_ANY;
       m_address.sin_port = htons(m_port);

       // Bind the socket to the address and port number specified in sockaddr
       ASSERT(bind(m_socketFD, (struct sockaddr *)&m_address, sizeof(m_address)) >= 0,
              "Socket bind failed!");

       // Put the server socket in a passive mode, where it waits for the client
       // to approach the server to make a connection
       ASSERT(listen(m_socketFD, 3) >= 0,
              "Socket listen failed!");
}

void CommunicatorListenerThread::ThreadPreExit()
{
}