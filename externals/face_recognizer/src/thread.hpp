#pragma once

#include <thread>

class IThread
{
public:
    IThread() = default;
    virtual ~IThread();

    virtual void Start();
    virtual void Stop();

    uint64_t GetId();

protected:
    bool m_running = false;
    std::thread m_thread;
    virtual void ThreadFunction() = 0;

    virtual void ThreadPreStart() = 0;
    virtual void ThreadPreExit() = 0;
};