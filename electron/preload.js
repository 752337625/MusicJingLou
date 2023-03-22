const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: title => ipcRenderer.send('set-title', title),
  setLoginDialog: flag => ipcRenderer.send('set-login-dialog', flag),
  setWindowMax: () => ipcRenderer.send('set-window-max'),
  setWindowMin: () => ipcRenderer.send('set-window-min'),
  setWindowClose: () => ipcRenderer.send('set-window-close'),
});
