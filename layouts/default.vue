<template>
  <div data-theme="winter" class="bg-base-100">
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col h-screen overflow-y-hidden">
        <!-- Navbar -->
        <div
          class="w-full navbar fixed z-10 bg-base-100 shadow shadow-gray-200 dark:shadow-gray-900"
        >
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl gap-2">
              <!-- <div class="avatar">
                <div class="w-10 mask mask-squircle">
                  <img
                    src="https://upload.jianshu.io/users/upload_avatars/8761709/3101d25e-1917-47dd-bdee-58bbda3352ac.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/300/format/webp"
                  />
                </div>
              </div> -->
              <span>U-Drive</span>
            </a>
          </div>
        </div>
        <!-- Page content here -->
        <!-- 路由出口 -->
        <div class="w-full flex-1 overflow-y-scroll">
          <div
            class="fixed w-64 min-h-screen bg-base-200 hidden lg:block border-r"
          >
            <ul class="menu flex flex-col pt-20">
              <Folder
                :folder="{ son: rootFolder }"
                class="bg-base-200"
              />
            </ul>
          </div>
          <div class="flex-1 mx-4 pt-18 lg:ml-64">
            <slot />
          </div>
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu w-80 bg-base-200 flex-col h-screen pt-18 z-2">
          <Folder
            :folder="{ son: rootFolder }"
            class="bg-base-200"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import getToken from "@/pages/token";
const token = await getToken();

const rootFolder = ref({});
// await useFetch(
//   "https://courseapi.ulearning.cn/content/folder?viewType=0&parentId=0",
//   {
//     method: "GET",
//     headers: {
//       Authorization: token,
//     },
//   }
// );

onMounted(() => {
  fetch(
    "https://courseapi.ulearning.cn/content/folder?viewType=0&parentId=0",
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      rootFolder.value = res;
    });
});
</script>
<!-- [
    {
        "son": [
            {
                "son": [],
                "id": 1578815,
                "title": "ha"
            }
        ],
        "id": 1578762,
        "title": "drive"
    }
] -->
