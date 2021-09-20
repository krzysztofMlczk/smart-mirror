#pragma once

#include <cstdio>
#include <cstdlib>

#define MATH_MAX(x, y)              \
    (                               \
        {                           \
            __typeof__(x) _x = (x); \
            __typeof__(y) _y = (y); \
            _x > _y ? _x : _y;      \
        })

#define MATH_MIN(x, y)              \
    (                               \
        {                           \
            __typeof__(x) _x = (x); \
            __typeof__(y) _y = (y); \
            _x < _y ? _x : _y;      \
        })

#define LOG_INFO(...)    \
    printf("<i> ");      \
    printf(__VA_ARGS__); \
    printf("\n");
#define LOG_ERROR(...)   \
    printf("<!> ");      \
    printf(__VA_ARGS__); \
    printf("\n");

#define EXIT_FAIL std::exit(-1);

#define ASSERT_FATAL_1_ARG(x) \
    if (!(x))                 \
    {                         \
        EXIT_FAIL;            \
    }

#define ASSERT_FATAL_2_ARGS(x, msg)             \
    if (!(x))                                   \
    {                                           \
        LOG_ERROR("ASSERTION FAILED: %s", msg); \
        EXIT_FAIL;                              \
    }

#define GET_2ND_ARG(arg1, arg2, ...) arg2
#define GET_3RD_ARG(arg1, arg2, arg3, ...) arg3

#define ASSERT_FATAL_MACRO_CHOOSER(...)                               \
    GET_3RD_ARG(__VA_ARGS__, ASSERT_FATAL_2_ARGS, ASSERT_FATAL_1_ARG) \
    (__VA_ARGS__)

#define ASSERT(x, ...) ASSERT_FATAL_MACRO_CHOOSER(x, __VA_ARGS__)