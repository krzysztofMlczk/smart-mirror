const { exec } = require('child_process');

const changeScreenOrientation = (orientation) => {
  let parsedOrientation;

  switch (orientation) {
    case 'horizontal':
      parsedOrientation = 'normal';
      break;
    case 'vertical':
      parsedOrientation = 'right';
      break;
    default:
      parsedOrientation = 'normal';
  }

  const screenOrientationChangerCommand = `./externals/scripts/changeScreenOrientation.sh ${parsedOrientation}`;
  exec(screenOrientationChangerCommand);
};

module.exports = {
  changeScreenOrientation,
};
