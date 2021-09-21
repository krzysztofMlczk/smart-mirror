const { app } = require('electron');
const Datastore = require('nedb-promises');

// function for creating datastores (aka. database collections)
const dataStoreFactory = (fileName) =>
  Datastore.create({
    filename: `${
      process.env.NODE_ENV === 'development' ? '.' : app.getAppPath('userData')
    }/data/${fileName}`,
    corruptAlertThreshold: 0, // prevent any level of data corruption
    autoload: true, // enable autoloading for collections
  });

module.exports = dataStoreFactory;
