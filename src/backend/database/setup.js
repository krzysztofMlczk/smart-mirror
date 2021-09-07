/* This code sets up the neDB */
const { app } = require('electron');
const Datastore = require('nedb-promises');

// function for creating datastores (aka. database collections)
const dsFactory = (fileName) =>
  Datastore.create({
    filename: `${
      process.env.NODE_ENV === 'development' ? '.' : app.getAppPath('userData')
    }/data/${fileName}`,
    corruptAlertThreshold: 0, // prevent any level of data corruption
    autoload: true, // enable autoloading for collections
  });

// create db object
const db = {
  users: dsFactory('users.db'),
  settings: dsFactory('settings.db'),
  // ... add here other collections if necessary
};
// export db object, so the middleware functions can make CRUD operations
module.exports = db;
