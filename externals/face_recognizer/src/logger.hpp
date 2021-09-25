#pragma once

#include <cstdint>
#include <queue>
#include <string>
#include <mutex>

class Logger final
{
public:
  Logger() = delete;
  Logger(Logger &) = delete;
  ~Logger() = default;

  void operator=(const Logger &) = delete;

  static void LogInfo(const char *message);
  static void LogError(const char *message);

  static void PrintAll();

private:
  static std::mutex m_logMutex;
  static std::queue<std::string> m_messages;
};
