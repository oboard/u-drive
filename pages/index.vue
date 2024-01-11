<template>
  <!-- 欢迎页面 -->
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-4xl font-bold">Welcome to U-Drive</div>
    <!-- 进入按钮，跳转到/0 -->
    <nuxt-link to="/0" class="mt-4 btn btn-primary rounded-md">
      Enter
    </nuxt-link>
  </div>

  <div class="absolute bottom-8 w-full text-center text-gray-500">
    Powered by ULearning
  </div>
</template>
<style>
:root {
    overflow: hidden;
}
</style>