<template>
  <!-- 欢迎页面 -->
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-4xl font-bold">Welcome to U-Drive</div>
    <!-- 输入密码 -->
    <input v-model="password" type="password" class="mt-4 input input-primary" placeholder="Password"
      @keydown.enter="verify ? $router.push('/dir/0') : null" />
    <!-- 进入按钮，跳转到dir/0 -->
    <nuxt-link v-if="verify" to="/dir/0" class="mt-4 btn btn-primary rounded-md">
      Enter
    </nuxt-link>
  </div>

  <div class="absolute bottom-8 w-full text-center text-gray-500">
    Powered by ULearning
  </div>
</template>

<script lang='ts' setup>

import { ref } from 'vue';
import { setVerified, verified } from './token';
const password = ref('');
const verify = ref(false);

watch(password, async (newVal) => {
  if (await sha256(newVal) === '9fce7a15657cdc3a0b8d6f222c23c569d2b58fdc08c2602bb92528fba5cfccc8') {
    verify.value = true;
  } else {
    verify.value = false;
  }
  setVerified(verify.value);
});


function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data).then((buf) => {
    return Array.prototype.map.call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2)).join('');
  });
}

</script>


<style>
:root {
  overflow: hidden;
}
</style>