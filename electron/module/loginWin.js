const url = require('url');
const path = require('path');
const { BrowserWindow } = require('electron');
const { LOAD_URL_MAIN, isPro, LOGIN_URL_MAIN_HASH } = require('../config');
const createLoginWindow = function () {
  global.loginWindow = new BrowserWindow({
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
  });
  // loginWindow.webContents.openDevTools();
  global.loginWindow.on('show', () => {
    if (isPro) {
      global.loginWindow.loadFile(LOAD_URL_MAIN, {
        hash: url.format(LOGIN_URL_MAIN_HASH),
      });
    } else {
      // loginWindow.webContents.openDevTools();
      global.loginWindow.loadURL(LOGIN_URL_MAIN_HASH);
    }
  });
  global.loginWindow.hookWindowMessage(278, () => {
    global.loginWindow.setEnabled(false);
    setTimeout(() => {
      global.loginWindow.setEnabled(true);
    }, 100);
    return true;
  });
};
module.exports = { createLoginWindow };
