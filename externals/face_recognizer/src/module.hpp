#pragma once
#include <vector>
#include "eventObservable.hpp"

class IModule : public IEventObservable
{
protected:
    bool m_isRunning = false;
    bool m_isSleeping = false;

public:
    virtual ~IModule() {}

    virtual bool Init() = 0;
    virtual void Update() = 0;
    virtual void Stop() = 0;

    void Sleep() { m_isSleeping = true; }
    void Wakeup() { m_isSleeping = false; }

    bool IsSleeping() const { return m_isSleeping; }
    bool IsRunning() const { return m_isRunning; }
};