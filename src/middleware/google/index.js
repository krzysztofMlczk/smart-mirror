/* THIS FILE SETs UP google OBJECT WHICH WILL BE EXPOSED via middleware
to the renderer process to perform google integration-related actions */
const signIn = require('./signIn');

module.exports = {
  signIn,
};
