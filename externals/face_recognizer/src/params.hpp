#pragma once

#include "paramsParser.hpp"
#include <string>

class IParameter
{
public:
    IParameter() : m_valuesRequired(0) {}
    IParameter(uint8_t valuesRequired) : m_valuesRequired(valuesRequired) {}
    ~IParameter() = default;

    virtual void setTo(AppSettings &settings) = 0;
    virtual bool feed(const char **params, size_t from) = 0;
    uint8_t GetRequiredValuesCount() const { return m_valuesRequired; }

protected:
    const uint8_t m_valuesRequired;
};

class ParameterCameraId final : public IParameter
{
public:
    ParameterCameraId() : IParameter(1) {}
    ~ParameterCameraId() = default;

    virtual void setTo(AppSettings &settings) override;
    virtual bool feed(const char **params, size_t from) override;

private:
    uint8_t m_cameraId;
};

class ParameterRecognize final : public IParameter
{
public:
    ParameterRecognize() : IParameter(0) {}
    ~ParameterRecognize() = default;

    virtual void setTo(AppSettings &settings) override;
    virtual bool feed(const char **params, size_t from) override;
};

class ParameterRegister final : public IParameter
{
public:
    ParameterRegister() : IParameter(1) {}
    ~ParameterRegister() = default;

    virtual void setTo(AppSettings &settings) override;
    virtual bool feed(const char **params, size_t from) override;

private:
    std::string m_username;
};

class ParameterPort final : public IParameter
{
public:
    ParameterPort() : IParameter(1) {}
    ~ParameterPort() = default;

    virtual void setTo(AppSettings &settings) override;
    virtual bool feed(const char **params, size_t from) override;

private:
    uint16_t m_port;
};