<template>
  <div v-if="listInfo" class="m-4 flex justify-between items-center">
    <div class="flex items-center space-x-2" v-if="parentInfo">
      <div class="space-x-2">
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
    </div>

    <div class="space-x-2">
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
    <input class="hidden" type="file" @change="handleFileUpload" />
  </div>
  <div v-if="listInfo">
    <div v-for="item in listInfo.list" :key="item.contentId">
      <FileItem :item="item" :reload="reload" :token="token.data.value" />
    </div>
    <div class="m-2 ml-4" v-if="listInfo?.total > 0">
      总数：{{ listInfo?.total }}
    </div>
    <div v-else class="h-full w-full flex items-center justify-center">
      这里空空如也
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ListInfo, FileInfo, UploadFileInfo } from "@/models/list_info";
const listInfo = ref<ListInfo>();
const parentInfo = ref<FileInfo>();
const token = await useFetch("/api/token", { method: "GET" });
import ObsClient from "esdk-obs-browserjs";

import type ObsToken from "@/models/obs";
// @ts-ignore
import * as CryptoJS from "crypto-js";

const fileList = ref<any[]>([]);

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

async function reload() {
  parentInfo.value = await getParentInfo();
  listInfo.value = await getLists();
}

async function handleUploadButton() {
  // 先选择文件
  const input = document.querySelector("input[type=file]") as HTMLInputElement;
  input.click();
}

function obsSign(
  httpMethod: string,
  contentMd5: string,
  contentType: string,
  date: string,
  acl: string,
  res: string,
  ak: string,
  sk: string
): string {
  const signContent = `${httpMethod}\n${contentMd5}\n${contentType}\n${date}\n${acl}\n${res}`;
  const signature = `AWS ${ak}:${CryptoJS.HmacSHA1(signContent, sk).toString(
    CryptoJS.enc.Base64
  )}`;

  return signature;
}

onMounted(async () => {
  await reload();

  // var files: any[] = [];
  // const uploader = new Obs({
  //   maxSize: 1024,
  //   fileTypes: [],
  //   multiple: true,
  //   uptokenHost: "https://courseapi.ulearning.cn",
  //   authorization: token.data.value as string,
  //   obsHost: "https://leicloud.ulearning.cn",
  // });

  // var time = 1;
  // uploader.initUpBtn(document.getElementById("btnUploadFile"));
  // var st: NodeJS.Timeout | undefined;
  // uploader.onBeforeUpload = function (file: any) {
  //   if (time != 1) {
  //     files = [];
  //   }
  //   time = 1;
  //   if (st != undefined) clearTimeout(st);
  //   st = setTimeout(() => {
  //     time = 0;
  //   }, 1000);
  //   files.push(file);
  //   // fileList = $.map(files, function (file: { name: any; type: any; }) {
  //   //   return {
  //   //     file: file,
  //   //     name: file.name,
  //   //     type: file.type,
  //   //     percent: ko.observable(0),
  //   //     complete: ko.observable(false),
  //   //   };
  //   // });
  //   // self.uploadFileList(self.fileList)
  // };

  // uploader.onSuccess = function (file: { key: any; obsHost: string }) {
  //   console.log(uploader);
  //   for (let i = 0; i < fileList.value.length; i++) {
  //     if (fileList.value[i].file.key == file.key) {
  //       fileList.value[i].complete(true);
  //       var data = {
  //         title: fileList.value[i].file.name,
  //         type: 1,
  //         contentSize: fileList.value[i].file.size,
  //         location: file.obsHost + "/" + fileList.value[i].file.key,
  //         mimeType: fileList.value[i].file.key.substring(
  //           fileList.value[i].file.key.lastIndexOf(".") + 1
  //         ),
  //         parentId: parentId,
  //       };
  //       // var spocRes = new SPOCResource(data);
  //       // spocRes.save(function () {
  //       // self.getMyResourceList();
  //       // });
  //     }
  //   }
  //   // self.isMaximize(true);
  //   // self.uploadFilePath(self.myResCrumbs().map(function (it) { return it.title() }).join('/'))
  // };
  // uploader.onProgress = function (
  //   file: { percent: any; key: any },
  //   percent: any
  // ) {
  //   file.percent = percent;
  //   for (let i = 0; i < fileList.value.length; i++) {
  //     if (fileList.value[i].file.key == file.key) {
  //       fileList.value[i].percent(percent);
  //     }
  //   }
  // };
  // uploader.onError = function (file: any, err: { msg: any }) {
  //   console.log("error----file-----", err);
  //   // var toast = new Toast();
  //   // toast.show({
  //   //   type: "warning",
  //   //   message: err.msg,
  //   //   time: 1500,
  //   // });
  // };
});

async function handleNewFolderButton() {
  const folderName = prompt("请输入文件夹名称");
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

async function handleFileUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const timeStamp = Date.now();
    const subfix =
      file.name.indexOf(".") == -1 ? "" : "." + file.name.split(".").pop();
    const nodotsubfix =
      file.name.indexOf(".") == -1 ? "" : file.name.split(".").pop();
    const filename = `${timeStamp}${subfix}`;

    const res = (await $fetch(
      `https://courseapi.ulearning.cn/obs/uploadToken?path=resources/web/${filename}`,
      {
        method: "GET",
        headers: { Authorization: token.data.value as string },
      }
    )) as any;
    console.log(res);
    const uploadToken = res.result as ObsToken;
    const url = `https://${uploadToken.bucket}.${uploadToken.endpoint}/resources/web/${filename}`;
    console.log(url);
    await upload(file, uploadToken, filename)
      .then(async (fileUrl) => {
        console.log("File uploaded successfully:", fileUrl);
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
      })
      .catch((error) => {
        console.error("Error uploading file:", error.message);
      });
  }
}

async function updateRecord(fileInfo: UploadFileInfo) {
  await fetch("https://courseapi.ulearning.cn/course/content/upload?lang=zh", {
    headers: {
      authorization: token.data.value as string,
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(fileInfo),
  });
}

function upload(
  file: File,
  tokens: ObsToken,
  filename: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const bucketName = tokens.bucket;
    const serverUrl = tokens.endpoint;

    const obsClient = new ObsClient({
      access_key_id: tokens.ak,
      secret_access_key: tokens.sk,
      security_token: tokens.securitytoken,
      server: serverUrl,
    });

    obsClient.putObject(
      {
        Bucket: bucketName,
        Key: "resources/web/" + filename,
        SourceFile: file,
        ContentType: file.type,
        Metadata: {
          Property: "property-value",
        },
      },
      (
        err: string,
        result: { CommonMsg: { Status: number; Code: string; Message: string } }
      ) => {
        if (err) {
          console.error("Error-->" + err);
          reject(new Error("上传失败，请重试"));
        } else {
          if (result.CommonMsg.Status < 300) {
            const fileUrl =
              "https://" +
              bucketName +
              "." +
              serverUrl +
              "/resources/web/" +
              filename;
            console.log(fileUrl);
            resolve(fileUrl);
          } else {
            console.log("Code-->" + result.CommonMsg.Code);
            console.log("Message-->" + result.CommonMsg.Message);
            reject(new Error("上传失败，请重试"));
          }
        }
      }
    );
  });
}
</script>
