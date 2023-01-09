<script lang="ts" setup>
import { toRefs, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "@/stores/question";
import { storeToRefs } from "pinia";

const route = useRoute();
const questionStore = useQuestionStore();

const id = Number(route.params.id);
questionStore.loadQuestion(id);

const { isDataExist, isLoading, data } = toRefs(questionStore.currentQuestion);
</script>

<template>
  <div class="question-item">
    <div v-if="!isDataExist && isLoading">Loading...</div>
    <div v-else>
      {{ data.title }}
      <div>
        {{ data.content }}
      </div>
      <div>
        <p>Answers:</p>
        <div v-if="data.answers?.length">
          <div v-for="answer in data.answers" :key="answer.id">
            {{ answer.content }}
            <span></span>
          </div>
        </div>
        <div v-else>No answers yet</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
