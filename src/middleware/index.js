/* THIS FILE SETs UP middleware OBJECT exposed to renderer via preload.js */
const db = require('./database/index');
const faceRecognition = require('./faceRecognition/index');
const google = require('./google/index');
const screenOrientation = require('./screenOrientation/index');
const web = require('./web/index');

module.exports = {
  db,
  faceRecognition,
  google,
  screenOrientation,
  web,
};

// middleware API encapsulates functions providing access to many resources like:
// database, C++ native modules, google connection etc.
// STRUCTURE of a middleware API object:
// {
//   db: {
//     users: {
//       functions related to users collection operations (CRUD)
//     },
//     globalSettings: {
//       functions related to globalSettings collection operations (CRUD)
//     },
//     ...
//   },
//   faceRecognition: {
//     functions related to faceRecognition C++ external module
//   },
//   google: {
//     functions related to google integration
//   },
//   screenOrientation: {
//     functions invoking bash scripts responsible for changing screen orientation
//   },
//   web: {
//     functions responsible for creating renderer processes for web browsing purposes
//   }
// }
