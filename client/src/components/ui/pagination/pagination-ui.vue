<script lang="ts" setup>
import { range } from "@/utils/range";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ page: number; limit: number; count?: number }>(),
  {
    count: 0,
  }
);

const pagesLength = computed(() => Math.ceil(props.count / props.limit) + 1);
</script>

<template>
  <div v-if="pagesLength > 1" class="pagination">
    <button :disabled="page === 1" @click="$emit('click:prev')">prev</button>
    <div
      v-for="num in range(1, pagesLength)"
      :key="num"
      @click="$emit('click:page', num)"
    >
      {{ num }}
    </div>
    <button :disabled="page === pagesLength - 1" @click="$emit('click:next')">
      next
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 12px;
}
</style>
