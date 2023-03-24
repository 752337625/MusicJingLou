const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ElectronAPI', {
  setTitle: title => ipcRenderer.send('set-title', title),
  setLoginDialog: flag => ipcRenderer.send('set-login-dialog', flag),
  setDesktopLyricDialog: flag => ipcRenderer.send('set-desktop-lyric-dialog', flag),
  setWindowMax: () => ipcRenderer.send('set-window-max'),
  setWindowMin: () => ipcRenderer.send('set-window-min'),
  setWindowClose: () => ipcRenderer.send('set-window-close'),
  setShellExternal: url => ipcRenderer.send('set-shell-external', url),
});
