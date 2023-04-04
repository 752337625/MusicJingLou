import { toRefs, reactive, onBeforeMount, watch } from 'vue';
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
  watch(
    () => Info.dv,
    async n => {
      if (n) {
        // 获取最新应用版本
        const u = await window.ElectronAPI.setCheckForUpdate();
        Info['nv'] = u;
        // 获取当前应用版本
        const v = await window.ElectronAPI.setCheckAppVersion();
        Info['ov'] = v;
      }
    },
  );
  //  获取更新提示语
  window.ElectronAPI.setMessageAppVersionInfo((_event, m) => {
    Info['message'] = m;
  });
  window.ElectronAPI.setDownloadProgress((_event, value) => {
    Info['percentage'] = value.percent;
  });
  window.ElectronAPI.setUpdateDownload((_event, m) => {
    // Info['percentage'] = 100;
    Info['message'] = m;
    window.ElectronAPI.setQuitAndInstall();
  });
  const downloadUpdate = () => {
    window.ElectronAPI.setDownloadUpdate();
  };
  onBeforeMount(async () => {
    // 下载进度
  });

  return {
    ...toRefs(Info),
    customColorMethod,
    downloadUpdate,
  };
}
