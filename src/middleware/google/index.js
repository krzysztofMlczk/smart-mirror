/* THIS FILE SETs UP google OBJECT WHICH WILL BE EXPOSED via middleware
to the renderer process to perform google integration-related actions */
const signIn = require('./signIn');
const refreshAccessToken = require('./refresh');
const fetchGoogleProfile = require('./profile');
const apis = require('./apis/index');

module.exports = {
  signIn,
  refreshAccessToken,
  fetchGoogleProfile,
  apis,
};
