const { Tray, BrowserWindow, screen } = require('electron');
// const isDev = require('electron-is-dev');
const isDev = process.env.NODE_ENV !== 'production';
const { TRY_URL_MAIN } = require('../config');
const path = require('path');
const createTray = function () {
  // 当前电脑屏幕得分辨率
  let { width } = screen.getPrimaryDisplay().size;
  const trayIconPath = isDev ? 'public/images/tray.ico' : `${global.__images}/tray.ico`;
  global.tray = new Tray(trayIconPath);
  global.tray.setToolTip('网易云音乐');
  global.tray.on('click', () => {
    global.win.isVisible() ? global.win.focus() : global.win.restore(), global.win.show();
  });
  global.tray.on('right-click', () => {
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
};
const createTrayWindow = function () {
  const bounds = global.tray.getBounds();
  global.trayWindow = new BrowserWindow({
    width: 210,
    height: 310,
    x: bounds.x,
    y: bounds.y - 300,
    show: false,
    frame: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: true,
    // parent: global.mainWindow,
    webPreferences: {
      webSecurity: true, //允许跨域
      nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
      contextIsolation: true, // 可以使用require方法,
      preload: path.join(__dirname, '../preload.js'),
    },
  });
  global.trayWindow.loadURL(TRY_URL_MAIN);
  global.trayWindow.on('blur', () => global.trayWindow.hide());
};

module.exports = { createTray, createTrayWindow };
