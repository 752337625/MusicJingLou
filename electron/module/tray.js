const { Tray, screen, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
import { LOAD_URL } from './../config';

const trayWinURL = isDev ? `http://localhost:9080/#tray` : `${LOAD_URL}#tray`;
const createTray = function () {
	let { width: screenWidth } = screen.getPrimaryDisplay().size;
	const trayIconPath = __static + '/images/tray.ico';
	const appTray = new Tray(trayIconPath);
	appTray.setToolTip('网易云音乐');
	appTray.on('right-click', (_event, _bounds) => {
		const [trayMenuWidth, trayMenuHeight] = global.trayWindow.getSize();
		let { x, y } = screen.getCursorScreenPoint();
		if (x + trayMenuWidth > screenWidth) {
			global.trayWindow.setPosition(x - trayMenuWidth, y - trayMenuHeight);
		} else {
			global.trayWindow.setPosition(x, y - trayMenuHeight);
		}
		global.trayWindow.show();
	});
	// appTray.on('click', (event, bounds) => {
	//   if (global.mainWindow.isVisible()) {
	//     global.mainWindow.hide()
	//   } else {
	//     global.mainWindow.show()
	//   }
	// })
	return appTray;
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
