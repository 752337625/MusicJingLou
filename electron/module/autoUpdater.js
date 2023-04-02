const { autoUpdater } = require('electron-updater');
const path = require('path');
const { isPro } = require('../config');
const { dialog } = require('electron');
// 定义返回给渲染层的相关提示文案
const message = {
  error: '检查更新出错',
  checking: '正在检查更新……',
  updateAva: '检测到新版本，正在下载……',
  updateNotAva: '现在使用的就是最新版本，不用更新',
};

// 这里是为了在本地做应用升级测试使用
if (!isPro) {
  autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml');
}

// 主进程跟渲染进程通信
const sendUpdateMessage = text => {
  // 发送消息给渲染进程
  global.win.webContents.send('message-version', text);
};

// 设置自动下载为false，也就是说不开始自动下载
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
  dialog
    .showMessageBox({
      type: 'info',
      title: '应用有新的更新',
      message: '发现新版本，是否现在更新？',
      buttons: ['是', '否'],
    })
    .then(({ response }) => {
      if (response === 0) {
        // 下载更新
        autoUpdater.downloadUpdate();
        sendUpdateMessage(message.updateAva);
      }
    });

  // 也可以默认直接更新，二选一即可
  // autoUpdater.downloadUpdate();
  // sendUpdateMessage(message.updateAva);
});
// 检测到不需要更新时
autoUpdater.on('update-not-available', () => {
  // 这里可以做静默处理，不给渲染进程发通知，或者通知渲染进程当前已是最新版本，不需要更新
  sendUpdateMessage(message.updateNotAva);
});
// 更新下载进度
autoUpdater.on('download-progress', progress => {
  // 直接把当前的下载进度发送给渲染进程即可，有渲染层自己选择如何做展示
  global.win.send('download-progress', progress);
});
// 当需要更新的内容下载完成后
autoUpdater.on('update-downloaded', () => {
  // 给用户一个提示，然后重启应用；或者直接重启也可以，只是这样会显得很突兀
  dialog
    .showMessageBox({
      title: '安装更新',
      message: '更新下载完毕，应用将重启并进行安装',
    })
    .then(() => {
      // 退出并安装应用
      setImmediate(() => autoUpdater.quitAndInstall());
    });
});

module.exports = { checkUpdate };
