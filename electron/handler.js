const { BrowserWindow, ipcMain } = require('electron');

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
  ipcMain.on('set-login-dialog', (event, params) => {
    console.log(params);
  });
}
module.exports = ipcMainFn;
