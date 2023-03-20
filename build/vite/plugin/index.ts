// import path from 'path';
import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
// import Mkcert from 'vite-plugin-mkcert'; // success 提供有效的https证书
import Legacy from '@vitejs/plugin-legacy'; // success
import { configHtmlPlugin } from './html'; // success
import { configMockPlugin } from './mock';
import { configPwaConfig } from './pwa'; // success
import { configSvgIconsPlugin } from './svgSprite'; // 将svg转为组件 success
import { configCompressPlugin } from './compress'; // success
import { configVisualizerConfig } from './visualizer'; // success
import WindiCSS from 'vite-plugin-windicss'; // success
// import VitePluginCertificate from 'vite-plugin-mkcert'; // success
//使vue脚本设置语法支持 name 属性。<script lang="ts" setup name="App"></script>
import VueSetupExtend from 'vite-plugin-vue-setup-extend'; // success 影响项目debugger

import AutoImport from 'unplugin-auto-import/vite'; // success
import Components from 'unplugin-vue-components/vite'; // success
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'; // success
import Eruda from 'vite-plugin-eruda'; // success 帮助您在开发环境中自动打开调试工具.

// AndDesignVueResolve,VantResolve,NutuiResolve,AntdResolve
// import styleImport, { ElementPlusResolve } from 'vite-plugin-style-import';
//最常用的场景就是监听 vite.config.js 和 .env.development 文件，
//我们知道，修改 vite 配置文件和环境配置文件，是需要重启 vite 才会生效，通过这个插件，我们将从反复重启中解脱出来。
import viteRestart from 'vite-plugin-restart';
import Banner from 'vite-plugin-banner';
import pkg from '../../../package.json';
import Vuejsx from '@vitejs/plugin-vue-jsx';
import PurgeIcons from 'vite-plugin-purge-icons';
// import Electron from 'vite-plugin-electron';
import { configStyleImportPlugin } from './styleImport';

// import { configImageminPlugin } from './imagemin'; // success
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_LEGACY, VITE_BUILD_COMPRESS, VITE_USE_PWA, VITE_SETUP_EXTEND, VITE_USE_MOCK, VITE_USE_ERUDA } = viteEnv;
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    Vuejsx(),
    // Mkcert(),
    // VitePluginCertificate({
    // 	source: 'coding',
    // }),
    // PkgConfig(),
    // OptimizationPersist(),
    //这里注意
    AutoImport({
      dts: './typings/auto-imports.d.ts', // 生成配置文件，如果是ts项目，通常我们会把声明文件放在根目录/types中，注意，这个文件夹需要先建好，否则可能导致等下无法往里生成auto-imports.d.ts文件
      imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
      eslintrc: {
        enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
        filepath: './.eslintrc-auto-import.json', // 生成json文件,可以不配置该项，默认就是将生成在根目录
        globalsPropValue: true,
      },
      resolvers: [ElementPlusResolver()], //提供解决Element取消手动import问题
    }),
    Components({
      dirs: 'src/base',
      dts: './typings/components.d.ts', // 生成配置文件，如果是ts项目，通常我们会把声明文件放在根目录/types中，注意，这个文件夹需要先建好，否则可能导致等下无法往里生成components.d.ts文件
      resolvers: [ElementPlusResolver()], // 组件按需引入，例如Element2.x的按需引入方式。后采用AutoImport取消import
    }),
    viteRestart({
      restart: ['.env', '.env.development', 'vite.config.ts'],
    }),

    Banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author.name}\n * homepage: ${pkg.homepage}\n */`,
    ),
    // Electron({
    //   // 配置 Electron 入口文件
    //   entry: path.join(process.cwd(), 'electron/main.js'),
    // }),
  ];
  // vite-plugin-purge-icons
  vitePlugins.push(PurgeIcons());
  // vite-plugin-windicss
  vitePlugins.push(WindiCSS());
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());
  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin());
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));
  // vite-plugin-eruda
  VITE_USE_ERUDA && vitePlugins.push(Eruda());
  // vitejs/plugin-legacy
  VITE_USE_LEGACY &&
    vitePlugins.push(
      Legacy({
        targets: ['chrome 52'],
      }),
    );
  // vite-plugin-vue-setup-extend
  isBuild && VITE_SETUP_EXTEND && vitePlugins.push(VueSetupExtend());
  // vite-plugin-compression
  isBuild && VITE_BUILD_COMPRESS && vitePlugins.push(configCompressPlugin(viteEnv));
  // vite-plugin-pwa
  isBuild && VITE_USE_PWA && vitePlugins.push(configPwaConfig(viteEnv));
  // vite-plugin-imagemin
  // isBuild && VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());s
  return vitePlugins;
}
