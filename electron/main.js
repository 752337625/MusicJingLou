const path = require('path');
const { app, BrowserWindow } = require('electron');
const { creatProtocol } = require('./module/protocol');
const ipcMainFn = require('./handler');

// 判断系统处于什么环境
const isDev = require('electron-is-dev');
// 创建系统托盘
const { createTray, createTrayWindow } = require('./module/tray');
// 设置window底部任务栏按钮（缩略图）
const { setThumbarButton } = require('./module/thumbarButtons');
// 注册协议
creatProtocol();
if (!isDev) {
  global.__img = path.join(__dirname, './img');
  global.__images = path.join(__dirname, './images');
}
const icon = isDev ? 'public/images/tray.ico' : `${global.__images}/tray.ico`;

// 取消安全校验
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
function createWindow() {
  global.win = new BrowserWindow({
    // center: true,
    show: false,
    minWidth: 1500,
    minHeight: 900,
    resizable: true,
    alwaysOnTop: false, // 窗口是否永远在其他窗口上面
    icon: icon,
    titleBarStyle: 'hiddenInset',
    frame: process.platform !== 'win32',
    backgroundColor: '#fff',
    hasShadow: true,
    webPreferences: {
      devTools: isDev, // 是否开启 DevTools
      webSecurity: true, //允许跨域
      nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
      contextIsolation: true, // 可以使用require方法,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
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
      global.tray = createTray();
      // 如果是windows系统模拟托盘右键菜单
      global.trayWindow = createTrayWindow();
    }
  });
  if (process.platform === 'win32') {
  }
  // app.setUserTasks([]);
  if (isDev) {
    global.win.loadURL('http://localhost:3100/jingluo');
    global.win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      // Note that the path to electron may vary according to the main file
      electron: require(`../node_modules/electron`),
    });
  } else {
    global.win.loadFile(path.join(__dirname, '../index.html'));
  }
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
  ipcMainFn();
  createWindow();
});

// 为避免启动多个应用 在 macOS Linux Windows 下都可以
app.on('second-instance', () => {
  const win = BrowserWindowsMap.get(global.win.id);
  if (win) {
    win.restore();
    win.show();
  }
  // const tray = BrowserWindowsMap.get(global.tray.id);
  // if (tray) {
  // 	tray.restore();
  // 	tray.show();
  // }
});
app.on('activate', () => {
  if (!BrowserWindow.getAllWindows().length) return createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') return app.quit();
});
