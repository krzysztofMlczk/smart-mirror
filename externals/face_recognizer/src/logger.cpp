#include "logger.hpp"
#include <stdio.h>

std::queue<std::string> Logger::m_messages;
std::mutex Logger::m_logMutex;

void Logger::LogInfo(const char *message)
{
  std::string infoMessage = "<i> ";
  infoMessage += message;

  m_logMutex.lock();
  m_messages.push(infoMessage);
  m_logMutex.unlock();
}

void Logger::LogError(const char *message)
{
  std::string errorMessage = "<!> ";
  errorMessage += message;

  m_logMutex.lock();
  m_messages.push(errorMessage);
  m_logMutex.unlock();
}

void Logger::PrintAll()
{
  while (!m_messages.empty())
  {
    m_logMutex.lock();
    const std::string message = m_messages.front();
    m_messages.pop();
    m_logMutex.unlock();

    printf("%s\n", message.c_str());
  }
}
