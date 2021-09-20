#pragma once

#include <vector>
#include <string>

#include "macros.hpp"
#include "events.hpp"

using namespace event;

namespace command
{
#define DECLARE_COMMAND s_commands.push_back(this);

    // Command list
    class ICommand;
    static std::vector<ICommand *> s_commands;

    struct ICommand
    {
        ICommand(std::string cmdName, uint8_t paramCount);
        virtual ~ICommand() = default;

        virtual void feed(const std::vector<std::string> &tokens) = 0;
        virtual IEvent *makeEvent() const = 0;

        const uint8_t m_paramCount = 0;
        std::string m_cmdName;

        static u_int16_t MAX_NAME_LENGTH;
    };

    struct CommandRecognize : public ICommand
    {
        CommandRecognize(std::string cmdName, uint8_t paramCount)
            : ICommand(cmdName, paramCount) {}

        virtual ~CommandRecognize() = default;

        void feed(const std::vector<std::string> &tokens) override {}

        IEvent *makeEvent() const override
        {
            return new EventStartRecognize;
        }
    };

    struct CommandRegister : public ICommand
    {
        CommandRegister(std::string cmdName, uint8_t paramCount)
            : ICommand(cmdName, paramCount) {}

        virtual ~CommandRegister() = default;

        void feed(const std::vector<std::string> &tokens) override
        {
            m_username = tokens.front();
        }

        IEvent *makeEvent() const override
        {
            return new EventStartRegister(m_username);
        }

        std::string m_username;
    };

    struct CommandSleep : public ICommand
    {
        CommandSleep(std::string cmdName, uint8_t paramCount)
            : ICommand(cmdName, paramCount) {}

        virtual ~CommandSleep() = default;

        void feed(const std::vector<std::string> &tokens) override {}

        IEvent *makeEvent() const override
        {
            return new EventSleep;
        }
    };

    struct CommandWakeup : public ICommand
    {
        CommandWakeup(std::string cmdName, uint8_t paramCount)
            : ICommand(cmdName, paramCount) {}

        virtual ~CommandWakeup() = default;

        void feed(const std::vector<std::string> &tokens) override {}

        IEvent *makeEvent() const override
        {
            return new EventWakeup;
        }
    };

    struct CommandStop : public ICommand
    {
        CommandStop(std::string cmdName, uint8_t paramCount)
            : ICommand(cmdName, paramCount) {}

        virtual ~CommandStop() = default;

        void feed(const std::vector<std::string> &tokens) override {}

        IEvent *makeEvent() const override
        {
            return new EventStop;
        }
    };

    // Static command objects:
    static const CommandRecognize cmdRecognize("recognize", 0);
    static const CommandRecognize cmdRegister("register", 1);
    static const CommandRecognize cmdSleep("sleep", 0);
    static const CommandRecognize cmdWakeup("wakeup", 0);
    static const CommandRecognize cmdStop("stop", 0);

    // Command recognition
    const ICommand *parseCommand(std::string line);
} // namespace commands
