#include "thread.hpp"
#include "macros.hpp"

IThread::~IThread()
{
  Stop();
}

void IThread::Start()
{
  m_running = true;
  m_thread = std::thread(&IThread::ThreadFunction, this);

  LOG_INFO("Started thread with id=%ld", GetId());
}

void IThread::Stop()
{
  if (m_running)
  {
    m_running = false;
    LOG_INFO("Waiting for thread  with id=%ld to finish...", GetId());

    m_thread.join();
    LOG_INFO("Joined thread with id=%ld", GetId());
  }
}

uint64_t IThread::GetId()
{
  uint64_t id = std::hash<std::thread::id>{}(m_thread.get_id());
  return id;
}
