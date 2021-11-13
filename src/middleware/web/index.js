const { ipcRenderer } = require('electron');

const openGoogle = () => {
  ipcRenderer.invoke('open-browser', 'https://www.google.com/');
};

const openNetflix = () => {
  ipcRenderer.invoke('open-browser', 'https://netflix.com');
};

module.exports = {
  openGoogle,
  openNetflix,
};
