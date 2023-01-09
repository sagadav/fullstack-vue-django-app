<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits(["loadMore"]);

const props = withDefaults(defineProps(), {});
const scrollComponent = ref(null);

const scrollHandler = () => {
  const bottom = scrollComponent.value?.getBoundingClientRect().bottom;
  if (bottom - 100 < window.innerHeight) {
    emit("loadMore");
  }
};

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});
</script>

<template>
  <div ref="scrollComponent" class="scroll-component">
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
