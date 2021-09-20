#include "paramsParser.hpp"
#include "params.hpp"
#include "macros.hpp"

#include <cstring>

AppSettings parseParams(size_t argc, const char **argv, bool failSilently)
{
    AppSettings settings;

    size_t i = 1;

    while (i < argc)
    {
        if (!setParam(settings, argv, argc, i))
        {
            settings._isValid = false;

            if (!failSilently)
            {
                EXIT_FAIL;
            }
        }
    }

    return settings;
}

IParameter *recognizeParam(const char *param)
{
    if (strcmp(param, "--cameraId") == 0)
    {
        return new ParameterCameraId;
    }

    if (strcmp(param, "--recognize") == 0)
    {
        return new ParameterRecognize;
    }

    if (strcmp(param, "--register") == 0)
    {
        return new ParameterRegister;
    }

    if (strcmp(param, "--port") == 0)
    {
        return new ParameterPort;
    }

    return nullptr;
}

bool setParam(AppSettings &settings, const char **params, size_t paramsSize, size_t &currentPos)
{
    const char *currentWord = params[currentPos++];
    IParameter *param = recognizeParam(currentWord);

    if (!param)
    {
        LOG_ERROR("Parameter not recognized: \"%s\" - omitting.", currentWord);
        return false;
    }

    if (currentPos + param->GetRequiredValuesCount() > paramsSize)
    {
        LOG_ERROR("Incorrect number of values for param: \"%s\" - omitting.", currentWord);

        return false;
    }

    size_t valuesStart = currentPos;
    currentPos += param->GetRequiredValuesCount();

    if (!param->feed(params, valuesStart))
    {
        LOG_ERROR("Error while parsing values for: \"%s\"", currentWord);
        return false;
    }

    param->setTo(settings);
    return true;
}