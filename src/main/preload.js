const { contextBridge } = require('electron');
// import middleware API
const middleware = require('../middleware/index');

// expose middleware API so it is accessible in the renderer process like so:
// window.middleware.db.users.createUser(...)
// window.middleware.db.settings.setSettings(...)
// window.middleware.faceRecognition.wake(...)
// window.middleware.google.signIn(...)
// etc.
// for more details see how middleware API object is structured
contextBridge.exposeInMainWorld('middleware', middleware);
