// 顶部菜单
const { Menu, dialog, app } = require('electron');
const template = [
	{
		label: 'app', // macOS下第一个标签是应用程序名字，此处设置无效
		submenu: [
			{
				label: '退出',
				click: () => {
					app.quit();
				},
			},
			{
				label: '关于',
				click: () => {
					app.showAboutPanel();
				},
			},
		],
	},
	{
		label: '文件',
		submenu: [
			{
				label: '子菜单',
				click: () => {
					// 调用了dialog（弹窗模块），演示效果
					dialog.showMessageBoxSync({
						type: 'info',
						title: '提示',
						message: '点击了子菜单',
					});
				},
			},
		],
	},
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
