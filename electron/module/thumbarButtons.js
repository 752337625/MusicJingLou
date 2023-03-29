// 设置window底部任务栏按钮（缩略图）
const { isPro } = require('../config');
const prevIcon = isPro ? `${global.__images}/prev.png` : 'public/images/prev.png';
const nextIcon = isPro ? `${global.__images}/next.png` : 'public/images/next.png';
const playIcon = isPro ? `${global.__images}/play.png` : 'public/images/play.png';
const pauseIcon = isPro ? `${global.__images}/pause.png` : 'public/images/pause.png';
const setThumbarButton = function (playing = false) {
  global.win.setThumbarButtons([
    {
      tooltip: '上一曲',
      icon: prevIcon,
      click() {
        global.win.webContents.send('play-song-states', 'prev');
      },
    },
    {
      tooltip: playing ? '暂停' : '播放',
      icon: playing ? pauseIcon : playIcon,
      click() {
        global.win.webContents.send('play-song-states', 'play');
      },
    },
    {
      tooltip: '下一曲',
      icon: nextIcon,
      click() {
        global.win.webContents.send('play-song-states', 'next');
      },
    },
  ]);
  global.win.setThumbnailClip({ x: 0, y: 0, width: 0, height: 0 });
};

module.exports = { setThumbarButton };
