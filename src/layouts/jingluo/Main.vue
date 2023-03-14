<script setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  let Header = createAsyncComponent(() => import('/@/layouts/jingluo/Header.vue'));
</script>
<template>
  <Header />
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <Component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>
<style scoped lang="less"></style>
