const commands = require('./commands');

const tokenize = (data) => {
  const line = data.toString();
  // eslint-disable-next-line prefer-const
  let [command, value, code] = line.match(/(?:\\ |[^ ])+/g);

  switch (command) {
    case commands.PROGRESS:
      value = parseInt(value, 10);
      break;
    case commands.RECOGNIZED:
      // don't need to parse (value already is a string)
      break;
    case commands.REGISTERED:
      // don't need to parse (value already is a string)
      break;
    case commands.ERROR:
      // don't need to parse (value already is a string)
      break;
    case commands.FATAL:
      value = `${value}; exitCode: ${code}`;
      break;
    default:
      break;
  }
  return { command, value };
};

module.exports = tokenize;
