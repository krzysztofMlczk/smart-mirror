#include "fileUtils.hpp"
#include <cstdlib>
#include <sys/socket.h>
#include <unistd.h>
#include <cerrno>
#include <fcntl.h>
#include <poll.h>

#include "macros.hpp"

namespace utils
{
  bool IsDescriptorValid(int fd)
  {
    return (fcntl(fd, F_GETFD) != -1 || errno != EBADF);
  }

  bool PollIn(int fd)
  {
    bool returnValue = false;
    struct pollfd *pfd;
    pfd = (struct pollfd *)calloc(1, sizeof(struct pollfd));
    pfd->fd = fd;
    pfd->events = POLLIN;

    int pollReturn = -1;
    pollReturn = poll(pfd, 1, 0);

    if (pollReturn > 0)
    {
      if (pfd->revents & POLLIN)
      {
        returnValue = true;
      }
    }
    free(pfd);
    return returnValue;
  }

  void StartSocketServer(int &socketFD, uint16_t port, struct sockaddr_in *address, std::string logPrefix)
  {
    int opt = 1;

    // Creating socket file descriptor
    // Communication domain : AF_INET means IPv4 protocol
    // Type : SOCK_STREAM means TCP
    // Protocol : 0 means IP protocol
    ASSERT((socketFD = socket(AF_INET, SOCK_STREAM, 0)) != 0,
           std::string(logPrefix + ": Socket open failed!").c_str());

    // Forcefully attaching socket to the given port
    ASSERT(!setsockopt(socketFD, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt)),
           std::string(logPrefix + ": Socket attach failed!").c_str());

    address->sin_family = AF_INET;
    address->sin_addr.s_addr = INADDR_ANY;
    address->sin_port = htons(port);

    // Bind the socket to the address and port number specified in sockaddr
    ASSERT(bind(socketFD, (struct sockaddr *)address, sizeof(*address)) >= 0,
           std::string(logPrefix + ": Socket bind failed!").c_str());

    // Put the server socket in a passive mode, where it waits for the client
    // to approach the server to make a connection
    ASSERT(listen(socketFD, 3) >= 0,
           std::string(logPrefix + ": Socket listen failed!").c_str());

    LOG_INFO(std::string(logPrefix + ": thread set up successfully, using port: %d").c_str(), port);
  }

  std::string GetFileName(const std::string &path)
  {
    size_t lastDelimiter;
    lastDelimiter = path.find_last_of("/\\");

    if (lastDelimiter == std::string::npos)
    {
      LOG_ERROR("GetFileName() failed: delimiter not found!");
      return "";
    }

    return path.substr(lastDelimiter + 1);
  }
} // namespace utils
