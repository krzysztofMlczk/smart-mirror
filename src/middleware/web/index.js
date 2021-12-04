const { ipcRenderer } = require('electron');
const websites = require('./websites');

const openBrowser = (website) => {
  let url;
  switch (website) {
    case 'google':
      url = websites.GOOGLE;
      break;
    case 'netflix':
      url = websites.NETFLIX;
      break;
    default:
      url = website;
  }
  ipcRenderer.invoke('open-browser', url);
};

module.exports = {
  openBrowser,
};
