const { contextBridge } = require('electron');
// import middleware API
const middleware = require('../backend/middleware/index');

// expose middleware API so it is accessible in the renderer process like so:
// window.middleware.users.createUser(...)
// window.middleware.settings.setSettings(...)
// etc.
// for more details see how middleware API object is structured
contextBridge.exposeInMainWorld('middleware', middleware);
