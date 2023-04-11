const { app } = require('electron');
// 引入开机自启动包
const AutoLaunch = require('auto-launch');
// 检查是不是自动重启
function checkIsAutoLaunch() {
  global.autoLaunchInstance = new AutoLaunch({
    name: app.getName(),
  });
  global.autoLaunchInstance
    .isEnabled()
    .then(function (_isEnabled) {
      // console.log(`应用是不是自启动--》${isEnabled}`);
      // global.win.webContents.send('auto-launch-instance', isEnabled);
      // 是自动重启，什么都不做
      // if (isEnabled) return;
      // 不是自动重启，就设置一下
      // console.log(AutoLaunchInstance.enable().then(res => console.log(res)));
      // AutoLaunchInstance.enable();
    })
    .catch(function (_err) {
      // 因为打包后的应用，看不到控制台，所以，使用dialog将异常弹出，产品上线，可以移除这里
      // 将这里修改为 log，写入到实体的log文件或者上传到服务器
      // 杀毒软件会导致这里触发 err 所以，杀毒软件检测到的时候，选择 启用自启动 就好了
      // dialog.showMessageBox(mainWindow, {
      //   type: 'error',
      //   title: '自启动错误',
      //   message: err,
      // });
    });
}
module.exports = { checkIsAutoLaunch };
