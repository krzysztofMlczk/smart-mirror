#pragma once

#include <cstring>

static const char *AllocStr(const char *cstr)
{
  __uint32_t length = strlen(cstr);
  char *allocatedStr = new char[length + 1];

  memcpy((void *)allocatedStr, cstr, length + 1);
  return allocatedStr;
}

static const char *EyeCascadeChooser(__uint8_t option)
{
  switch (option)
  {
  case 0:
    return AllocStr("../share/opencv4/haarcascades/haarcascade_eye.xml");
    break;

  case 1:
    return AllocStr("../share/opencv4/haarcascades/haarcascade_eye_tree_eyeglasses.xml");
    break;
  }

  return AllocStr("../share/opencv4/haarcascades/haarcascade_eye.xml");
}

static const char *FaceCascadeChooser(__uint8_t option)
{
  switch (option)
  {
  case 0:
    return AllocStr("../share/opencv4/haarcascades/haarcascade_frontalface_default.xml");
    break;

  case 1:
    return AllocStr("../share/opencv4/haarcascades/haarcascade_frontalface_alt_tree.xml");
    break;

  case 2:
    return AllocStr("../share/opencv4/haarcascades/haarcascade_frontalface_alt2.xml");
    break;

  case 3:
    return AllocStr("../share/opencv4/haarcascades/haarcascade_frontalface_alt.xml");
    break;

  case 4:
    return AllocStr("../share/opencv4/haarcascades/haarcascade_frontalcatface_extended.xml");
    break;

  case 5:
    return AllocStr("../share/opencv4/haarcascades/haarcascade_frontalcatface.xml");
    break;
  }

  return AllocStr("../share/opencv4/haarcascades/haarcascade_frontalface_default.xml");
}
