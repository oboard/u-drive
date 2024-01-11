<template>
  <div v-if="listInfo" class="m-4 flex justify-between items-center">
    <div class="flex items-center space-x-2" v-if="parentInfo">
      <!-- 返回按钮 -->
      <NuxtLink
        :to="`/${parentInfo?.parentID ?? 0}`"
        class="btn normal-case"
        v-if="parentInfo"
      >
        <i class="i-tabler-arrow-left w-6 h-6" />
        <span>{{ parentInfo.title }}</span>
      </NuxtLink>
    </div>
    <!-- <span>文件数量：{{ listInfo?.total }}</span> -->
    <!-- 上传按钮 -->
    <button class="btn">
      <i class="i-tabler-upload w-6 h-6" />
      上传
    </button>
  </div>
  <div v-if="listInfo">
    <div v-for="item in listInfo.list" :key="item.contentId">
      <FileItem :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// {
//     "pageNum": 1,
//     "pageSize": 10,
//     "total": 1,
//     "list": [
//         {
//             "contentId": 1578763,
//             "parentId": 1578762,
//             "title": "图片1.png",
//             "contentType": 3,
//             "type": 1,
//             "mimeType": "png",
//             "contentSize": 78131,
//             "location": "https://obscloud.ulearning.cn/resources/web/17048739804695151.png",
//             "remark": "76.3KB",
//             "remark2": "1",
//             "remark3": "0",
//             "isView": "0",
//             "publishTimes": 0,
//             "viewTimes": 0,
//             "downloadTimes": 0,
//             "growth": 0,
//             "createDate": 1704873983000,
//             "relationId": 0
//         }
//     ]
// }
import type { ListInfo, FileInfo } from "@/models/list_info";
const listInfo = ref<ListInfo>();
const parentInfo = ref<FileInfo>();
const token = await useFetch("/api/token", { method: "GET" });

const config = {
  headers: {
    Authorization: token.data.value as string,
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

onMounted(async () => {
  parentInfo.value = await getParentInfo();
  listInfo.value = await getLists();
});
</script>
