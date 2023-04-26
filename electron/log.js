const path = require('path');
const log = require('electron-log');
const { isPro } = require('./config');
function registerGlobalLog() {
  // 日志控制台等级，默认值：false
  // log.transports.console.level = 'silly';
  // log.transports.console.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}';
  // 日志文件等级，默认值：false
  log.transports.file.level = 'silly';
  // 日志文件名，默认：main.log
  log.transports.file.fileName = 'main.log';
  // 日志格式，默认：[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}
  // log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}';
  //日志大小50M，默认：1048576（1M），达到最大上限后，备份文件并重命名为：main.old.log，有且仅有一个备份文件
  // log.transports.file.maxSize = 50 * 1024 * 1024;
  if (!isPro) log.transports.file.resolvePathFn = () => path.join(__dirname, 'logs/main.log');
  //error, warn, info, verbose, debug, silly
  return log;
}

module.exports = { registerGlobalLog };
