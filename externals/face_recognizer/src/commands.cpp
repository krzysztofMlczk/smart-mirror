#include "commands.hpp"
#include "stringUtils.hpp"

namespace command
{
  uint16_t ICommand::MAX_NAME_LENGTH = 128;

  ICommand::ICommand(std::string cmdName, uint8_t paramCount)
      : m_paramCount(paramCount), m_cmdName(cmdName)
  {
    DECLARE_COMMAND
    ASSERT(cmdName.size() <= MAX_NAME_LENGTH, "Command name exceeded max length!");
  }

  std::vector<std::string> splitToTokens(std::string line)
  {
    std::vector<std::string> words;
    std::string currentWord;

    for (size_t i = 0; i < line.size(); ++i)
    {
      if (utils::IsSeparator(line[i]) && !utils::IsEscaped(line, i) && currentWord.size() > 0)
      {
        words.push_back(utils::RemoveEscape(currentWord));
        currentWord.clear();
      }
      else
      {
        currentWord += line[i];
      }
    }

    if (currentWord.size() > 0)
    {
      words.push_back(utils::RemoveEscape(currentWord));
    }

    return words;
  }

  const ICommand *parseCommand(std::string line)
  {
    std::vector<std::string> tokens = splitToTokens(line);

    if (tokens.size())
    {
      std::string cmdName = tokens[0];
      tokens.erase(tokens.begin());

      for (ICommand *cmd : s_commands)
      {
        if (cmdName == cmd->m_cmdName)
        {
          ASSERT(tokens.size() >= cmd->m_paramCount,
                 "Not enought command parameters specified!");

          cmd->feed(tokens);
          return cmd;
        }
      }
    }

    LOG_ERROR("Received unknown command: %s", line.c_str());
    return nullptr;
  }
} // namespace commands
