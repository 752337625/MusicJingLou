const url = require('url');
const path = require('path');
const { BrowserWindow, screen } = require('electron');
const { LOAD_URL_MAIN, isPro, LYRIC_URL_MAIN_HASH } = require('../config');
const createLyricWindow = function () {
  let { size } = screen.getPrimaryDisplay();
  let w = (size.width - 800) / 2;
  let h = size.height - 200;
  global.lyricWindow = new BrowserWindow({
    useContentSize: true,
    center: true,
    maxWidth: 800,
    maxWidth: 800,
    minHeight: 120,
    maxHeight: 120,
    show: false,
    frame: false,
    x: w,
    y: h,
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
  });
  global.lyricWindow.on('show', () => {
    if (isPro) {
      // lyricWindow.webContents.openDevTools();
      global.lyricWindow.loadURL(LYRIC_URL_MAIN_HASH);
    } else {
      global.lyricWindow.loadFile(LOAD_URL_MAIN, {
        hash: url.format(LYRIC_URL_MAIN_HASH),
      });
    }
  });
  global.lyricWindow.hookWindowMessage(278, () => {
    global.lyricWindow.setEnabled(false);
    setTimeout(() => {
      global.lyricWindow.setEnabled(true);
    }, 100);
    return true;
  });
};
module.exports = { createLyricWindow };
