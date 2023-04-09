const { BrowserWindow } = require('electron');
const { LOAD_URL_MAIN, isPro, LOADING_URL_MAIN_HASH } = require('../config');
function createLoading(cd) {
  global.loading = new BrowserWindow({
    show: false,
    frame: false, // 无边框（窗口、工具栏等），只包含网页内容
    width: 240,
    height: 500,
    movable: true,
    minimizable: false,
    maximizable: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
  });
  if (isPro) {
    global.loading.loadFile(LOAD_URL_MAIN, {
      hash: url.format(LOADING_URL_MAIN_HASH),
    });
  } else {
    global.loading.loadURL(LOADING_URL_MAIN_HASH);
  }
  global.loading.show();
  global.loading.once('show', cd);
}

module.exports = { createLoading };
