const { app, BrowserWindow, protocol } = require('electron');
// 判断系统处于什么环境
const isDev = require('electron-is-dev');
// 创建系统托盘
const { createTray } = require('./module/tray');
const path = require('path');
const map = new Map();
if (!isDev) {
	global.__img = path.join(__dirname, './img');
	global.__images = path.join(__dirname, './images');
}
const icon = isDev ? 'public/images/tray.ico' : `${global.__images}/tray.ico`;
const prevIcon = isDev ? 'public/images/prev.png' : `${global.__images}/prev.png`;
const nextIcon = isDev ? 'public/images/next.png' : `${global.__images}/next.png`;
const playIcon = isDev ? 'public/images/play.png' : `${global.__images}/play.png`;
const pauseIcon = isDev ? 'public/images/pause.png' : `${global.__images}/pause.png`;
protocol.registerSchemesAsPrivileged([
	{ scheme: 'jingluo', privileges: { secure: true, standard: true } },
]);
// 设置底部任务栏按钮和缩略图
const setThumbarButtons = function (mainWindow, playing) {
	mainWindow.setThumbarButtons([
		{
			tooltip: '上一曲',
			icon: prevIcon,
			click() {
				// mainWindow.webContents.send('prev-play');
			},
		},
		{
			tooltip: playing ? '暂停' : '播放',
			icon: playing ? pauseIcon : playIcon,
			click() {
				// mainWindow.webContents.send('toggle-play', {
				// 	value: !playing,
				// });
			},
		},
		{
			tooltip: '下一曲',
			icon: nextIcon,
			click() {
				// mainWindow.webContents.send('next-play');
			},
		},
	]);
};

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
			contextIsolation: false, // 可以使用require方法
		},
	});
	map.set(global.win.id, global.win);
	global.win.once('ready-to-show', () => {
		global.win.show();
		// 设置任务栏操作和缩略图
		if (process.platform === 'win32') {
			setThumbarButtons(win, false);
			global.win.setThumbnailClip({ x: 0, y: 0, width: 180, height: 50 });
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
		// 集成网页和 Node.js 后，需要加载
		// 这里接收的网址是指：Vite 启动后，会在本地运行一个服务，把这个服务网址丢进去就行
		// 使用 Vite 自带的环境变量 VITE_DEV_SERVER_HOST
		// 如果是 undefined，就换成 VITE_DEV_SERVER_HOSTNAME
		global.win.loadURL(
			`http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`,
		);
	}
	// 窗口注册close事件
	global.win.on('close', event => {
		event.preventDefault(); // 阻止窗口关闭
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
