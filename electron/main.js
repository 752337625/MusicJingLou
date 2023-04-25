const { LOAD_URL_MAIN, isPro, WIN_URL_MAIN_HASH } = require('./config');
const { app, BrowserWindow, screen, globalShortcut } = require('electron');
const path = require('path');
const url = require('url');
const { registerGlobalLog } = require('./log');
// 线程通信
const ipcMainFn = require('./handler');
// 更新检测
const { checkUpdate } = require('./module/autoUpdater');
// 浏览器协议打开
const { creatProtocol } = require('./module/protocol');
// 创建登录win
const { createLoginWindow } = require('./module/loginWin');
// 创建托盘win
const { createTray, createTrayWindow } = require('./module/trayWin');
// 创建桌面歌词win
const { createLyricWindow } = require('./module/desktopLyricWin');
// 开机加载动画
const { createLoading } = require('./module/loadingWin');
// 设置window底部任务栏按钮（缩略图）
const { setThumbarButton } = require('./module/thumbarButtons');
// 开机自启动
const { checkIsAutoLaunch } = require('./module/autoLaunch');
// 注册全局按键
const { registerGlobalShortcut } = require('./module/registerGlobalShortcut');
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
  // 注册快捷
  registerGlobalShortcut();
  // 注册全局日志
  global.log = registerGlobalLog();
}
// 当用户想要在应用中打开一个文件时发出。 open-file 事件通常在应用已经打开，并且系统要再次使用该应用打开文件时发出。 open-file也会在一个文件被拖到 dock 并且还没有运行的时候发出。 请确认在应用启动的时候(甚至在 ready 事件发出前) 就对 open-file 事件进行监听。
// 如果你想处理这个事件，你应该调用 event.preventDefault() 。
// 在 Windows 系统中，你需要解析 process.argv (在主进程中) 来获取文件路径
app.on('open-file', (event, path) => {
  event.preventDefault();
  global.log.warn(5555);
  global.log.warn(path);
  global.log.warn(process.argv);
  // event.preventDefault();
  // win是打开的窗口，如果程序未启动则不会触发
  // 窗口打开后可通过渲染进程代码global来获取路径
  // let fileToOpen = path;
  // if (process.platform === 'win32') fileToOpen = process.argv[1];
  // if (global.win) {
  //   global.win.webContents.send('user-open-file', fileToOpen);
  // }
});
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
app.on('will-quit', () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
});
// 默认新程序启动会触发main.js重新加载，这是就会判断gotTheLock是否为false，则退出去当前新开的进程。
// 而老主进程'second-instance'事件触发
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (_event, argv, _workingDirectory) => {
    if (!app.hasSingleInstanceLock() || !global.win) return;
    if (global.win.isMinimized()) global.win.restore();
    global.win.focus();
    global.win.show();
    if (argv.length <= 2) return;
    let filePath = argv[2];
    let flag = filePath.toLocaleUpperCase().includes('.MP3');
    if (flag) global.win.webContents.send('user-open-file', filePath);
  });
}
