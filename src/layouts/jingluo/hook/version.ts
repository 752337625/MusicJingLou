import { ref } from 'vue';
export function useVersion() {
  const vd = ref(false);
  const vo = ref('');
  const nv = ref('');

  return {
    nv,
    vo,
    vd,
  };
}

export default useVersion;
