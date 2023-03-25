const { BrowserWindow } = require('electron');
const { SCHEME } = require('../config');
const isDev = require('electron-is-dev');
const path = require('path');
const createLoginWindow = function () {
  const LoginWinURL = isDev ? `http://localhost:3100/jingluo/layouts/login/qr` : `${SCHEME}#tray`;
  const win = {
    parent: global.win,
    center: true,
    height: 530,
    width: 350,
    show: false,
    frame: false,
    movable: true,
    minimizable: false,
    maximizable: false,
    resizable: false,
    webPreferences: {
      webSecurity: true, //允许跨域
      nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
      contextIsolation: true, // 可以使用require方法,
      preload: path.join(__dirname, '../preload.js'),
    },
  };
  const loginWindow = new BrowserWindow(win);
  loginWindow.on('show', () => {
    loginWindow.loadURL(LoginWinURL);
  });
  loginWindow.hookWindowMessage(278, () => {
    loginWindow.setEnabled(false);
    setTimeout(() => {
      loginWindow.setEnabled(true);
    }, 100);
    return true;
  });
  return loginWindow;
};
module.exports = { createLoginWindow };
