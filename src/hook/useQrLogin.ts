import { onMounted, inject } from 'vue';
import { getQrKey as qrKey, getQrCreate as qrCreate, getQrCheck as qrCheck } from '/@/api/login';
import qr from '/@/views/login/qr/img/qr.jpg';
import qr800 from '/@/views/login/qr/img/qr800.jpg';
import qr802 from '/@/views/login/qr/img/qr802.jpg';
import type { Ref } from 'vue';
import { createLocalStorage } from '/@/utils/cache';
import { onBeforeRouteLeave } from 'vue-router';
export default function useQrLogin() {
  const { loginOrwindow } = inject('loginOrwindow') as any;
  const ls = createLocalStorage();
  const key: Ref<string | null> = ref(null);
  const qrurl: Ref<string | null> = ref(qr);
  const freshen: Ref<any> = ref(null);
  const getQrCheck = () => {
    qrCheck({ key: key.value }).then(res => {
      const { code, message, cookie } = res;
      //800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
      if (code === 800) return (qrurl.value = qr800), clearInterval(freshen.value);
      if (code === 801) return;
      if (code === 802) return (qrurl.value = qr802);
      if (code === 803)
        return ElMessage.success(message), clearInterval(freshen.value), ls.set('cookie', cookie), loginOrwindow();
    });
  };
  const getQrCreate = unikey => {
    qrCreate({ key: unikey, qrimg: 'base64' }).then(res => {
      const {
        code,
        data: { qrimg },
      } = res;
      if (code !== 200) return ElMessage.error('数据请求失败');
      qrurl.value = qrimg;
      freshen.value = setInterval(() => getQrCheck(), 5000);
    });
  };

  const getQrKey = () => {
    clearInterval(freshen.value);
    qrKey().then(res => {
      const {
        code,
        data: { unikey },
      } = res;
      if (code !== 200) return ElMessage.error('数据请求失败');
      key.value = unikey;
      getQrCreate(unikey);
    });
  };
  //过期更新二维码
  const updataQrurl = () => {
    if (qrurl.value === qr800) getQrKey();
  };

  onMounted(() => getQrKey());
  onBeforeRouteLeave(() => {
    clearInterval(freshen.value);
    freshen.value = null;
  });
  return {
    qrurl,
    freshen,
    updataQrurl,
  };
}
