import type { UserConfig, ConfigEnv } from 'vite';
import { resolve } from 'path'; //必须要引入resolve
import { loadEnv } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import pkg from './package.json';
import dayjs from 'dayjs';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;
  const isBuild = command === 'build';
  return {
    root,
    base: VITE_PUBLIC_PATH,
    define: {
      // setting vue-i18-next
      // Suppress warning
      // __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    server: {
      https: false,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    resolve: {
      //修改alias为数组，添加vue-i18n目的：控制台vue-i18n警告
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: resolve(process.cwd(), '.', 'src') + '/',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          charset: false,
          additionalData: `
          @import "./src/design/color.less";
          @import "./src/design/mixin.less";
          `,
          javascriptEnabled: true,
        },
      },
    },
    json: {
      //namedExports: true,
      //stringify:true
    },
    esbuild: {
      drop: isBuild ? ['console', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome61',
      sourcemap: isBuild ? false : 'inline',
      assetsInlineLimit: 0, //禁止将文件转base64
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //     pure_funcs: ['console.log', 'debugger'],
      //   },
      //   format: {
      //     comments: false,
      //   },
      // },
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 500,
      // rollupOptions: {
      //   output: {
      //     chunkFileNames: 'js/[name]-[hash].js',
      //     entryFileNames: 'js/[name]-[hash].js',
      //     assetFileNames: '[ext]/[name]-[hash].[ext]',
      //   },
      // },
    },
    // @ts-ignore
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      //官网给出解释：默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
      //但是有些第三方包，vite开始并不知道你是否使用，所以也需要手动加载进去。
      include: [
        // managed by `vite-plugin-optimize-persist`
        // 'dayjs',
        // '@iconify/iconify',
        'element-plus/es/components/container/style/css',
        'element-plus/es/components/loading/style/css',
        'element-plus/es/components/footer/style/css',
        'element-plus/es/components/header/style/css',
        'element-plus/es/components/main/style/css',
        'element-plus/lib/locale/lang/zh-cn',
        'element-plus/es/components/button-group/style/css',
        'element-plus/es/components/button/style/css',
        'element-plus/es/components/aside/style/css',
        'element-plus/es/components/message/style/css',
        'element-plus/es/components/image/style/css',
        'element-plus/es/components/skeleton/style/css',
        'element-plus/es/components/skeleton-item/style/css',
        'element-plus/es/components/select/style/css',
        'element-plus/es/components/option-group/style/css',
        'element-plus/es/components/option/style/css',
        'element-plus/es/components/form/style/css',
        'element-plus/es/components/message-box/style/css',
        'element-plus/es/components/tooltip/style/css',
        'element-plus/es/components/icon/style/css',
        'element-plus/es/components/pagination/style/css',
        'element-plus/es/components/infinite-scroll/style/css',
        'element-plus/es/components/popover/style/css',
        'element-plus/es/components/affix/style/css',
        'element-plus/es/components/dropdown/style/css',
        'element-plus/es/components/dropdown-menu/style/css',
        'element-plus/es/components/dropdown-item/style/css',
        'element-plus/es/components/avatar/style/css',
        'element-plus/es/components/checkbox/style/css',
        'element-plus/es/components/form-item/style/css',
        'element-plus/es/components/input/style/css',
        'element-plus/es/components/dialog/style/css',
        'element-plus/es/components/tag/style/css',
        'element-plus/es/components/menu/style/css',
        'element-plus/es/components/sub-menu/style/css',
        'element-plus/es/components/menu-item/style/css',
      ],
    },
  };
};
