const { app } = require('electron');
const SCHEME = 'JINGLUO';
const LOAD_URL_MAIN = `dist/index.html`;
const isPro = app.isPackaged;
const WIN_URL_MAIN_HASH = isPro ? `/music/index` : 'http://localhost:3100/#/music/index';
const LYRIC_URL_MAIN_HASH = isPro ? `/desktop` : 'http://localhost:3100/#/desktop';
const LOGIN_URL_MAIN_HASH = isPro ? `/login/qr` : 'http://localhost:3100/#/login/qr';
const TRY_URL_MAIN_HASH = isPro ? `/tray` : 'http://localhost:3100/#/tray';
module.exports = {
  isPro,
  SCHEME,
  LOAD_URL_MAIN,
  WIN_URL_MAIN_HASH,
  LYRIC_URL_MAIN_HASH,
  LOGIN_URL_MAIN_HASH,
  TRY_URL_MAIN_HASH,
};
