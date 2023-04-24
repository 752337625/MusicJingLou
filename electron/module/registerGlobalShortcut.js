const { globalShortcut } = require('electron');
const { isPro } = require('../config');
function registerGlobalShortcut() {
  globalShortcut.register('Alt+B', function () {
    global.win.webContents.openDevTools();
  });
  if (isPro) {
  }
}
module.exports = { registerGlobalShortcut };
