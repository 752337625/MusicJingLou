// 右键菜单
const { Menu, BrowserWindow } = require('electron');

const template = [
  {
    label: 'app', // macOS下第一个标签是应用程序名字，此处设置无效
    submenu: [{ role: 'quit' }, { role: 'about' }],
  },
  {
    label: '编辑',
    role: 'editMenu',
  },
];
const contextMenu = Menu.buildFromTemplate(template);
BrowserWindow.getFocusedWindow().webContents.on('context-menu', () => {
  contextMenu.popup();
});
