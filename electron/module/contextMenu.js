// 步骤一
const { Menu, BrowserWindow } = require('electron');

// 步骤二
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

// 步骤三
const contextMenu = Menu.buildFromTemplate(template);

// 步骤四
// 主进程，渲染进程可使用window.addEventListener设置监听事件
BrowserWindow.getFocusedWindow().webContents.on('context-menu', () => {
	contextMenu.popup();
});
