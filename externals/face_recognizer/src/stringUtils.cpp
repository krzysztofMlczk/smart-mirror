#include "stringUtils.hpp"
#include <algorithm>

namespace utils
{
  bool IsSeparator(char c)
  {
    return c == ' ';
  }

  bool IsEscaped(const std::string &line, size_t pos)
  {
    if (pos <= 0 || pos > line.size())
    {
      return false;
    }

    return line[pos - 1] == '\\';
  }

  std::string ReplaceAll(std::string str, const std::string &from, const std::string &to)
  {
    size_t startPos = 0;
    while ((startPos = str.find(from, startPos)) != std::string::npos)
    {
      str.replace(startPos, from.length(), to);
      startPos += to.length();
    }
    return str;
  }

  std::string Escape(const std::string &str)
  {
    return ReplaceAll(str, " ", "\\ ");
  }

  std::string RemoveEscape(const std::string &str)
  {
    return ReplaceAll(str, "\\ ", " ");
  }
} // namespace utils
