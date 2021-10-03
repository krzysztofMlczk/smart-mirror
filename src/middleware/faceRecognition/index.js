/* THIS FILE SETs UP faceRecognition OBJECT WHICH WILL BE EXPOSED via middleware
to the renderer process to communicate with the C++ face_recognizer */
const net = require('net');
const tokenize = require('./tokenizer');

let registeringProgressCallback;
let registeringSuccessCallback;

const sender = net.createConnection({ port: 8081 }, () => {
  // 'connect' listener.
  console.log('sender connected');
});

const receiver = net.createConnection(
  {
    port: 8080,
    onread: {
      buffer: Buffer.alloc(255),
      callback: (nread, data) => {
        const msg = tokenize(data);

        switch (msg.command) {
          case 'progress':
            registeringProgressCallback(msg.value);
            break;
          case 'registered':
            registeringSuccessCallback();
            break;
          case 'error':
            // fire error callback (TODO)
            break;
          case 'fatal':
            // fire error callback (TODO)
            break;
          default:
            break;
        }
      },
    },
  },
  () => {
    // connect listener
    console.log('revceiver connected');
  }
);

const register = (userName) => {
  sender.write(`register ${userName}`);
};

const setProgressCallback = (progressCallback) => {
  registeringProgressCallback = progressCallback;
};

const setSuccessCallback = (successCallback) => {
  registeringSuccessCallback = successCallback;
};

module.exports = {
  register,
  setProgressCallback,
  setSuccessCallback,
};
