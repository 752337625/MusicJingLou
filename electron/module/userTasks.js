const isDev = require('electron-is-dev');
const prevIcon = isDev ? 'public/images/prev.png' : `${global.__images}/prev.png`;
const nextIcon = isDev ? 'public/images/next.png' : `${global.__images}/next.png`;
const playIcon = isDev ? 'public/images/play.png' : `${global.__images}/play.png`;
const pauseIcon = isDev ? 'public/images/pause.png' : `${global.__images}/pause.png`;
const setThumbarButtons = function (win, playing) {
	global.win.setThumbarButtons([
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
	global.win.setThumbnailClip({ x: 0, y: 0, width: 0, height: 0 });
};

module.exports = { setThumbarButtons };
