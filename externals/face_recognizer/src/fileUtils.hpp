#pragma once

#include <string>
#include <cstdint>
#include <arpa/inet.h>

namespace utils
{
  bool IsDescriptorValid(int fd);
  bool PollIn(int fd);

  void StartSocketServer(int &socketFD, uint16_t port, struct sockaddr_in *address, std::string logPrefix = "");
} // namespace utils
