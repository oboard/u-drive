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
      <FileItem :item="item" :reload="reload" :token="token" :customConfirm="customConfirm"
        :customPrompt="customPrompt" />
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
  <Modal v-model="promptModal" :title="modalTitle" @confirm="promptConfrim" @cancel="promptCancel">
    <input ref="inputRef" type="text" id="folderName" v-model="modalInput" class="input input-bordered w-full mt-4"
      @keydown.enter="promptConfrim" :placeholder="modalTitle" />
  </Modal>
  <Modal v-model="confirmModal" :title="modalTitle" @confirm="promptConfrim" @cancel="promptCancel">
  </Modal>
</template>

<script lang="ts" setup>
import type { ListInfo, FileInfo } from "@/models/list_info";
const listInfo = ref<ListInfo>();
const parentInfo = ref<FileInfo>();
import getToken from "@/pages/token";
const token = await getToken();
import { handleFileUpload, updateRecord } from '@/utils/uploader';

const modalTitle = ref<string>("");
const promptModal = ref<boolean>(false);
const confirmModal = ref<boolean>(false);
const modalInput = ref<string>("");
const promptConfrim = ref<() => void>();
const promptCancel = ref<() => void>();

const inputRef = ref<HTMLInputElement>();

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

async function customConfirm(message: string): Promise<boolean> {
  modalTitle.value = message;
  confirmModal.value = true;
  return new Promise((resolve) => {
    promptConfrim.value = () => {
      resolve(true);
      confirmModal.value = false;
    }
    promptCancel.value = () => {
      resolve(false);
      confirmModal.value = false;
    }
  });
}

async function customPrompt(message: string, defaultValue?: string): Promise<string | undefined> {
  modalTitle.value = message;
  modalInput.value = defaultValue ?? "";
  promptModal.value = true;
  // inputRef获取焦点
  inputRef.value?.focus();
  return new Promise((resolve) => {
    promptConfrim.value = () => {
      resolve(modalInput.value);
      promptModal.value = false;
    };
    promptCancel.value = () => {
      resolve(undefined);
      promptModal.value = false;
    };
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
