<template>
    <div class="w-screen min-h-screen p-4 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-orange-8 to-orange-9">
        <span class="text-4xl font-bold text-white">Welcome to U-Drive 图床</span>
        <button id="btnUploadFile" class="btn" @click="handleUploadButton">
            <i class="i-tabler-upload w-6 h-6" />
            上传
        </button>
        <input class="hidden" type="file" @change="uploadFile" />
        <!-- 渐变背景 -->
        <div v-if="fileUrl" class="flex flex-col gap-2 p-4 rounded-md bg-white bg-opacity-80">
            <img class="border rounded" :src="fileUrl" alt="上传的图片" />
            <!-- 链接地址 -->
            <span class="text-lg">链接地址</span>
            <textarea :value="fileUrl" class="textarea textarea-primary" readonly />
            <!-- cdn -->
            <span class="text-lg">CDN</span>
            <textarea :value="cdn" class="textarea textarea-primary" readonly />
            <!-- markdown -->
            <span class="text-lg">Markdown</span>
            <textarea :value="markdown" class="textarea textarea-primary" readonly />
            <!-- html -->
            <span class="text-lg">HTML</span>
            <textarea :value="html" class="textarea textarea-primary" readonly />
        </div>
    </div>
</template>
<script lang="ts" setup>

definePageMeta({
    layout: false,
})

import { ref, computed } from 'vue';
import { handleFileUpload } from '@/utils/uploader';

const fileUrl = ref<string>('');
const cdn = computed(() => fileUrl.value.replace('https://leicloud-huawei.obs.cn-north-4.myhuaweicloud.com', 'https://obscloud.ulearning.cn'));
const markdown = computed(() => `![上传的图片](${fileUrl.value})`);
const html = computed(() => `<img src="${fileUrl.value}" alt="上传的图片" />`);


async function handleUploadButton() {
    // 先选择文件
    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    input.click();
}

async function uploadFile(e: Event) {
    const props = await handleFileUpload(e);
    if (props === undefined) return;
    const { url } = props;

    fileUrl.value = url;
}
</script>