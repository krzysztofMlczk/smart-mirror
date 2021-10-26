/* SCHEME OF THE GLOBALSETTINGS DOCUMENT */

/**
 * @param orientation - orientation selected by the user
 *
 * @returns Object of global settings document structure {
 *  orientation: "horizontal" / "vertical"
 * }
 */
const globalSettingsScheme = (orientation) => {
  return {
    orientation,
  };
};

module.exports = globalSettingsScheme;
