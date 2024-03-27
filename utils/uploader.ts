import type ObsToken from "~/models/obs";
import getToken from "@/pages/token";
import ObsClient from "~/obs/src/obs";
import type { UploadFileInfo } from "~/models/list_info";
const token = await getToken();

export function upload(
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

// export async function handleFileUpload(e: Event) {
//   const input = e.target as HTMLInputElement;
//   const file = input.files?.[0];
//   if (file) {
//     const timeStamp = Date.now();
//     const subfix =
//       file.name.indexOf(".") == -1 ? "" : "." + file.name.split(".").pop();
//     const nodotsubfix =
//       file.name.indexOf(".") == -1 ? "" : file.name.split(".").pop();
//     const filename = `${timeStamp}${subfix}`;

//     const res = (await $fetch(
//       `https://courseapi.ulearning.cn/obs/uploadToken?path=resources/web/${filename}`,
//       {
//         method: "GET",
//         headers: { Authorization: token },
//       }
//     )) as any;
//     console.log(res);
//     const uploadToken = res.result as ObsToken;
//     const url = `https://${uploadToken.bucket}.${uploadToken.endpoint}/resources/web/${filename}`;
//     console.log(url);
//     await upload(file, uploadToken, filename)
//       .then(async (fileUrl: string) => {
//         console.log("File uploaded successfully:", fileUrl);
//         // 更新上传记录
//         // await updateRecord({
//         //     title: file.name,
//         //     type: 1,
//         //     status: 2,
//         //     contentSize: file.size,
//         //     location: url,
//         //     mimeType: nodotsubfix ?? "",
//         //     isView: 0,
//         //     remark2: 1,
//         //     remark3: 0,
//         //     parentId: Number(parentId),
//         // });
//         // await reload();
//       })
//       .catch((error: any) => {
//         console.error("Error uploading file:", error.message);
//       });
//   }
// }

export async function handleFileUpload(e: Event) {
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
        headers: { Authorization: token },
      }
    )) as any;
    const uploadToken = res.result as ObsToken;
    // const url = `https://${uploadToken.bucket}.${uploadToken.endpoint}/resources/web/${filename}`;
    const fileUrl = await upload(file, uploadToken, filename).catch((error) => {
      console.error("Error uploading file:", error.message);
    });
    if (fileUrl === undefined) return undefined;
    console.log("File uploaded successfully:", fileUrl);
    return { url: fileUrl, file: file, nodotsubfix: nodotsubfix };
  }
  return undefined;
}

export async function updateRecord(fileInfo: UploadFileInfo) {
  await fetch("https://courseapi.ulearning.cn/course/content/upload?lang=zh", {
    headers: {
      authorization: token,
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(fileInfo),
  });
}
