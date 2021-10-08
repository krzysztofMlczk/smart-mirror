const { exec } = require('child_process');

const launchFaceRecognizer = () => {
  let portReceiver;
  let portSender;
  const cameraId = 1;

  const updateSenderPortCallback = (error, stdout) => {
    portSender = stdout;
  };
  const updateReceiverPortCallback = (error, stdout) => {
    portReceiver = stdout;
  };

  const portFinderCommand = 'sh ./externals/scripts/portFinder.sh';
  exec(portFinderCommand, updateSenderPortCallback);

  do exec(portFinderCommand, updateReceiverPortCallback);
  while (portReceiver === portSender);

  console.log(portReceiver);
  console.log(portSender);

  const launcherCommand = `sh ./externals/scripts/launcher.sh ${portSender} ${portReceiver} ${cameraId}`;
  exec(launcherCommand);
};
