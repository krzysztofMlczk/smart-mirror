#include "params.hpp"
#include "macros.hpp"
#include <string>
#include "user.hpp"

void ParameterCameraId::setTo(AppSettings &settings)
{
  settings.cameraId = m_cameraId;
}

bool ParameterCameraId::feed(const char **params, size_t from)
{
  try
  {
    m_cameraId = std::stoi(params[from]);
  }
  catch (std::exception const &e)
  {
    LOG_ERROR("Cannot convert %s to uint8_t", params[from]);
    return false;
  }

  return true;
}

void ParameterRecognize::setTo(AppSettings &settings)
{
  settings.detectorMode = DetectorMode::RECOGNITION;
}

bool ParameterRecognize::feed(const char **params, size_t from)
{
  return true;
}

void ParameterRegister::setTo(AppSettings &settings)
{
  settings.detectorMode = DetectorMode::REGISTRATION;

  User user;
  user._isValid = true;
  user.username = m_username;
  settings.user = user;
}

bool ParameterRegister::feed(const char **params, size_t from)
{
  m_username = std::string(params[from]);
  return true;
}

void ParameterPortSend::setTo(AppSettings &settings)
{
  settings.portSend = m_port;
}

bool ParameterPortSend::feed(const char **params, size_t from)
{
  try
  {
    m_port = std::stoi(params[from]);
  }
  catch (std::exception const &e)
  {
    LOG_ERROR("Cannot convert %s to uint16_t", params[from]);
    return false;
  }

  return true;
}

void ParameterPortReceive::setTo(AppSettings &settings)
{
  settings.portReceive = m_port;
}

bool ParameterPortReceive::feed(const char **params, size_t from)
{
  try
  {
    m_port = std::stoi(params[from]);
  }
  catch (std::exception const &e)
  {
    LOG_ERROR("Cannot convert %s to uint16_t", params[from]);
    return false;
  }

  return true;
}

void ParameterSocketBufferSize::setTo(AppSettings &settings)
{
  settings.socketBufferSize = m_bufferSize;
}

bool ParameterSocketBufferSize::feed(const char **params, size_t from)
{
  try
  {
    m_bufferSize = std::stoi(params[from]);
  }
  catch (std::exception const &e)
  {
    LOG_ERROR("Cannot convert %s to uint16_t", params[from]);
    return false;
  }

  return true;
}
