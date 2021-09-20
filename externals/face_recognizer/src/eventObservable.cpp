#include "eventObservable.hpp"
#include <algorithm>

void IEventObservable::AddEventObserver(IEventObserver *observer)
{
    m_eventObservers.push_back(observer);
}

void IEventObservable::RemoveEventObserver(IEventObserver *observer)
{
    m_eventObservers.erase(std::remove(m_eventObservers.begin(), m_eventObservers.end(), observer), m_eventObservers.end());
}

void IEventObservable::NotifyObserversAbout(event::IEvent *event) const
{
    for (IEventObserver *observer : m_eventObservers)
    {
        observer->NotifyAbout(event);
    }
}