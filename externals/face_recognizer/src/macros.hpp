#pragma once

#include <cstdlib>
#include <cstdio>
#include "configuration.hpp"
#include "logger.hpp"

#define MAX_LOG_MESSAGE_LENGTH 1024

#define UNUSED(x) (void)(x)

#define MATH_MAX(x, y)          \
  (                             \
      {                         \
        __typeof__(x) _x = (x); \
        __typeof__(y) _y = (y); \
        _x > _y ? _x : _y;      \
      })

#define MATH_MIN(x, y)          \
  (                             \
      {                         \
        __typeof__(x) _x = (x); \
        __typeof__(y) _y = (y); \
        _x < _y ? _x : _y;      \
      })

#define LOG_INFO(...)                                                          \
  {                                                                            \
    char buffer[MAX_LOG_MESSAGE_LENGTH];                                       \
    int64_t charsWritten = sprintf(buffer, __VA_ARGS__);                       \
    if (charsWritten < 0)                                                      \
    {                                                                          \
      printf("<!> Macro error in LOG_INFO: Cannot write provided message!\n"); \
      EXIT_FAIL;                                                               \
    }                                                                          \
    if (charsWritten >= MAX_LOG_MESSAGE_LENGTH)                                \
    {                                                                          \
      printf("<i> Macro error in LOG_INFO: Message buffer overflow!\n");       \
      EXIT_FAIL;                                                               \
    }                                                                          \
    buffer[charsWritten] = '\0';                                               \
    Logger::LogInfo(buffer);                                                   \
  }

#define LOG_ERROR(...)                                                          \
  {                                                                             \
    char buffer[MAX_LOG_MESSAGE_LENGTH];                                        \
    int64_t charsWritten = sprintf(buffer, __VA_ARGS__);                        \
    if (charsWritten < 0)                                                       \
    {                                                                           \
      printf("<!> Macro error in LOG_ERROR: Cannot write provided message!\n"); \
      EXIT_FAIL;                                                                \
    }                                                                           \
    if (charsWritten > MAX_LOG_MESSAGE_LENGTH)                                  \
    {                                                                           \
      printf("<i> Macro error in LOG_ERROR: Message buffer overflow!\n");       \
      EXIT_FAIL;                                                                \
    }                                                                           \
    buffer[charsWritten] = '\0';                                                \
    Logger::LogError(buffer);                                                   \
  }

#ifdef __DEBUG_MODE__
#define DEBUG_PRINT(...) \
  printf("<D> ");        \
  printf(__VA_ARGS__);   \
  printf("\n");
#else
#define DEBUG_PRINT(...) ;
#endif

#define EXIT_FAIL     \
  Logger::PrintAll(); \
  std::exit(-1);

#define ASSERT_FATAL_1_ARG(x) \
  if (!(x))                   \
  {                           \
    EXIT_FAIL;                \
  }

#define ASSERT_FATAL_2_ARGS(x, msg)         \
  if (!(x))                                 \
  {                                         \
    LOG_ERROR("ASSERTION FAILED: %s", msg); \
    EXIT_FAIL;                              \
  }

#define GET_1ST_ARG(arg1, ...) arg1
#define GET_2ND_ARG(arg1, arg2, ...) arg2
#define GET_3RD_ARG(arg1, arg2, arg3, ...) arg3

#define ASSERT_FATAL_MACRO_CHOOSER(...)                             \
  GET_3RD_ARG(__VA_ARGS__, ASSERT_FATAL_2_ARGS, ASSERT_FATAL_1_ARG) \
  (__VA_ARGS__)

#define ASSERT(x, ...) ASSERT_FATAL_MACRO_CHOOSER(x, __VA_ARGS__)
