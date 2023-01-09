<script lang="ts" setup>
import { toRefs } from "vue";
import { useQuestionStore } from "@/stores/question";
import QuestionsItem from "./questions-item.vue";
import InfiniteScroller from "@/components/ui/infinite-scroll/infinite-scroller.vue";

const questionStore = useQuestionStore();
questionStore.loadQuestions();

const loadMoreHandler = () => {
  const { questionsList } = questionStore;
  if (
    !questionsList.isLoading &&
    questionsList.page !== Math.ceil(questionsList.count / questionsList.limit)
  ) {
    questionStore.loadMoreQuestions();
  }
};

const { questionsList, entities } = toRefs(questionStore);
</script>

<template>
  <div>
    <div v-if="!questionsList.results.length && questionsList.isLoading">
      Loading...
    </div>
    <div v-else-if="!questionsList.results.length">No posts</div>
    <InfiniteScroller @load-more="loadMoreHandler">
      <QuestionsItem
        v-for="id in questionsList.results"
        :key="id"
        :question="entities[id]"
      />
    </InfiniteScroller>
  </div>
</template>
