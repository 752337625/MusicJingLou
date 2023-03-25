const { BrowserWindow, screen } = require('electron');
const isDev = require('electron-is-dev');
const { SCHEME } = require('../config');
const path = require('path');
const createLyricWindow = function () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const lyricWinURL = isDev ? `http://localhost:3100/jingluo/desktop` : `${SCHEME}#tray`;
  const obj = {
    minWidth: 650,
    width,
    height: 80,
    show: false,
    frame: false,
    x: 0,
    y: height - 150,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true, // 任务栏中不显示窗口
    closable: false,
    hasShadow: true,
    webPreferences: {
      webSecurity: true, //允许跨域
      nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
      contextIsolation: true, // 可以使用require方法,
      preload: path.join(__dirname, '../preload.js'),
    },
  };
  let lyricWindow = new BrowserWindow(obj);
  lyricWindow.on('show', () => {
    lyricWindow.loadURL(lyricWinURL);
    lyricWindow.webContents.openDevTools();
  });
  lyricWindow.hookWindowMessage(278, () => {
    lyricWindow.setEnabled(false);
    setTimeout(() => {
      lyricWindow.setEnabled(true);
    }, 100);
    return true;
  });
  return lyricWindow;
};
module.exports = { createLyricWindow };
