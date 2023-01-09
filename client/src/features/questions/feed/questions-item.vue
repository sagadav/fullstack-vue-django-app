<script lang="ts" setup>
import type { Question } from "@/types/questions";
import { getDiffDates } from "@/utils/diffDates";
import { toRefs } from "vue";

const props = defineProps<{ question: Question }>();

const { question } = toRefs(props);
const { id, title, user, answers_count } = toRefs(question.value);

const formattedDate = getDiffDates(new Date(props.question.pub_date));
</script>

<template>
  <div class="question-item">
    <RouterLink :to="'/q/' + id">
      <p class="title">{{ title }}</p>
      <span v-if="answers_count">{{ answers_count }} answers</span>
      <p>by {{ user.username }}</p>
      <div>{{ formattedDate }}</div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.question-item {
  padding: 32px 0;
  .title {
    font-size: 24px;
  }
}
</style>
