const SCHEME = 'JINGLUO';
const LOAD_URL_MAIN = `dist/index.html`;
const LOAD_URL = `dist/index.html'`;
const isDev = process.env.NODE_ENV !== 'production';
const WIN_URL_MAIN = !isDev ? 'http://localhost:3100/#/music/index' : `${LOAD_URL_MAIN}`;
const LYRIC_URL_MAIN = !isDev ? 'http://localhost:3100/#/desktop' : `${LOAD_URL_MAIN}`;
const LOGIN_URL_MAIN = !isDev ? 'http://localhost:3100/#/login/qr' : `${LOAD_URL_MAIN}`;
const TRY_URL_MAIN = !isDev ? 'http://localhost:3100/#/tray' : `${LOAD_URL_MAIN}`;
module.exports = { SCHEME, LOAD_URL, LOAD_URL_MAIN, WIN_URL_MAIN, LYRIC_URL_MAIN, LOGIN_URL_MAIN, TRY_URL_MAIN };
