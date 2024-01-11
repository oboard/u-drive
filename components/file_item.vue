<template>
  <!-- 0.没有附件；1.本地上传；2超链接;3文件夹 -->
  <NuxtLink
    class="flex items-center space-x-4 p-4 border-b border-gray-200"
    :to="item.type === 3 ? item.contentId.toString() : undefined"
  >
    <!-- Display the icon -->
    <!-- 0：文件夹1：视频2：音频3：图片4：文档5：压缩文件6：其他7：超链接8：图文9:微课 ,10:课件11:试题12:试卷13：虚拟仿真 14:优学院微课 -->
    <div
      class="text-4xl inline-block"
      :class="
        [
          'i-vscode-icons-default-folder-opened',
          'i-vscode-icons-video',
          'i-vscode-icons-audio',
          'i-vscode-icons-file-type-image',
          'i-vscode-icons-document',
        ][item.contentType]
      "
    />

    <!-- Display file information -->
    <div class="flex-1">
      <div class="">{{ item.title }}</div>
      <div v-if="item.type === 1" class="text-gray-500 text-sm">
        {{ item.remark }}
      </div>
    </div>
    <!-- createDate -->
    <div class="text-gray-500 text-sm">
      {{ new Date(item.createDate).toLocaleString() }}
    </div>

    <!-- actions -->
    <div v-if="item.type === 1">
      <div class="dropdown dropdown-bottom dropdown-end block sm:hidden">
        <div tabindex="0" role="button" class="btn p-0 btn-circle">
          <i class="i-carbon-overflow-menu-horizontal w-6 h-6" />
        </div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li v-for="action in actions" :key="action.name">
            <a
              tabindex="0"
              role="button"
              :class="action.class"
              class="flex items-center space-x-2 p-2 rounded-md hover:bg-base-200"
              @click="action.action"
            >
              <i :class="action.icon" class="w-6 h-6" />
              <span>{{ action.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="hidden sm:block">
        <div class="flex items-center space-x-2">
          <button
            tabindex="0"
            class="btn"
            :class="action.class"
            v-for="action in actions"
            :key="action.name"
            @click="action.action"
          >
            <i :class="action.icon" class="w-6 h-6" />
            <span class="hidden sm:block">{{ action.name }}</span>
          </button>
        </div>
      </div>
    </div>
    <!-- {{ item }} -->
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { FileInfo } from "~/models/list_info";

const props = defineProps({
  item: {
    type: Object as PropType<FileInfo>,
    required: true,
  },
});

const actions = [
  {
    name: "下载",
    icon: "i-tabler-download",
    class: "",
    action: () => {
      // 下载 item.location 中的文件
      window.open(props.item.location);
    },
  },
  {
    name: "删除",
    icon: "i-tabler-trash",
    class: "text-red-500 hover:text-red-800",
    action: () => {
      console.log("删除");
    },
  },
];

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

// 关系表
// id (integer): id ,
// ocId (integer): 课程id ,
// contentId (integer): 资源id ,
// creator (integer): 发布人id ,
// createTime (string): 发布时间 ,
// name (string): 发布人 ,

// 本身
// title (string): 资源名称 ,
// userId (integer): 资源创建者id ,
// type (integer): 资源附件的类型：0.没有附件；1.本地上传；2超链接;3文件夹 ,
// mimeType (string): 资源后缀 ,
// contentSize (string): 文件大小 byte ,
// location (string): 资源路径 ,
// status (integer): 资源状态：1-草稿；2-待发布；3-发布到阅读材料；4-发布到课程；5-发布到作业 ,
// remark1 (string): 文件名称 带后缀的 ,
// remark2 (string): 共享方式：1复制使用2仅查看 ,
// remark3 (string): 该资源是否可以下载 1 不可以 ；其他可以 ,
// remark4 (string): 字幕 ,
// remark5 (string): 封面,
// duration:视频时长
// description (string): 资源描述 ,
// share 0 课程下所有班级 1 我的所有班级
// isView (string): 是否共享0 不共享，个人资源1 共享给本校老师2 共享给全系统所有老师3 共享给指定老师 ,
// publishTimes (integer): 已推荐次数(被今日推荐后自动加1) ,
// viewTimes (integer): 查看次数 ,
// downloadTimes (integer): 下载次数 ,
// growth (integer): 成长值
// createDate   创建时间
// parentId      父节点id
// isLook   是否已查看  学生
// courseResType 课程资源类型  0：文件夹1：视频2：音频3：图片4：文档5：压缩文件6：其他7：超链接8：图文9:微课 ,10:课件11:试题12:试卷13：虚拟仿真 14:优学院微课,
// localType (integer, optional): 0-来源于优学院1-来源于资源库 ,
</script>
