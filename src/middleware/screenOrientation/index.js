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
  try {
    exec(screenOrientationChangerCommand);
  } catch (err) {
    // TODO: add error handling for orientation changing
    console.log(err);
  }
};

module.exports = {
  changeScreenOrientation,
};
