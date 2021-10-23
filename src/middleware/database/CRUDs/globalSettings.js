/* HERE ARE FUNCTIONS TO PERFORM CRUD OPERATIONS ON globalSettings COLLECTION */
const { globalSettings } = require('../setup');
const globalSettingsScheme = require('../SCHEMAS/globalSettings');

/* CREATE */
const createGlobalSettings = async (orientation) => {
  let newGlobalSettings;
  try {
    newGlobalSettings = await globalSettings.insert(
      globalSettingsScheme(orientation)
    );
    console.log('Global Settings Created');
  } catch (err) {
    // TODO: add error handling for CRUD operations
    console.log(err);
  }
  return newGlobalSettings;
};

/* READ */
/**
 *
 * @returns a promise resolving to globalSettings object
 */
const readGlobalSettings = async () => {
  let gSettings;
  try {
    gSettings = await globalSettings.findOne({});
  } catch (err) {
    // TODO: add error handling for CRUD operations
    console.log(err);
  }
  return gSettings;
};

/* UPDATE */
// --------
/* DELETE */
// --------

module.exports = {
  /* CREATE */
  createGlobalSettings,
  /* READ */
  readGlobalSettings,
  /* UPDATE */
  /* DELETE */
};
