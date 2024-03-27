<template>
  <dialog class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <slot></slot>
      <div class="modal-action">
        <form method="dialog">
          <!-- <button class="btn">确定</button> -->
          <div v-for="action in actions">
            <button class="btn" :class="action.class" @click="action.action">
              {{ action.name }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: "提示",
  },
  actions: {
    type: Array as PropType<
      {
        name: string;
        class?: string;
        action: () => void;
      }[]
    >,
    required: false,
    default: () => [
      {
        name: "确定",
        action: () => {
          console.log("确定");
        },
      },
    ],
  },
});
</script>
