import { useLocaleStore } from '/@/store/modules/locale';
import { useThemeStore } from '/@/store/modules/theme';
// import { getAppEnvConfig } from '@/utils/env';
export function initAppConfigStore() {
  // let {} = getAppEnvConfig();
  const localeStore = useLocaleStore();
  const themeStore = useThemeStore();
  // 主题颜色初始化配置
  themeStore.initTheme();
  // 本地语言初始化设置
  localeStore.initLocale();
}
export default initAppConfigStore;
