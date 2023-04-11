const path = require('path');
const url = require('url');
const { app, BrowserWindow, screen } = require('electron');
const ipcMainFn = require('./handler');
const { checkUpdate } = require('./module/autoUpdater');
const { LOAD_URL_MAIN, isPro, WIN_URL_MAIN_HASH } = require('./config');
const { creatProtocol } = require('./module/protocol');
// 创建登录win
const { createLoginWindow } = require('./module/loginWin');
// 创建托盘win
const { createTray, createTrayWindow } = require('./module/trayWin');
// 创建桌面歌词win
const { createLyricWindow } = require('./module/desktopLyricWin');
//  加载动画
const { createLoading } = require('./module/loadingWin');
// 设置window底部任务栏按钮（缩略图）
const { setThumbarButton } = require('./module/thumbarButtons');
// 开机自启动
const { checkIsAutoLaunch } = require('./module/autoLaunch');
// 注册浏览器打开协议
creatProtocol();
if (isPro) global.__images = path.join(__dirname, '../dist/images');
const icon = isPro ? `${global.__images}/icon.png` : 'public/images/icon.png';
// 取消安全校验
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
function createWindow() {
  let { size } = screen.getPrimaryDisplay();
  let w = (size.width - 1660) / 2;
  let h = (size.height - 800) / 2;
  global.win = new BrowserWindow({
    x: w,
    y: h,
    show: false,
    center: true,
    width: 1660,
    height: 800,
    minWidth: 1660,
    minHeight: 800,
    resizable: true,
    // fullscreen: true,
    alwaysOnTop: false, // 窗口是否永远在其他窗口上面
    icon: icon,
    titleBarStyle: 'hiddenInset',
    frame: process.platform !== 'win32',
    backgroundColor: '#fff',
    hasShadow: true,
    skipTaskbar: false,
    webPreferences: {
      webSecurity: true, //允许跨域
      nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
      contextIsolation: true, // 可以使用require方法,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  global.win.hookWindowMessage(278, () => {
    global.win.setEnabled(false);
    let time = setTimeout(() => {
      global.win.setEnabled(true);
      clearTimeout(time);
      time = null;
    }, 100);
    return true;
  });
  if (isPro) {
    global.win.loadFile(LOAD_URL_MAIN, {
      hash: url.format(WIN_URL_MAIN_HASH),
    });
    // global.win.webContents.openDevTools();
  } else {
    global.win.loadURL(WIN_URL_MAIN_HASH);
    global.win.webContents.openDevTools();
  }
  global.win.once('ready-to-show', () => {
    let time = setTimeout(() => {
      global.loading ? global.loading.hide() : null;
      global.loading ? global.loading.close() : null;
      global.win.show();
      if (process.platform === 'win32') {
        // 设置任务栏缩略图
        setThumbarButton(false);
        // 如果是windows系统模拟托盘菜单
        createTray();
        // 如果是windows系统模拟托盘右键菜单
        createTrayWindow();
        // 创建login框
        createLoginWindow();
        // 创建桌面歌词框
        createLyricWindow();
      }
      clearTimeout(time);
      time = null;
    }, 3000);
  });
  //在窗口要关闭的时候触发。 它在DOM 的beforeunload 和 unload 事件之前触发. 调用event.preventDefault()将阻止这个操作。
  global.win.on('close', event => {
    event.preventDefault(); // 阻止窗口关闭
    // 隐藏不是关闭
    if (process.platform !== 'darwin') return global.win.hide();
  });
  //在窗口关闭时触发 当你接收到这个事件的时候, 你应当移除相应窗口的引用对象，避免再次使用它.
  global.win.on('closed', _event => {
    //console.log(event);
  });
  // 通讯
  ipcMainFn();
  // 检测更新
  checkUpdate();
  //  开机自启
  checkIsAutoLaunch();
}
// function createLoading(cb) {
//   global.loading = new BrowserWindow({
//     show: false,
//     frame: false, // 无边框（窗口、工具栏等），只包含网页内容
//     width: 240,
//     height: 500,
//     movable: true,
//     minimizable: false,
//     maximizable: false,
//     resizable: false,
//     alwaysOnTop: true,
//     skipTaskbar: true,
//     transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true
//   });
//   if (isPro) {
//     global.loading.loadFile(LOAD_URL_MAIN, {
//       hash: url.format(LOADING_URL_MAIN_HASH),
//     });
//   } else {
//     global.loading.loadURL(LOADING_URL_MAIN_HASH);
//   }
//   global.loading.once('ready-to-show', () => {
//     global.loading.show();
//   });
//   global.loading.once('show', cb);
// }

app.whenReady().then(() => {
  if (isPro) return createLoading(createWindow());
  createWindow();
});

app.on('activate', () => {
  if (!BrowserWindow.getAllWindows().length) return createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') return app.quit();
});
// app.setLoginItemSettings({ openAtLogin: true }); // 开机自启
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (_event, _commandLine, _workingDirectory) => {
    if (global.win) {
      if (global.win.isMinimized()) global.win.restore();
      global.win.focus();
      global.win.show();
    }
  });
}
