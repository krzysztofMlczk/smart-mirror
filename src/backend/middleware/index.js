const users = require('./users');
const settings = require('./settings');

module.exports = {
  users,
  settings,
  // ...
};

// middleware API contains functions for database interaction
// STRUCTURE of a middleware API object:
// {
//   users: {
//     functions related to users database operations
//   },
//   settings: {
//     functions related to settings database operations
//   },
//   ...
// }
