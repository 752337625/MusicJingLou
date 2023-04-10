const { autoUpdater } = require('electron-updater');
const path = require('path');
const { isPro } = require('../config');
function checkUpdate() {
  // 定义返回给渲染层的相关提示文案
  const message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '更新',
    updateNotAva: '最新版本',
    updateSuccess: '更新完成',
  };
  // 这里是为了在本地做应用升级测试使用
  if (!isPro) {
    autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml');
  }
  // 主进程跟渲染进程通信
  const sendUpdateMessage = text => {
    // 发送消息给渲染进程
    global.win.webContents.send('message-app-version-info', text);
  };
  // 设置自动下载为false，也就是不启动自动下载
  autoUpdater.autoDownload = false;
  // 检测下载错误
  autoUpdater.on('error', error => {
    sendUpdateMessage(`${message.error}:${error}`);
  });
  // 检测是否需要更新
  autoUpdater.on('checking-for-update', () => {
    sendUpdateMessage(message.checking);
  });
  // 检测到可以更新时
  autoUpdater.on('update-available', () => {
    // 这里我们可以做一个提示，让用户自己选择是否进行更新
    sendUpdateMessage(message.updateAva);
  });
  // 检测到不需要更新时
  autoUpdater.on('update-not-available', () => {
    // 这里可以做静默处理，不给渲染进程发通知，或者通知渲染进程当前已是最新版本，不需要更新
    sendUpdateMessage(message.updateNotAva);
  });
  // 更新下载进度
  autoUpdater.on('download-progress', progress => {
    // 直接把当前的下载进度发送给渲染进程即可，有渲染层自己选择如何做展示
    global.win.webContents.send('download-progress', progress);
  });
  // 当需要更新的内容下载完成后
  autoUpdater.on('update-downloaded', () => {
    global.win.webContents.send('update-downloaded', message.updateSuccess);
    // 给用户一个提示，然后重启应用；或者直接重启也可以，只是这样会显得很突兀
    // autoUpdater.quitAndInstall();
  });
}
module.exports = { checkUpdate };
