import { genMessage } from '../helper';
const modules = import.meta.globEager('./zh-CN/**/*.ts');
import zh_CN from 'element-plus/lib/locale/lang/zh-cn';
export default {
	message: {
		...genMessage(modules as any, 'zh-CN'),
		zh_CN,
	},
};
