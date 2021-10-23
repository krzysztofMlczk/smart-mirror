module.exports = {
  /* Electron -> Cpp Face Recognizer Module */
  RECOGNIZE: 'recognize',
  REGISTER: (userName) => `register ${userName}`,
  SLEEP: 'sleep',
  WAKEUP: 'wakeup',
  STOP: 'stop',
  /* Electron <- Cpp Face Recognizer Module */
  PROGRESS: 'progress',
  RECOGNIZED: 'recognized',
  REGISTERED: 'registered',
  ERROR: 'error',
  FATAL: 'fatal',
};
