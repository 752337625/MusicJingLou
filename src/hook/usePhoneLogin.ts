import { getCountriesCode, getCaptchaSent, getLoginCellphone, getCaptchaVerify } from '/@/api/login';
import { onMounted, shallowRef, reactive, inject } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import { createLocalStorage } from '/@/utils/cache';
import { useIntervalFn } from '@vueuse/core';
import { isNumber } from '/@/utils/is';
export default function usePhoneLogin() {
  const title = ref<string | number>('获取验证码');

  const { loginOrwindow } = inject('loginOrwindow') as any;
  const ls = createLocalStorage();
  const form = reactive({
    countries: '86',
    phone: '',
    captcha: '',
    checked: false,
  });
  const rules = reactive<FormRules>({
    phone: {
      required: true,
      message: '请输入手机号',
      trigger: 'blur',
    },
    captcha: {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  });
  const countriesList: any = shallowRef([]);
  const _getCountriesCode = () => {
    getCountriesCode().then(res => {
      const { code, data = [] } = res;
      if (code !== 200) return ElMessage.error('数据请求失败');
      countriesList.value = data
        .map(i => {
          return i.countryList;
        })
        .flat(Infinity);
    });
  };
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    if (!form.checked) return ElMessage.warning('请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》');
    await formEl.validate(async valid => {
      if (valid) {
        const res = await getCaptchaVerify({
          captcha: form.captcha,
          phone: form.phone,
        });
        const { code, message } = res;
        if (code !== 200) return ElMessage.error(message);
        const cell = await getLoginCellphone({
          captcha: form.captcha,
          phone: form.phone,
          // realIP: '473.93.3.403',
        });
        const { code: c, message: m, cookie } = cell;
        if (c !== 200) return ElMessage.error(m);
        ls.set('cookie', cookie);
        ElMessage.success('登录成功');
        loginOrwindow();
      }
    });
  };
  const _getCaptchaSent = () => {
    if (!form.phone) return ElMessage.warning('请输入手机号');
    if (isNumber(title.value)) return;
    getCaptchaSent({ phone: form.phone }).then(res => {
      const { code } = res;
      if (code !== 200) return ElMessage.error('数据请求失败');
      ElMessage.success('发送成功');
      title.value = 60;
      const { pause } = useIntervalFn(() => {
        if (title.value === 0) {
          pause();
          title.value = '获取验证码';
        } else {
          title.value = (title.value as number) - 1;
        }
      }, 1000);
    });
  };
  onMounted(() => _getCountriesCode());

  return {
    form,
    title,
    countriesList,
    rules,
    _getCaptchaSent,
    submitForm,
  };
}
