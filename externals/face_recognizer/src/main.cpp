// CPP program to detects face in a video

// Include required header files from OpenCV directory
#include <objdetect.hpp>
#include <highgui.hpp>
#include <imgproc.hpp>

#include "macros.hpp"
#include "paramsParser.hpp"
#include "faceDetection.hpp"
#include "eventDispatcher.hpp"
#include "imageCropper.hpp"

using namespace std;
using namespace cv;

int main(int argc, const char **argv)
{
	AppSettings settings = parseParams(argc, argv);
	FileSystem::GetInstance().SetCurrentUser(settings.user);

	FaceDetector *module = new FaceDetector(settings.detectorMode, settings.cameraId);
	EventDispatcher dispatcher(settings.port, module);

	module->AddEventObserver(&dispatcher);
	FileSystem::GetInstance().AddEventObserver(&dispatcher);
	ImageCropper::GetInstance().AddEventObserver(&dispatcher);

	if (module->Init())
	{
		while (module->IsRunning())
		{
			module->Update();
			dispatcher.Dispatch();
		}
	}
	else
	{
		LOG_ERROR("Could not run the module!");
		EXIT_FAIL;
	}

	LOG_INFO("Application exited");
	return 0;
}
