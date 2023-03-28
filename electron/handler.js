const { BrowserWindow, ipcMain, shell } = require('electron');
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
  ipcMain.on('set-window-close', () => {
    let wins = BrowserWindow.getAllWindows();
    for (let i = 0; i < wins.length; i++) {
      wins[i].destroy();
    }
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
  ipcMain.on('set-thumbar-button', (_event, value) => {
    setThumbarButton(value);
  });
}
module.exports = ipcMainFn;
