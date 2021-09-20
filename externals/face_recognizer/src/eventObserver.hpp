#pragma once
#include "events.hpp"

class IEventObserver
{
public:
    virtual ~IEventObserver() = default;

    virtual void NotifyAbout(event::IEvent *event) = 0;
};