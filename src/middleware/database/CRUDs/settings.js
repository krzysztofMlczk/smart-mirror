/* HERE ARE FUNCTIONS TO PERFORM CRUD OPERATIONS ON settings COLLECTION */
const db = require('../setup');

const setSettings = async () => {
  // TODO: implement body of this function
  const newSettings = await db.settings.insert({
    userId: 1234,
    preferences: {
      mode: 'light',
      font: 14,
      orientation: 'horizontal',
    },
  });
  return newSettings;
};

const deleteSettings = async () => {
  // TODO: implement body of this function
};

module.exports = {
  setSettings,
  deleteSettings,
};
