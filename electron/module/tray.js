const { Tray, BrowserWindow, screen } = require('electron');
const isDev = require('electron-is-dev');
const { SCHEME } = require('../config');
const createTray = function () {
  // 当前电脑屏幕得分辨率
  let { width } = screen.getPrimaryDisplay().size;
  const trayIconPath = isDev ? 'public/images/tray.ico' : `${global.__images}/tray.ico`;
  const tray = new Tray(trayIconPath);
  tray.setToolTip('网易云音乐');
  tray.on('click', () => {
    global.win.isVisible() ? global.win.focus() : global.win.restore(), global.win.show();
  });
  tray.on('right-click', () => {
    // 返回当前trayWindow窗口得大小
    const [trayMenuWidth, trayMenuHeight] = global.trayWindow.getSize();
    // 当前鼠标的绝对位置。没看明白官方给的意思
    let { x, y } = screen.getCursorScreenPoint();
    if (x + trayMenuWidth > width) {
      global.trayWindow.setPosition(x - trayMenuWidth, y - trayMenuHeight);
    } else {
      global.trayWindow.setPosition(x, y - trayMenuHeight);
    }
    global.trayWindow.show();
  });
  return tray;
};
const createTrayWindow = function () {
  const bounds = global.tray.getBounds();
  const trayWinURL = isDev ? `http://localhost:3100/jingluo/tray` : `${SCHEME}#tray`;
  const win = {
    height: 350,
    width: 200,
    x: bounds.x,
    y: bounds.y - 350,
    show: false,
    frame: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    // parent: global.mainWindow,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      devTools: false,
    },
  };
  const trayWindow = new BrowserWindow(win);
  // 禁用右键菜单
  trayWindow.setEnabled(false);
  trayWindow.loadURL(trayWinURL);
  trayWindow.on('blur', () => {
    trayWindow.hide();
  });
  trayWindow.on('closed', () => {
    global.trayWindow = null;
  });
  return trayWindow;
};

module.exports = { createTray, createTrayWindow };
