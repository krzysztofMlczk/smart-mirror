const portastic = require('portastic');
const { exec } = require('child_process');

const launchFaceRecognizer = () => {
  const cameraId = 1;
  const launcherCommand = (portSender, portReceiver) => {
    return `./externals/scripts/launcher.sh ${portSender} ${portReceiver} ${cameraId}`;
  };

  return portastic
    .find({ min: 8000, max: 8080, retrieve: 2 })
    .then((ports) => {
      exec(launcherCommand(...ports), (error, stdout, stderr) => {
        console.log(stderr);
        console.log(error);
      });
      return ports;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = launchFaceRecognizer;
