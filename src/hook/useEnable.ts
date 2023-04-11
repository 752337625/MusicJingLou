import { ref, Ref, onMounted } from 'vue';

export default function useEnable() {
  const isEnabled: Ref<boolean> = ref(false);
  onMounted(() => window.ElectronAPI.getEnableAutoLaunch());
  window.ElectronAPI.setAutoLaunchInstance((_event, enabled) => {
    isEnabled.value = enabled;
  });
  return {
    isEnabled,
  };
}
