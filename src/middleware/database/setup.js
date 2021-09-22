/* This code sets up the neDB database object containing all dataStores (collections) */
const { app } = require('electron');
const Datastore = require('nedb-promises');

// function for creating dataStores (aka. database collections)
const dsFactory = (fileName) =>
  Datastore.create({
    filename: `${
      process.env.NODE_ENV === 'development' ? '.' : app.getAppPath('userData')
    }/data/${fileName}`,
    corruptAlertThreshold: 0, // prevent any level of data corruption
    autoload: true, // enable autoloading for collections
  });

// create object containing all dataStores (all collections)
// export dataStores object, so the CRUD operations can be
// performed for each collection (SEE `CRUDs` folder)
module.exports = {
  users: dsFactory('users.db'),
  settings: dsFactory('settings.db'),
  // ... add here other collections if necessary
};
