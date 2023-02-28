const { Tray, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const trayWinURL = isDev ? `http://localhost:9080/#tray` : `${LOAD_URL}#tray`;
const createTray = function () {
	const trayIconPath = isDev ? 'public/images/tray.ico' : `${global.__images}/tray.ico`;
	const tray = new Tray(trayIconPath);
	tray.on('double-click', () => {
		global.win.isVisible() ? '' : win.show();
	});
	tray.setToolTip('网易云音乐');
	return tray;
};
const createTrayWindow = function (bounds) {
	const obj = {
		height: 350,
		width: 200,
		x: bounds.x,
		y: bounds.y - 310,
		show: false,
		frame: false,
		fullscreenable: false,
		movable: false,
		minimizable: false,
		maximizable: false,
		resizable: process.env.NODE_ENV === 'development',
		transparent: process.platform !== 'linux',
		alwaysOnTop: true,
		skipTaskbar: true,
		// parent: global.mainWindow,
		webPreferences: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true,
			backgroundThrottling: false,
			devTools: false,
		},
	};

	const trayWindow = new BrowserWindow(obj);

	trayWindow.loadURL(trayWinURL);

	trayWindow.on('blur', () => {
		trayWindow.hide();
	});

	trayWindow.on('closed', () => {
		trayWindow = null;
	});
	return trayWindow;
};

module.exports = { createTray, createTrayWindow };
