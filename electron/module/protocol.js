//  浏览器唤起本地应用
const { app } = require('electron');
const { SCHEME, isPro } = require('../config');
function creatProtocol() {
  app.removeAsDefaultProtocolClient(SCHEME); // 每次运行都删除自定义协议 然后再重新注册
  // 开发模式下在window运行需要做兼容
  if (!isPro && process.platform === 'win32') {
    // 设置electron.exe 和 app的路径
    app.setAsDefaultProtocolClient(SCHEME, process.execPath, [path.resolve(process.argv[1])]);
  } else {
    app.setAsDefaultProtocolClient(SCHEME);
  }
  // console.log('是否注册成功', isSet);
  // protocol.registerSchemesAsPrivileged([{ scheme: SCHEME, privileges: { secure: true, standard: true, bypassCSP: true } }]);
}
module.exports = {
  creatProtocol,
};
