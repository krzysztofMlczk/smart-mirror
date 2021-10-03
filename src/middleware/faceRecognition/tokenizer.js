const tokenize = (data) => {
  const line = data.toString();
  // eslint-disable-next-line prefer-const
  let [command, value, code] = line.match(/(?:\\ |[^ ])+/g);

  switch (command) {
    case 'progress':
      value = parseInt(value, 10);
      break;
    case 'recognized':
      // don't need to parse (value already is a string)
      break;
    case 'registered':
      // don't need to parse (value already is a string)
      break;
    case 'error':
      // don't need to parse (value already is a string)
      break;
    case 'fatal':
      value = `${value}; exitCode: ${code}`;
      break;
    default:
      break;
  }
  return { command, value };
};

module.exports = tokenize;
