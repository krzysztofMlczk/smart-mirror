/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null;
let browserWindow: BrowserWindow | null = null;

ipcMain.handle('open-browser', (_event, url) => {
  console.log('ipcHandle');
  if (browserWindow === null) {
    console.log('window opened');
    // if not already opened
    browserWindow = new BrowserWindow({
      parent: mainWindow as BrowserWindow | undefined,
      // modal: true,
      show: false,
      center: true,
      resizable: false,
      autoHideMenuBar: true,
      darkTheme: true,
      webPreferences: {
        devTools: false,
      },
    });
    browserWindow.loadURL(url);
    // show the window after 'ready-to-show' event prevents visual flash
    browserWindow.once('ready-to-show', () => {
      browserWindow?.show();
    });
    // close window when minimized (don't allow to minimize the window)
    browserWindow.on('minimize', () => {
      browserWindow?.close();
    });
    // remove instance when closed (so it is not used anymore)
    browserWindow.on('closed', () => {
      browserWindow = null;
    });
  }
});

ipcMain.handle('google-auth-modal', (_event, authUrl) => {
  return new Promise((resolve, reject) => {
    const authWindow = new BrowserWindow({
      parent: mainWindow as BrowserWindow | undefined,
      width: 600,
      height: 800,
      modal: true,
      show: false,
      frame: false, // might change in the future (when user will be allowed to close the modal)
      center: true,
      resizable: false,
      webPreferences: {
        devTools: false,
      },
    });

    function handleNavigation(url: string) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      if (urlParams) {
        if (urlParams.has('error')) {
          authWindow.close();
          reject(new Error(`There was an error: ${urlParams.get('error')}`));
        } else if (urlParams.has('code')) {
          // Login is complete
          // authWindow.removeAllListeners('closed'); // use it when user will be allowed to close the modal (DO THIS BEFORE closing!!!)
          authWindow.close();
          // This is the authorization code we need to request tokens
          resolve(urlParams.get('code'));
        }
      }
    }

    /**
     * TODO:
     *  - implement custom title bar with close 'x' button
     *  - allow user to close google-auth-modal with 'x' button anytime
     *  - throw error on closing and adjust UI
     *  below code will be useful for that
     */
    // authWindow.on('closed', () => {
    //   // TODO: Handle this smoothly
    //   authWindow = null;
    //   // throw new Error('Auth window was closed by user');
    // });

    authWindow.webContents.on('will-navigate', (_ev, url) => {
      handleNavigation(url);
    });

    authWindow.loadURL(authUrl);
    // show the modal window after 'ready-to-show' event prevents visual flash
    authWindow.once('ready-to-show', () => {
      authWindow.show();
    });
  });
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1920,
    height: 1080,
    fullscreen: false, // set to true
    frame: true, // set to false
    icon: getAssetPath('icon.png'),
    webPreferences: {
      devTools: true, // set to false
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/main/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
