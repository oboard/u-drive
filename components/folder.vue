<template>
  <!-- {{ parentId }} -->
  <ul class="menu max-w-xs w-full m-1 p-0" v-if="verified">
    <li v-if="folder" v-for="item in folder.son" :key="item?.id">
      <details open v-if="item.son.length > 0">
        <summary
          class="border border-transparent rounded transition-all duration-300 ease-out-cubic px-4"
          :class="{
            'bg-base-100': item?.id === Number(currentId),
            'border-gray': item?.id === Number(currentId),
            shadow: item?.id === Number(currentId),
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
          <span @click="$router.push(`/${item?.id}`)">
            {{ item?.title ?? "根目录" }}
          </span>
        </summary>
        <Folder :folder="item" />
      </details>
      <span v-else @click="$router.push(`/${item?.id}`)"
          class="border border-transparent rounded transition-all duration-300 ease-out-cubic px-4"
          :class="{
            'bg-base-100': item?.id === Number(currentId),
            'border-gray': item?.id === Number(currentId),
            shadow: item?.id === Number(currentId),
          }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
        {{ item?.title ?? "根目录" }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type Folder from "~/models/folder";
import { verified } from "~/pages/token";
const currentId = ref();

const route = useRoute();
// watch(
//   route,
//   (to) => {
//     const { parentId } = route.params;
//     currentId.value = parentId;
//   },
//   { flush: "pre", immediate: true, deep: true }
// );

watchEffect(() => {
  const { parentId } = route.params;
  currentId.value = parentId;
});

defineProps({
  folder: {
    type: Object as PropType<Folder>,
    required: true,
  },
});
</script>
