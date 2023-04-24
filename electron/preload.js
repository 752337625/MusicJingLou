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
  setCheckForUpdate: () => ipcRenderer.invoke('check-for-update'),
  setCheckAppVersion: () => ipcRenderer.invoke('check-app-version'),
  setMessageAppVersionInfo: message => ipcRenderer.on('message-app-version-info', message),
  setDownloadUpdate: () => ipcRenderer.send('download-update'),
  setDownloadProgress: progress => ipcRenderer.on('download-progress', progress),
  setUpdateDownload: message => ipcRenderer.on('update-downloaded', message),
  setQuitAndInstall: () => ipcRenderer.send('quit-and-install'),

  // 自动启动
  setDisableAutoLaunch: () => ipcRenderer.send('disable-auto-launch'),
  setEnableAutoLaunch: () => ipcRenderer.send('enable-auto-launch'),
  setAutoLaunchInstance: isEnabled => ipcRenderer.on('auto-launch-instance', isEnabled),
  getEnableAutoLaunch: () => ipcRenderer.send('get-enable-auto-launch'),
  // 打开文件路径
  getUserOpenFile: file => ipcRenderer.on('user-open-file', file),
});
