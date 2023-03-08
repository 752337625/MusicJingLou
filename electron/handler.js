const { BrowserWindow, ipcMain } = require('electron');
exports.module = function () {
  ipcMain.on('show-window', () => {
    global.win.show();
  });

  ipcMain.on('window-min', () => {
    global.win.minimize();
  });

  ipcMain.on('window-max', () => {
    if (global.win.isMaximized()) {
      global.win.restore();
    } else {
      global.win.maximize();
    }
  });
  ipcMain.on('window-close', () => {
    let wins = BrowserWindow.getAllWindows();
    for (let i = 0; i < wins.length; i++) {
      wins[i].close();
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
};
