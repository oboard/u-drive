<template>
  <!-- 0.没有附件；1.本地上传；2超链接;3文件夹 -->
  <div class="flex items-center space-x-4 p-4 border-b border-gray-200 max-w-screen">
    <!-- Display the icon -->
    <!-- 0：文件夹1：视频2：音频3：图片4：文档5：压缩文件6：其他7：超链接8：图文9:微课 ,10:课件11:试题12:试卷13：虚拟仿真 14:优学院微课 -->
    <div class="text-4xl inline-block flex-shrink-0" v-if="item.contentType !== 4 && item.contentType !== 6" :class="[
      'i-vscode-icons-default-folder-opened',
      'i-vscode-icons-file-type-video',
      'i-vscode-icons-file-type-audio',
      'i-vscode-icons-file-type-image',
      'i-vscode-icons-default-file',
      'i-vscode-icons-file-type-zip',
      'i-vscode-icons-default-file',
      'i-vscode-icons-file-type-text',
      'i-vscode-icons-default-file',
    ][item.contentType]
      " />
    <div v-else class="text-4xl inline-block flex-shrink-0" :class="{
      'doc': 'i-vscode-icons-file-type-word',
      'docx': 'i-vscode-icons-file-type-word',
      'ppt': 'i-vscode-icons-file-type-powerpoint',
      'pptx': 'i-vscode-icons-file-type-powerpoint',
      'xls': 'i-vscode-icons-file-type-excel',
      'xlsx': 'i-vscode-icons-file-type-excel',
      'pdf': 'i-vscode-icons-file-type-pdf2',
      'txt': 'i-vscode-icons-file-type-text',
      'zip': 'i-vscode-icons-file-type-zip',
      'rar': 'i-vscode-icons-file-type-zip',
      '7z': 'i-vscode-icons-file-type-zip',
      'mp4': 'i-vscode-icons-file-type-video',
      'heic': 'i-vscode-icons-file-type-image',
      'webp': 'i-vscode-icons-file-type-image',
      'png': 'i-vscode-icons-file-type-image',
      'mov': 'i-vscode-icons-file-type-video',
    }[item.mimeType.toLowerCase()] ?? 'i-vscode-icons-default-file'
      " />

    <!-- Display file information -->
    <div class="flex-1">
      <div class="flex flex-col">
        <NuxtLink class="link link-neutral link-hover"
          :to="item.type === 3 ? (item.contentId.toString()) : item.location">
          {{ item.title }}
        </NuxtLink>
        <!-- <NuxtLink v-if="item.type === 1" class="text-sm text-ellipsis flex-inline flex-row link link-hover"
          :to="item.location">
          {{ item.location }}
        </NuxtLink> -->
        <!-- createDate -->
        <div class="text-gray-500 text-sm">
          {{ new Date(item.createDate).toLocaleString() }}
        </div>

      </div>
      <div v-if="item.type === 1" class="text-gray-500 text-sm">
        {{ item.remark }}
      </div>
    </div>
    <!-- actions -->
    <div class="shrink-0 min-w-16">
      <div class="dropdown dropdown-bottom dropdown-end block sm:hidden">
        <div tabindex="0" role="button" class="btn p-0 btn-circle">
          <i class="i-carbon-overflow-menu-horizontal w-6 h-6" />
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="action in actions" :key="action.name"
            v-show="!action.showTypes || action.showTypes.includes(item.type)">
            <a tabindex="0" role="button" :class="action.class"
              class="flex items-center space-x-2 p-2 rounded-md hover:bg-base-200" @click="action.action">
              <i :class="action.icon" class="w-6 h-6" />
              <span>{{ action.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="hidden sm:block">
        <div class="flex items-center space-x-2">
          <button tabindex="0" class="btn btn-circle" v-show="!action.showTypes || action.showTypes.includes(item.type)"
            :class="action.class" v-for="action in actions" :key="action.name" @click="action.action">
            <i :class="action.icon" class="w-6 h-6" />
            <!-- <span class="hidden sm:block">{{ action.name }}</span> -->
          </button>
        </div>
      </div>
    </div>
    <!-- {{ item }} -->
  </div>
</template>

<script lang="ts" setup>
import type { FileInfo } from "~/models/list_info";

const props = defineProps({
  item: {
    type: Object as PropType<FileInfo>,
    required: true,
  },
  token: {
    type: String as PropType<string>,
    required: true,
  },
  reload: {
    type: Function as PropType<() => void>,
    required: true,
  },
  customConfirm: {
    type: Function as PropType<(message: string) => Promise<boolean>>,
    required: true,
  },
  customPrompt: {
    type: Function as PropType<(message: string, defaultValue?: string) => Promise<string | undefined>>,
    required: true,
  },
});

const actions = [
  {
    name: "下载",
    icon: "i-tabler-download",
    showTypes: [1],
    class: "",
    action: () => {
      props.customConfirm("是否下载文件？").then((confirm) => {
        if (confirm) {
          // 下载文件
          // 如果是tauri
          // @ts-ignore
          if (typeof window.navigator.tauri !== "undefined") {
            // @ts-ignore
            window.navigator.tauri.downloadFile(props.item.location);
          } else {
            window.open(props.item.location);
          }
        }
      });
    },
  },
  {
    name: "复制链接",
    icon: "i-tabler-link",
    showTypes: [1],
    class: "",
    action: () => {
      // 复制链接
      navigator.clipboard.writeText(props.item.location).then(() => {
        alert("已复制到剪贴板");
      });
    }
  },
  {
    name: "重命名",
    icon: "i-tabler-edit",
    class: "",
    action: async () => {
      // 重命名
      const newName = await props.customPrompt("请输入新的文件名", props.item.title);
      if (newName) {
        props.item.title = newName;
        fetch("https://courseapi.ulearning.cn/course/content/upload?lang=zh", {
          headers: {
            "Content-Type": "application/json",
            Referer: "https://courseweb.ulearning.cn/ulearning/index.html",
            Authorization: props.token,
          },
          body: JSON.stringify(props.item),

          method: "POST",
        }).then(() =>
          // 重新获取文件夹信息
          props.reload()
        );
      }
    },
  },
  {
    name: "删除",
    icon: "i-tabler-trash",
    class: "text-red-500 hover:text-red-800",
    action: () => {
      props.customConfirm("是否删除？").then((confirm) => {
        if (confirm) {
          // 删除文件
          fetch(
            "https://courseapi.ulearning.cn/content/delete?_method=DELETE&lang=zh",
            {
              headers: {
                "Content-Type": "application/json",
                Referer: "https://courseweb.ulearning.cn/ulearning/index.html",
                Authorization: props.token,
              },
              body: JSON.stringify([props.item.contentId]),
              method: "DELETE",
            }
          ).then(() =>
            // 重新获取文件夹信息
            props.reload()
          );
        }
      });
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
