const path = require('path');
const url = require('url');
const { app, BrowserWindow, screen } = require('electron');
const { creatProtocol } = require('./module/protocol');
// 创建登录win
const { createLoginWindow } = require('./module/loginWin');
// 创建托盘win
const { createTray, createTrayWindow } = require('./module/trayWin');
// 创建桌面歌词win
const { createLyricWindow } = require('./module/desktopLyricWin');
// 设置window底部任务栏按钮（缩略图）
const { setThumbarButton } = require('./module/thumbarButtons');
const ipcMainFn = require('./handler');
const { LOAD_URL_MAIN, isPro, WIN_URL_MAIN_HASH } = require('./config');
// 注册协议
creatProtocol();
if (isPro) global.__images = path.join(__dirname, '../dist/images');
const icon = isPro ? `${global.__images}/tray.ico` : 'public/images/tray.ico';
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
    setTimeout(() => {
      global.win.setEnabled(true);
    }, 100);
    return true;
  });
  if (isPro) {
    global.win.loadFile(LOAD_URL_MAIN, {
      hash: url.format(WIN_URL_MAIN_HASH),
    });
  } else {
    global.win.loadURL(WIN_URL_MAIN_HASH);
    global.win.webContents.openDevTools();
  }
  // 禁用右键菜单,这个禁用后所有的功能都不能点了
  // global.win.setEnabled(false);
  global.win.once('ready-to-show', () => {
    global.win.show();
    if (process.platform === 'win32') {
      // 设置任务栏缩略图
      setThumbarButton(false);
      // 去除原生顶部菜单栏
      // global.win.removeMenu();
      // 如果是windows系统模拟托盘菜单
      createTray();
      // // 如果是windows系统模拟托盘右键菜单
      createTrayWindow();
      // // 创建login框
      createLoginWindow();
      // // 创建桌面歌词框
      createLyricWindow();
    }
  });
  // if (process.platform === 'win32') {}
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
}

app.whenReady().then(() => {
  createWindow();
  ipcMainFn();
});

app.on('activate', () => {
  if (!BrowserWindow.getAllWindows().length) return createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') return app.quit();
});
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
