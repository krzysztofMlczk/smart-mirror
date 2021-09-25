/* THIS FILE SETs UP faceRecognition OBJECT WHICH WILL BE EXPOSED via middleware
to the renderer process to communicate with the C++ face_recognizer */
// const net = require('net');

// const sender = net.createConnection({ port: 8081 }, () => {
//   // 'connect' listener.
//   console.log('sender connected');
// });

// const receiver = net.createConnection({ port: 8080 }, () => {
//   // connect listener
//   console.log('revceiver connected');
// });

const register = () => {
  // console.log('registering..');
  // sender.write('register name');
};

module.exports = {
  register,
};
