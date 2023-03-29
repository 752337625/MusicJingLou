const { app } = require('electron');
const SCHEME = 'JINGLUO';
const LOAD_URL_MAIN = `dist/index.html`;
const isDev = !app.isPackaged;
const WIN_URL_MAIN_HASH = isDev ? 'http://localhost:3100/#/music/index' : `/music/index`;
const LYRIC_URL_MAIN_HASH = isDev ? 'http://localhost:3100/#/desktop' : `/desktop`;
const LOGIN_URL_MAIN_HASH = isDev ? 'http://localhost:3100/#/login/qr' : `/login/qr`;
const TRY_URL_MAIN_HASH = isDev ? 'http://localhost:3100/#/tray' : `/tray`;
module.exports = {
  isDev,
  SCHEME,
  LOAD_URL_MAIN,
  WIN_URL_MAIN_HASH,
  LYRIC_URL_MAIN_HASH,
  LOGIN_URL_MAIN_HASH,
  TRY_URL_MAIN_HASH,
};
