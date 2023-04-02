const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ElectronAPI', {
  setTitle: title => ipcRenderer.send('set-title', title),
  setLoginDialog: flag => ipcRenderer.send('set-login-dialog', flag),
  setDesktopLyricDialog: flag => ipcRenderer.send('set-desktop-lyric-dialog', flag),
  setWindowMax: () => ipcRenderer.send('set-window-max'),
  setWindowMin: () => ipcRenderer.send('set-window-min'),
  setWindowClose: () => ipcRenderer.send('set-window-close'),
  setTryWindowClose: () => ipcRenderer.send('set-try-window-close'),
  setShellExternal: url => ipcRenderer.send('set-shell-external', url),
  setPlaySongStates: status => ipcRenderer.on('play-song-states', status),
  setThumbarButton: (status = false) => ipcRenderer.send('set-thumbar-button', status),
  setTrayPlaySongStates: status => ipcRenderer.send('tray-play-song-states', status),
  // 自动更新
  setCheckForUpdate: () => ipcRenderer.send('check-for-update'),
  setCheckAppVersion: () => ipcRenderer.invoke('check-app-version'),
  setMessageVersion: message => ipcRenderer.on('message-version', message),
  setDownloadProgress: progress => ipcRenderer.on('download-progress', progress),
});
