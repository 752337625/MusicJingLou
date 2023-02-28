const { app, BrowserWindow, protocol } = require('electron');
// 判断系统处于什么环境
const isDev = require('electron-is-dev');
// 创建系统托盘
const { createTray } = require('./module/tray');
// 设置底部任务栏按钮和缩略图
const { setThumbarButtons } = require('./module/userTasks');
const path = require('path');
if (!isDev) {
	global.__img = path.join(__dirname, './img');
	global.__images = path.join(__dirname, './images');
}
const icon = isDev ? 'public/images/tray.ico' : `${global.__images}/tray.ico`;
protocol.registerSchemesAsPrivileged([
	{ scheme: 'jingluo', privileges: { secure: true, standard: true } },
]);
function createWindow() {
	global.win = new BrowserWindow({
		width: 1200,
		height: 900,
		center: true,
		show: false,
		minHeight: 900,
		minWidth: 1200,
		resizable: true,
		focusable: true,
		alwaysOnTop: false, // 窗口是否永远在其他窗口上面
		icon: icon,
		// titleBarStyle: 'hiddenInset',
		frame: false,
		backgroundColor: '#fff',
		hasShadow: true,
		webPreferences: {
			devTools: isDev, // 是否开启 DevTools
			webSecurity: true, //允许跨域
			nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
			contextIsolation: false, // 可以使用require方法,
			preload: path.join(__dirname, './preload.js'),
		},
	});
	global.win.once('ready-to-show', () => {
		global.win.show();
		global.win.focus();
		if (process.platform === 'win32') {
			// 设置任务栏操作和缩略图
			setThumbarButtons(global.win, false);
		}
	});
	// 设置appId才能使用Notification
	if (process.platform === 'win32') {
		// 去除原生顶部菜单栏
		global.win.removeMenu();
		// 如果是windows系统模拟托盘菜单
		global.tray = createTray();
		// let trayBounds = global.tray.getBounds();
		// global.trayWindow = createTrayWindow(trayBounds);
	}
	// app.setUserTasks([]);
	// 生产环境、开发环境，访问的路径不同
	// 开发环境下，我们访问的是 Vite 本地服务
	// 打包之后，我们访问的是 dist 静态文件
	// 所以这里要加个判断
	if (isDev) {
		global.win.loadURL('http://localhost:3100/jingluo');
		global.win.webContents.openDevTools();
	} else {
		global.win.loadFile(path.join(__dirname, '../index.html'));
	}
	// 窗口注册close事件
	global.win.on('close', _event => {
		// event.preventDefault(); // 阻止窗口关闭
	});
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
