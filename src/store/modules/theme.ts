import { ThemeType } from '/@/typings/theme';
import { createLocalStorage } from '/@/utils/cache';
import { getEnvConfig } from '/@/utils/env';
interface ThemeState {
	darkMode: ThemeType;
}
import { updateDarkTheme } from '/@/theme/dark';
const ls = createLocalStorage();
const { VITE_DEFAULT_THEME_KEY } = getEnvConfig();
const lsThemeSetting = (ls.get(VITE_DEFAULT_THEME_KEY) || 'light') as ThemeType;
export const useThemeStore = defineStore({
	id: 'app-theme',
	state: (): ThemeState => {
		return {
			darkMode: lsThemeSetting,
		};
	},
	getters: {
		//获取当前系统设置主题
		getDarkMode: (state): ThemeType => {
			return state.darkMode ?? 'light';
		},
	},
	actions: {
		//第一次加载|或者系统刷新时,调用当前函数设置初始化主题
		initTheme() {
			this.setThemeInfo(lsThemeSetting);
		},
		//设置当前系统设置主题
		setThemeInfo(mode: ThemeType) {
			this.darkMode = mode;
			ls.set(VITE_DEFAULT_THEME_KEY, this.darkMode);
			updateDarkTheme(this.darkMode);
		},
	},
});
