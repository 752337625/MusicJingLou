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
import { registerGlobComp } from '/@/components/registerGlobComp';
async function bootstrap() {
  const app = createApp(App);
  // 设置vue-router
  setupRouter(app);
  // 设置pinia
  setupStore(app);
  // 初始化系统默认配置：国际化，主题
  // initAppConfigStore();
  // 设置i18n
  // await setupI18n(app);
  // 设置directive
  setupGlobDirectives(app);
  // 设置properties
  setupGlobProperties(app);
  // 注册component
  registerGlobComp(app);
  // 配置error
  // setupErrorHandle(app);
  app.mount('#app');
}
bootstrap();
