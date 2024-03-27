<template>
  <div v-if="listInfo" class="m-4 flex justify-between items-start flex-col sm:flex-row gap-2">
    <div class="flex items-center space-x-2" v-if="parentInfo">
      <div class="space-x-2">
        <!-- 返回按钮 -->
        <NuxtLink :to="`/dir/${parentInfo?.parentID ?? 0}`" class="btn normal-case" v-if="parentInfo">
          <i class="i-tabler-arrow-left w-6 h-6" />
          <span>{{ parentInfo.title }}</span>
        </NuxtLink>
      </div>
    </div>

    <div class="gap-2 flex flex-wrap justify-start">
      <button id="btnUploadFile" class="btn" @click="handleNewFolderButton">
        <i class="i-tabler-folder-plus w-6 h-6" />
        新建文件夹
      </button>
      <!-- 上传按钮 -->
      <button id="btnUploadFile" class="btn" @click="handleUploadButton">
        <i class="i-tabler-upload w-6 h-6" />
        上传
      </button>
    </div>
    <input class="hidden" type="file" @change="uploadFile" />
  </div>
  <div v-if="listInfo">
    <div v-for="item in listInfo.list" :key="item.contentId">
      <FileItem :item="item" :reload="reload" :token="token" />
    </div>
    <div class="m-2 ml-4" v-if="listInfo?.total > 0">
      总数：{{ listInfo?.total }}
    </div>
    <div v-else class="h-full w-full flex items-center justify-center">
      这里空空如也
    </div>
  </div>
  <div v-else class="h-full w-full flex gap-2 items-center justify-center">
    <!-- <i class="i-tabler-alert-triangle w-8 h-8 text-red-500" /> -->
    <span>加载中……</span>
    <!-- <span>网络异常，请稍后重试</span> -->
  </div>
  <Modal ref="promptModal" :title="modalTitle" :actions="[
    {
      name: '确定',
      action: () => {
        console.log('确定');
      },
    },
    {
      name: '取消',
      action: () => {
        console.log('取消');
      },
    },
  ]">
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <label for="folderName">{{ modalTitle }}</label>
        <input type="text" id="folderName" v-model="modalInput" class="input input-primary" />
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import type { ListInfo, FileInfo, UploadFileInfo } from "@/models/list_info";
const listInfo = ref<ListInfo>();
const parentInfo = ref<FileInfo>();
import getToken from "@/pages/token";
const token = await getToken();
import ObsClient from "@/obs/src/obs";
import { handleFileUpload, updateRecord } from '@/utils/uploader';

import type ObsToken from "@/models/obs";

const modalTitle = ref<string>("");
const promptModal = ref<HTMLDialogElement>();
const modalInput = ref<string>("");

const fileList = ref<any[]>([]);

const config = {
  headers: {
    Authorization: token,
  },
};
// 获取params中的parentId
const { parentId } = useRoute().params;

async function getLists() {
  const res = await fetch(
    `https://courseapi.ulearning.cn/content/user/list?keyword=&parentId=${parentId}&pn=1&ps=100000&viewType=0&lang=zh`,
    config
  );
  return await res.json();
}

async function getParentInfo() {
  const res = await fetch(
    `https://courseapi.ulearning.cn/content/${parentId}?lang=zh`,
    config
  );
  const text = await res.text();
  if (text != "") return JSON.parse(text);
  else return undefined;
}

async function reload() {
  parentInfo.value = await getParentInfo();
  listInfo.value = await getLists();
}

async function handleUploadButton() {
  // 先选择文件
  const input = document.querySelector("input[type=file]") as HTMLInputElement;
  input.click();
}

onMounted(async () => {
  await reload();
});

async function customPrompt(message: string) {
  modalTitle.value = message;
  console.log(promptModal.value);
  promptModal.value?.showModal();
  return new Promise<string>((resolve, reject) => {
    const okButton = promptModal.value?.querySelectorAll("button")[0];
    const cancelButton = promptModal.value?.querySelectorAll("button")[1];
    okButton?.addEventListener("click", () => {
      promptModal.value?.close();
      resolve(modalInput.value);
    });
    cancelButton?.addEventListener("click", () => {
      promptModal.value?.close();
      reject();
    });
  });
}

async function handleNewFolderButton() {
  const folderName = await customPrompt("请输入文件夹名称");
  if (folderName) {
    await updateRecord({
      title: folderName,
      type: 3,
      status: 2,
      contentSize: 0,
      isView: 0,
      remark2: 1,
      remark3: 0,
      parentId: Number(parentId),
    });
    await reload();
  }
}


async function uploadFile(e: Event) {
  const props = await handleFileUpload(e);
  if (props === undefined) return;
  const { url, file, nodotsubfix } = props;
  // 更新上传记录
  await updateRecord({
    title: file.name,
    type: 1,
    status: 2,
    contentSize: file.size,
    location: url,
    mimeType: nodotsubfix ?? "",
    isView: 0,
    remark2: 1,
    remark3: 0,
    parentId: Number(parentId),
  });
  await reload();
}
</script>
