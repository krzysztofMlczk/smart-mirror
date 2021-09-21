/* THIS FILE SETs UP db OBJECT WHICH WILL BE EXPOSED via middleware
to the renderer process to make it possible to call functions, which perform
database CRUD operations (like creating user, deleting user, etc.) */
const Collection = require('./Collection');
const dsFactory = require('./dataStoreFactory');

// export db object, to make it accessible in the middleware
module.exports = {
  users: new Collection(dsFactory('users.db')),
  settings: new Collection(dsFactory('settings.db')),
  // ... add here other collections if necessary
};
