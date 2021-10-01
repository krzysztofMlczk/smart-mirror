#include "module.hpp"
#include "macros.hpp"

void IModule::Sleep()
{
  LOG_INFO("Sending module to sleep");
  m_isSleeping = true;
}

void IModule::Wakeup()
{
  LOG_INFO("Waking up the module");
  m_isSleeping = false;
}

bool IModule::IsSleeping() const
{
  return m_isSleeping;
}

bool IModule::IsRunning() const
{
  return m_isRunning;
}
