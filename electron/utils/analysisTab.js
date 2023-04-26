// 音频解析
const jsmediatags = require('jsmediatags');
const analysisTab = (argv, position) => {
  let filePath = argv[position];
  let flag = filePath.toLocaleUpperCase().includes('.MP3');
  if (!flag) return;
  jsmediatags.read(filePath, {
    onSuccess: function (tab) {
      global.log.info('本地音乐解析成功');
      global.win.webContents.send('user-open-file', { tab, filePath });
    },
    onError: function (error) {
      global.log.warn('本地音乐解析失败', error.type, error.info);
    },
  });
};
module.exports = { analysisTab };
