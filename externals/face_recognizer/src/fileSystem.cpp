#include "fileSystem.hpp"

#include <fstream>
#include <sys/stat.h>

#include "macros.hpp"
#include "cascades.hpp"

namespace fs = std::experimental::filesystem::v1;
using namespace event;

FileSystem *FileSystem::m_instance = nullptr;
User FileSystem::m_currentUser;

std::string FileSystem::RELATIVE_WORKING_PATH = "./";
const char *FileSystem::FRAMES_WRITE_PATH = "../facedata";
const char *FileSystem::FRAMES_BASE_FILENAME = "frameData_";
const char *FileSystem::FRAMES_EXTENSION = ".fr";

const char *FileSystem::HAARCASCADE_FACE_PATH = FaceCascadeChooser(0);
const char *FileSystem::HAARCASCADE_EYES_PATH = EyeCascadeChooser(0);

FileSystem::FileSystem()
{
  CreateUserMapping();
}

FileSystem &FileSystem::GetInstance()
{
  if (!m_instance)
  {
    m_instance = new FileSystem;
  }

  return *m_instance;
}

void FileSystem::CreateUserMapping()
{
  std::string dirname = RELATIVE_WORKING_PATH;
  dirname += "/";
  dirname += FRAMES_WRITE_PATH;

  if (fs::is_directory(dirname.c_str()))
  {
    for (const auto &dirEntry : fs::recursive_directory_iterator(dirname.c_str()))
    {
      fs::path filePath = dirEntry.path();

      struct stat fileStat;
      if (stat(filePath.c_str(), &fileStat) == 0)
      {
        if (fileStat.st_mode & S_IFDIR)
        {
          std::string name = filePath.parent_path().filename().c_str();
          int label = HashString(name);

          m_userLabelMap[label] = name;
        }
      }
    }
  }

  LOG_INFO("Created user mapping. Users found: %ld", m_userLabelMap.size());
}

void FileSystem::WriteFrames(const std::vector<FaceFrame> &frames) const
{
  User user = FileSystem::GetInstance().GetCurrentUser();

  if (!user._isValid)
  {
    std::string errorMessage = "Cannot save frames, because no valid user was specified!";
    LOG_ERROR("%s", errorMessage.c_str());
    NotifyObserversAbout(new EventErrorOccured(errorMessage));
    return;
  }

  size_t index = 0;

  std::string directoryName = RELATIVE_WORKING_PATH;
  directoryName += "/";
  directoryName += FRAMES_WRITE_PATH;
  directoryName += "/";
  directoryName += user.username;
  fs::create_directories(directoryName.c_str());

  for (const auto &frame : frames)
  {
    std::string filename = directoryName;

    filename += "/";
    filename += FRAMES_BASE_FILENAME;
    filename += std::to_string(index++);
    filename += FRAMES_EXTENSION;

    std::ofstream outFile;
    outFile.open(filename.c_str());
    ASSERT(outFile.is_open(), "Cannot create file!");

    frame.Serialize(outFile);

    outFile.close();

    LOG_INFO("Saved frame file: %s", filename.c_str());
  }
}

std::vector<FaceFrame> FileSystem::LoadFrames() const
{
  std::string dirname = RELATIVE_WORKING_PATH;
  dirname += "/";
  dirname += FRAMES_WRITE_PATH;

  std::vector<FaceFrame> frames;

  if (fs::is_directory(dirname.c_str()))
  {
    for (const auto &dirEntry : fs::recursive_directory_iterator(dirname.c_str()))
    {
      fs::path filePath = dirEntry.path();

      if (strcmp(filePath.extension().c_str(), FRAMES_EXTENSION) == 0)
      {
        std::ifstream inFile;
        inFile.open(filePath.c_str());

        FaceFrame frame;
        frame.Deserialize(inFile);
        frames.push_back(frame);

        inFile.close();
      }
    }
  }

  return frames;
}

int FileSystem::HashString(const std::string &str) const
{
  // Assuming that the distribution of hashes generated by the function below
  // is close to random (indistinguishable from random), then we may
  // assume that when we trim those hashes to an int32 value by taking it's
  // first 32 bits, we do not loose that indistinguishability.

  size_t hash = std::hash<std::string>{}(str.c_str());
  // Trim to int:
  int intHash = (int)hash;

  return intHash;
}

int FileSystem::GetUserHash(const User &user) const
{
  return HashString(user.username);
}

User FileSystem::GetUserByHash(int label)
{
  User user;

  if (m_userLabelMap.find(label) != m_userLabelMap.end())
  {
    user.username = m_userLabelMap[label];
    user._isValid = true;
  }

  return user;
}

void FileSystem::SetCurrentUser(const User &user)
{
  m_currentUser = user;
}

const User &FileSystem::GetCurrentUser() const
{
  return m_currentUser;
}

void FileSystem::SetRelativeWorkingPath(const char *path)
{
  fs::path dirPath(path);
  RELATIVE_WORKING_PATH = dirPath.parent_path().string();
}

const char *FileSystem::GetRelativeWorkingPath() const
{
  return RELATIVE_WORKING_PATH.c_str();
}

std::string FileSystem::GetHaarcascadeEyesPath() const
{
  std::string path = RELATIVE_WORKING_PATH;
  path += "/";
  path += HAARCASCADE_EYES_PATH;

  return path;
}

std::string FileSystem::GetHaarcascadeFacePath() const
{
  std::string path = RELATIVE_WORKING_PATH;
  path += "/";
  path += HAARCASCADE_FACE_PATH;

  return path;
}
