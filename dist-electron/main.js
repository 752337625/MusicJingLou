'use strict';
const { app: o, BrowserWindow: t, protocol: s } = require('electron'),
	e = require('electron-is-dev'),
	{ createTray: r } = require('./module/tray'),
	l = require('path'),
	c = new Map();
e ||
	((global.__img = l.join(__dirname, './img')), (global.__images = l.join(__dirname, './images')));
const g = e ? 'public/images/tray.ico' : `${global.__images}/tray.ico`,
	p = e ? 'public/images/prev.png' : `${global.__images}/prev.png`,
	u = e ? 'public/images/next.png' : `${global.__images}/next.png`,
	w = e ? 'public/images/play.png' : `${global.__images}/play.png`,
	b = e ? 'public/images/pause.png' : `${global.__images}/pause.png`;
s.registerSchemesAsPrivileged([{ scheme: 'jingluo', privileges: { secure: !0, standard: !0 } }]);
const m = function (i, n) {
	i.setThumbarButtons([
		{ tooltip: '上一曲', icon: p, click() {} },
		{ tooltip: n ? '暂停' : '播放', icon: n ? b : w, click() {} },
		{ tooltip: '下一曲', icon: u, click() {} },
	]);
};
function a() {
	(global.win = new t({
		width: 1200,
		height: 900,
		center: !0,
		show: !1,
		minHeight: 900,
		minWidth: 1200,
		resizable: !0,
		focusable: !0,
		alwaysOnTop: !1,
		icon: g,
		frame: !1,
		backgroundColor: '#fff',
		hasShadow: !0,
		webPreferences: { devTools: e, webSecurity: !0, nodeIntegration: !0, contextIsolation: !1 },
	})),
		c.set(global.win.id, global.win),
		global.win.once('ready-to-show', () => {
			global.win.show(),
				process.platform === 'win32' &&
					(m(win, !1), global.win.setThumbnailClip({ x: 0, y: 0, width: 180, height: 50 }));
		}),
		process.platform === 'win32' && (global.win.removeMenu(), (global.tray = r())),
		e
			? (global.win.loadURL('http://localhost:3100/jingluo'), global.win.webContents.openDevTools())
			: global.win.loadURL(
					`http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`,
			  ),
		global.win.on('close', i => {
			i.preventDefault();
		});
}
o.whenReady().then(() => {
	a(),
		o.on('activate', () => {
			t.getAllWindows().length === 0 && a();
		});
});
o.on('window-all-closed', () => {
	process.platform !== 'darwin' && o.quit();
});
