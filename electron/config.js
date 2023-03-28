const path = require('path');
const SCHEME = 'JINGLUO';
const LOAD_URL_MAIN = `file://${path.join(__dirname, '../dist/index.html')}`;
const LOAD_URL = `file://${path.join(__dirname, '../../dist/index.html')}`;
module.exports = { SCHEME, LOAD_URL, LOAD_URL_MAIN };
