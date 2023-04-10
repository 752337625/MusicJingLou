const { BrowserWindow } = require('electron');
const url = require('url');
const { LOAD_URL_MAIN, isPro, LOADING_URL_MAIN_HASH } = require('../config');
function createLoading(cb) {
  const icon = isPro ? `${global.__images}/icon.png` : 'public/images/icon.png';
  global.loading = new BrowserWindow({
    show: false,
    frame: false, // 无边框（窗口、工具栏等），只包含网页内容
    width: 240,
    height: 450,
    movable: true,
    icon: icon,
    minimizable: false,
    maximizable: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
  });

  if (isPro) {
    global.loading.loadFile(LOAD_URL_MAIN, {
      hash: url.format(LOADING_URL_MAIN_HASH),
    });
  } else {
    global.loading.loadURL(LOADING_URL_MAIN_HASH);
  }
  global.loading.hookWindowMessage(278, () => {
    global.loading.setEnabled(false);
    let time = setTimeout(() => {
      global.loading.setEnabled(true);
      clearTimeout(time);
      time = null;
    }, 100);
    return true;
  });
  global.loading.show();
  global.loading.once('show', cb);
}

module.exports = { createLoading };
