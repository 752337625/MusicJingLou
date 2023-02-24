const windowStateKeeper = require('electron-window-state');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
// const path = require('path');

function createWindow() {
	const mainWindowState = windowStateKeeper({
		defaultWidth: 1000,
		defaultHeight: 800,
	});
	const win = new BrowserWindow({
		...mainWindowState,
		show: true,
		webPreferences: {
			devTools: isDev, // 是否开启 DevTools
			webSecurity: true, //允许跨域
			nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
			contextIsolation: false, // 可以使用require方法
			plugins: true, // 是否开启插件支持
			experimentalFeatures: true, // 开启 Chromium 的 可测试 特性
			experimentalCanvasFeatures: true, // 开启 Chromium 的 canvas 可测试特性
			minimumFontSize: 10,
		},
	});
	app.setUserTasks([]);
	// 生产环境、开发环境，访问的路径不同
	// 开发环境下，我们访问的是 Vite 本地服务
	// 打包之后，我们访问的是 dist 静态文件
	// 所以这里要加个判断
	if (isDev) {
		win.loadURL('http://localhost:3100/jinluo');
		// win.loadFile(path.join(__dirname, '../index.html'));
		win.webContents.openDevTools();
	} else {
		// 集成网页和 Node.js 后，需要加载
		// 这里接收的网址是指：Vite 启动后，会在本地运行一个服务，把这个服务网址丢进去就行
		// 使用 Vite 自带的环境变量 VITE_DEV_SERVER_HOST
		// 如果是 undefined，就换成 VITE_DEV_SERVER_HOSTNAME
		win.loadURL(
			`http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`,
		);
	}
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
