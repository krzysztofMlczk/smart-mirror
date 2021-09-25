#pragma once

#include <string>

namespace utils
{
  bool IsSeparator(char c);
  bool IsEscaped(const std::string &str, size_t pos);

  std::string ReplaceAll(std::string str, const std::string &from, const std::string &to);
  std::string Escape(const std::string &str);
  std::string RemoveEscape(const std::string &str);
} // namespace utils
