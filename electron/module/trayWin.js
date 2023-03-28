const { Tray, BrowserWindow, screen } = require('electron');
const isDev = require('electron-is-dev');
const { LOAD_URL } = require('../config');
const path = require('path');
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
  const TrayWinURL = isDev ? `http://localhost:3100/jingluo/tray` : `${LOAD_URL}/jingluo/tray`;
  const win = {
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
  };
  const trayWindow = new BrowserWindow(win);
  // 禁用右键菜单
  // trayWindow.webContents.openDevTools();
  trayWindow.loadURL(TrayWinURL);
  trayWindow.on('blur', () => trayWindow.hide());
  return trayWindow;
};

module.exports = { createTray, createTrayWindow };
