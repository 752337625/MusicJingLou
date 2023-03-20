//  浏览器唤起本地应用
const { protocol } = require('electron');
const { SCHEME } = require('../config');
function creatProtocol() {
  protocol.registerSchemesAsPrivileged([{ scheme: SCHEME, privileges: { secure: true, standard: true, bypassCSP: true } }]);
}
module.exports = {
  creatProtocol,
};
