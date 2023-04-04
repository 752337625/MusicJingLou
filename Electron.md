```
"build": {  // electron-builder配置
    "productName":"xxxx",//项目名 这也是生成的exe文件的前缀名
    "appId": "xxxxx",//包名
    "copyright":"xxxx",//版权  信息
    "compression": "store", // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
    "directories": {
        "output": "build" // 输出文件夹
    },
    "asar": true, // asar打包压缩
    "extraResources":  { // 拷贝dll等静态文件到指定位置
        "from": "./extraResources/",
        "to": "extraResources"
    },
    "win": {
       "icon": "build/icons/icon.ico",//图标路径
        "target": [
          {
            "target": "nsis",
            "arch": [
              "ia32"
            ]
          }
        ]
    },
    "nsis": {
        "oneClick": false, // 一键安装
        "guid": "xxxx", //注册表名字，不推荐修改
        "perMachine": true, // 是否开启安装时权限限制（此电脑或当前用户）
        "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
        "allowToChangeInstallationDirectory": true, // 允许修改安装目录
        "installerIcon": "./build/icons/aaa.ico", // 安装图标
        "uninstallerIcon": "./build/icons/bbb.ico", //卸载图标
        "installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
        "createDesktopShortcut": true, // 创建桌面图标
        "createStartMenuShortcut": true, // 创建开始菜单图标
        "shortcutName": "鲸落云" // 图标名称
			  "deleteAppDataOnUninstall": false,
			  "createDesktopShortcut": true,
			  "createStartMenuShortcut": true
    }
}
```

## 三.关于打包成安装包体积大的问题

- 1.build 里面配置 "asar": true, // asar 打包压缩
  --但是，当设置 assar 为 true 时，打包后，绿色软件的图标会成默认的，这时，不需要将 assar 设置为 true, 保持原来的 false，然后进行打包

- 2.找到打包的文件目录 D:\myprojects\Electron+vue\notepaid\build\win-ia32-unpacked\resources，将 resources 目录里除了 electron.asar 外的所有文件删除

- 3.使用 Nullsoft Install System 打包软件进行打包，选择打包的源目录文件时，就选择 win-ia32-unpacked\resources，最后依照顺序打包即可

- 4.electron-builder nsis 打包配置 license 乱码
  使用 electron-builder 打包时配置好了 license 许可协议，打包后安装出现乱码
  找到许可协议 txt 文件，并非是 GBK，或者 UTF-8，txt 写好之后，需要进行转化，转化为 ANSI
  记事本打开另存为，格式选择 ANSI

## "electron-builder": "^22.11.7", "electron-updater": "^4.3.9",

版本不协调导致打包后找不到模块的问题，最后官网给出的案例中修改的版本。
