import { getCountriesCode, getCaptchaSent, getLoginCellphone, getCaptchaVerify } from '/@/api/login';
import { onMounted, shallowRef, reactive } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import { createLocalStorage } from '/@/utils/cache';
export default function usePhoneLogin() {
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
        // getLoginCellphone();
        const res = await getCaptchaVerify({
          captcha: form.captcha,
          phone: form.phone,
        });
        const { code, message } = res;
        if (code !== 200) return ElMessage.error(message);
        const cell = await getLoginCellphone({
          captcha: form.captcha,
          phone: form.phone,
        });
        const { code: c, message: m, cookie } = cell;
        if (c !== 200) return ElMessage.error(m);
        ls.set('cookie', cookie);
      }
    });
  };
  const _getCaptchaSent = () => {
    if (!form.phone) return ElMessage.warning('请输入手机号');
    getCaptchaSent({ phone: form.phone }).then(res => {
      const { code } = res;
      if (code !== 200) return ElMessage.error('数据请求失败');
      ElMessage.success('发送成功');
    });
  };
  onMounted(() => _getCountriesCode());

  return {
    form,
    countriesList,
    rules,
    _getCaptchaSent,
    submitForm,
  };
}
