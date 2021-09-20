#pragma once
#include <string>
#include "macros.hpp"

namespace event
{
#define EVENT_NAME(name) \
    virtual std::string GetName() const { return #name; }

    class IEvent
    {
    public:
        virtual ~IEvent() = default;
        virtual std::string GetName() const = 0;
        virtual std::string PrepareCommand() const {ASSERT(false, "Not implemented!")};
    };

    // ----- FROM FACE DETECTOR -----

    class EventProgressReport : public IEvent
    {
    public:
        EVENT_NAME(evtProgressReport)

        EventProgressReport(uint32_t currentStep, uint32_t stepCount)
            : m_currentStep(currentStep), m_stepCount(stepCount) {}

        virtual ~EventProgressReport() = default;

        std::string PrepareCommand() const override
        {
            float percentage = m_currentStep * 100.0 / m_stepCount;
            return std::string("progress ") + std::to_string(percentage);
        }

        uint32_t m_currentStep;
        uint32_t m_stepCount;
    };

    class EventErrorOccured : public IEvent
    {
    public:
        EVENT_NAME(evtErrorOccured)

        EventErrorOccured(const std::string &message)
            : m_message(message) {}

        virtual ~EventErrorOccured() = default;

        std::string PrepareCommand() const override
        {
            return std::string("error ") + m_message;
        }

        std::string m_message;
    };

    class EventFatalOccured : public IEvent
    {
    public:
        EVENT_NAME(evtFatalOccured)

        EventFatalOccured(const std::string &message, int exitCode)
            : m_message(message), m_exitCode(exitCode) {}

        virtual ~EventFatalOccured() = default;

        std::string PrepareCommand() const override
        {
            return std::string("fatal ") + m_message + std::string("; exit code: ") +
                   std::to_string(m_exitCode);
        }

        std::string m_message;
        int m_exitCode;
    };

    class EventFaceRecognized : public IEvent
    {
    public:
        EVENT_NAME(evtFaceRecognized)

        EventFaceRecognized(const std::string &predictedUser, float certainty)
            : m_predictedUser(predictedUser), m_certainty(certainty) {}

        virtual ~EventFaceRecognized() = default;

        std::string PrepareCommand() const override
        {
            return std::string("recognized ") + m_predictedUser + std::string(", ") +
                   std::to_string(m_certainty);
        }

        std::string m_predictedUser;
        float m_certainty;
    };

    class EventUserRegistered : public IEvent
    {
    public:
        EVENT_NAME(evtUserRegistered)

        EventUserRegistered(const std::string &username)
            : m_username(username) {}

        virtual ~EventUserRegistered() = default;

        std::string PrepareCommand() const override
        {
            return std::string("registered ") + m_username;
        }

        std::string m_username;
    };

    // ----- FROM ELECTRON -----

    class EventStartRecognize : public IEvent
    {
    public:
        EVENT_NAME(evtStartRecognize)

        EventStartRecognize() = default;
        virtual ~EventStartRecognize() = default;
    };

    class EventStartRegister : public IEvent
    {
    public:
        EVENT_NAME(evtStartRegister)

        EventStartRegister(const std::string &username)
            : m_username(username) {}

        virtual ~EventStartRegister() = default;

        std::string m_username;
    };

    class EventSleep : public IEvent
    {
    public:
        EVENT_NAME(evtSleep)

        EventSleep() = default;
        virtual ~EventSleep() = default;
    };

    class EventWakeup : public IEvent
    {
    public:
        EVENT_NAME(evtWakeup)

        EventWakeup() = default;
        virtual ~EventWakeup() = default;
    };

    class EventStop : public IEvent
    {
    public:
        EVENT_NAME(evtStop)

        EventStop() = default;
        virtual ~EventStop() = default;
    };

} // namespace event