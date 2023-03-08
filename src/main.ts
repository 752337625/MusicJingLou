import { createApp } from 'vue';
import App from '/@/App.vue';
import setupRouter from '/@/router';
import setupStore from '/@/store';
import '/@/design/index.less';
// import setupI18n from '/@/locales';
import setupGlobDirectives from '/@/directives';
import setupGlobProperties from '/@/properties';
import '/@/design/index.less';
// import initAppConfigStore from '/@/initAppConfig'; //初始化配置，例如国际化、主题
import 'virtual:svg-icons-register'; //vite-plugin-svg-icons
import 'virtual:windi.css'; //tailwindcss
// import { registerGlobComp } from '/@/components/registerGlobComp';
async function bootstrap() {
  const app = createApp(App);
  setupRouter(app);
  setupStore(app);
  // //初始化系统默认配置：国际化，主题
  // initAppConfigStore();
  //国际化
  // await setupI18n(app);

  //设置全局指令
  setupGlobDirectives(app);

  // Configure globa Properties
  setupGlobProperties(app);

  // Register global components
  // 注册全局组件
  // registerGlobComp(app);

  // Configure global error handling
  // 配置全局错误处理
  // setupErrorHandle(app);
  app.mount('#app');
}
bootstrap();
