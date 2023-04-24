import { toRefs, reactive, onBeforeMount, watch } from 'vue';
import { createSessionStorage } from '/@/utils/cache';
import { getEnvConfig } from '/@/utils/env';
const { VITE_DEFAULT_VERSION_UPDATE_KEY } = getEnvConfig();
const ls = createSessionStorage();
interface Info {
  dv: boolean;
  ov: string;
  nv: string;
  message: string;
  percentage: number;
}
export default function useVersion() {
  const Info: Info = reactive({
    dv: false,
    ov: '',
    nv: '',
    message: '',
    percentage: 0,
  });
  const customColorMethod = [
    { color: '#909399', percentage: 30 },
    { color: '#e6a23c', percentage: 70 },
    { color: '#67c23a', percentage: 100 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 },
  ];
  const updateVersion = async type => {
    try {
      // 获取最新应用版本
      const u = await window.ElectronAPI.setCheckForUpdate();
      Info['nv'] = u;
      // 获取当前应用版本
      const v = await window.ElectronAPI.setCheckAppVersion();
      Info['ov'] = v;
      if (!type && Info['ov'] !== Info['nv']) (Info['dv'] = true), ls.set(VITE_DEFAULT_VERSION_UPDATE_KEY, true);
    } catch (err) {
      console.log('远程更新服务异常==>', err);
    }
  };
  watch(
    () => Info.dv,
    n => {
      if (n) updateVersion(true);
    },
  );

  //  获取更新提示语
  window.ElectronAPI.setMessageAppVersionInfo((_event, m) => {
    Info['message'] = m;
  });
  window.ElectronAPI.setDownloadProgress((_event, value) => {
    Info['percentage'] = value.percent.toFixed(0);
  });
  window.ElectronAPI.setUpdateDownload((_event, m) => {
    // Info['percentage'] = 100;
    Info['message'] = m;
    window.ElectronAPI.setQuitAndInstall();
  });
  const downloadUpdate = () => {
    window.ElectronAPI.setDownloadUpdate();
  };
  onBeforeMount(() => {
    ls.get(VITE_DEFAULT_VERSION_UPDATE_KEY) ? ls.set(VITE_DEFAULT_VERSION_UPDATE_KEY, true) : updateVersion(false);
  });

  return {
    ...toRefs(Info),
    customColorMethod,
    downloadUpdate,
  };
}
