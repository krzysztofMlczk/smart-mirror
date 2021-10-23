/* THIS FILE SETs UP db OBJECT WHICH WILL BE EXPOSED via middleware
to the renderer process to make it possible to call functions, which perform
database CRUD operations (like creating user, deleting user, etc.) */
const users = require('./CRUDs/users');
const globalSettings = require('./CRUDs/globalSettings');

// export db object, to make it accessible in the middleware
module.exports = {
  users, // object containing functions to perform CRUD operations on users collection
  globalSettings, // object containing functions to perform CRUD operations on settings collection
  // ... add other objects to perfom CRUD operations on other colletions
};
