#pragma once
#include <cstdlib>
#include <fstream>

class ISerializable
{
    virtual void Serialize(std::ostream &outStream) const = 0;
    virtual void Deserialize(std::istream &inStream) = 0;
};