const { BrowserWindow, ipcMain, shell, app } = require('electron');
const { autoUpdater } = require('electron-updater'); // 将版本打包才没问题，使用5.x版本打包后报错。具体原因不探讨了
// 创建桌面歌词win
const { setThumbarButton } = require('./module/thumbarButtons');
function ipcMainFn() {
  ipcMain.on('show-window', () => {
    global.win.show();
  });

  ipcMain.on('set-window-min', () => {
    global.win.minimize();
  });

  ipcMain.on('set-window-max', () => {
    if (global.win.isMaximized()) {
      global.win.restore();
    } else {
      global.win.maximize();
    }
  });
  ipcMain.on('set-try-window-close', () => {
    let wins = BrowserWindow.getAllWindows();
    for (let i = 0; i < wins.length; i++) {
      wins[i].destroy();
    }
  });
  ipcMain.on('set-window-close', () => {
    global.win.hide();
  });
  ipcMain.on('toggle-mini', (event, params) => {
    if (params.value) {
      global.win.show();
      global.win.hide();
    } else {
      global.win.hide();
      global.win.show();
    }
  });
  ipcMain.on('set-login-dialog', (event, flag) => {
    flag ? global.loginWindow.show() : global.loginWindow.hide();
  });
  ipcMain.on('set-desktop-lyric-dialog', (event, flag) => {
    flag ? global.lyricWindow.show() : global.lyricWindow.hide();
  });
  ipcMain.on('set-shell-external', (event, url) => {
    shell.openExternal(url);
  });
  ipcMain.on('set-thumbar-button', (_event, value = false) => {
    setThumbarButton(value);
  });
  ipcMain.on('tray-play-song-states', (_event, TYPE) => {
    if (TYPE === 'prev') {
      global.win.webContents.send('play-song-states', 'prev');
    } else if (TYPE === 'next') {
      global.win.webContents.send('play-song-states', 'next');
    }
  });
  // 我们需要主动触发一次更新检查;
  ipcMain.handle('check-for-update', async () => {
    // 当我们收到渲染进程传来的消息，主进程就就进行一次更新检查
    let updateCheckResult = await autoUpdater.checkForUpdates();
    return updateCheckResult.updateInfo.version;
  });
  // 当前引用的版本告知给渲染层;
  ipcMain.handle('check-app-version', () => {
    return app.getVersion();
  });
  // 触发更新
  ipcMain.on('download-update', () => {
    autoUpdater.downloadUpdate();
  });
  ipcMain.on('quit-and-install', () => {
    autoUpdater.quitAndInstall();
    let wins = BrowserWindow.getAllWindows();
    for (let i = 0; i < wins.length; i++) {
      wins[i].destroy();
    }
  });
  // 手动设置--禁用开机自启
  ipcMain.on('disable-auto-launch', () => {
    global.autoLaunchInstance.disable();
    global.autoLaunchInstance.isEnabled().then(function (isEnabled) {
      global.win.webContents.send('auto-launch-instance', isEnabled);
    });
  });
  // 手动设置，开机自启动
  ipcMain.on('enable-auto-launch', () => {
    global.autoLaunchInstance.enable();
    global.autoLaunchInstance.isEnabled().then(function (isEnabled) {
      global.win.webContents.send('auto-launch-instance', isEnabled);
    });
  });
  // 获取状态
  ipcMain.on('get-enable-auto-launch', () => {
    global.autoLaunchInstance.isEnabled().then(function (isEnabled) {
      global.win.webContents.send('auto-launch-instance', isEnabled);
    });
  });
}
module.exports = ipcMainFn;
