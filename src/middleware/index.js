/* THIS FILE SETs UP middleware OBJECT exposed to renderer via preload.js */
const db = require('./database/index');
const faceRecognition = require('./faceRecognition/index');
const google = require('./google/index');

module.exports = {
  db,
  faceRecognition,
  google,
};

// middleware API encapsulates functions providing access to many resources like:
// database, C++ native modules, google connection etc.
// STRUCTURE of a middleware API object:
// {
//   db: {
//     users: {
//       functions related to users database operations
//     },
//     settings: {
//       functions related to settings database operations
//     },
//     ...
//   },
//   faceRecognition: {
//     functions related to faceRecognition C++ external module
//   },
//   google: {
//     functions related to google integration
//   }
// }
