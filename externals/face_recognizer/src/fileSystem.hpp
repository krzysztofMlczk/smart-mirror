#pragma once
#include <string>
#include <map>
#include <vector>
#include <experimental/filesystem>

#include "faceFrame.hpp"
#include "user.hpp"
#include "eventObservable.hpp"

class FileSystem final : public IEventObservable
{
public:
  FileSystem(FileSystem &) = delete;
  ~FileSystem() = default;

  void operator=(const FileSystem &) = delete;

  static FileSystem &GetInstance();

  static std::string RELATIVE_WORKING_PATH;

  static const char *FRAMES_WRITE_PATH;
  static const char *FRAMES_BASE_FILENAME;
  static const char *FRAMES_EXTENSION;

  static const char *HAARCASCADE_FACE_PATH;
  static const char *HAARCASCADE_EYES_PATH;

  void WriteFrames(const std::vector<FaceFrame> &frames) const;
  std::vector<FaceFrame> LoadFrames() const;

  int HashString(const std::string &str) const;
  int GetUserHash(const User &user) const;
  User GetUserByHash(int label);

  void SetCurrentUser(const User &user);
  const User &GetCurrentUser() const;

  void SetRelativeWorkingPath(const char *path);
  const char *GetRelativeWorkingPath() const;
  std::string GetHaarcascadeEyesPath() const;
  std::string GetHaarcascadeFacePath() const;

  void CreateUserMapping();

private:
  FileSystem();

  static FileSystem *m_instance;
  static User m_currentUser;

  std::map<int, std::string> m_userLabelMap;
};
