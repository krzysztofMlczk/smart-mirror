#pragma once

#include <vector>
#include "eventObserver.hpp"

class IEventObservable
{
public:
    virtual ~IEventObservable() = default;

    void AddEventObserver(IEventObserver *observer);
    void RemoveEventObserver(IEventObserver *observer);
    void NotifyObserversAbout(event::IEvent *event) const;

protected:
    std::vector<IEventObserver *> m_eventObservers;
};