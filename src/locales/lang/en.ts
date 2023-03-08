import { genMessage } from '../helper';
const modules = import.meta.globEager('./en/**/*.ts');
import en from 'element-plus/lib/locale/lang/en';
export default {
  message: {
    ...genMessage(modules as any, 'en'),
    en,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
