<script setup lang="ts">
  import { useLocaleStore } from '/@/store/modules/locale';
  import { computed, shallowRef, watchEffect } from 'vue';
  let EleLocale = shallowRef();
  const localeStore = useLocaleStore();
  let locale = computed(() => localeStore.getLocale);
  watchEffect(async () => {
    const defaultLocale = await import(/* @vite-ignore */ `./locales/lang/${locale.value}.ts`);
    const message = defaultLocale.default?.message ?? {};
    EleLocale.value = message[locale.value];
  });
</script>
<template>
  <el-config-provider :locale="EleLocale">
    <RouterView />
  </el-config-provider>
</template>
