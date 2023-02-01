import { normalize } from "normalizr";
import { defineStore } from "pinia";
import { clientApi } from "@/api/axios";
import type { Question } from "@/types/questions";
import type {
  PaginationResponseState,
  ResponseState,
} from "@/types/responses-state";
import { questionArraySchema } from "./shema/questions";

export const useQuestionStore = defineStore("question", {
  state: () => {
    return {
      currentQuestion: {
        isLoading: false,
        data: {},
      } as ResponseState<Question>,
      questionsList: {
        isLoading: false,
        results: [],
        count: 0,
        limit: 10,
        page: 1,
      } as PaginationResponseState<number[]>,
      entities: {} as { [key: number]: Question },
    };
  },
  actions: {
    async loadQuestions() {
      this.questionsList.isLoading = true;
      clientApi
        .get("/questions", {
          params: {
            offset: (this.questionsList.page - 1) * this.questionsList.limit,
            limit: this.questionsList.limit,
          },
        })
        .then(({ data }) => {
          const { results, ...other } = data;
          const normalized = normalize(results, questionArraySchema);
          this.entities = {
            ...this.entities,
            ...(normalized.entities.questions || {}),
          };
          this.questionsList = {
            ...this.questionsList,
            ...other,
          };
          if (this.questionsList.page > 1) {
            this.questionsList.results = [
              ...this.questionsList.results,
              ...normalized.result,
            ];
          } else {
            this.questionsList.results = normalized.result;
          }
        })
        .finally(() => {
          this.questionsList.isLoading = false;
        });
    },
    async loadMoreQuestions() {
      this.questionsList.page++;
      this.loadQuestions();
    },
    async loadQuestion(id: number) {
      this.currentQuestion.isDataExist = false;
      if (this.entities[id]) {
        this.currentQuestion.data = this.entities[id];
        this.currentQuestion.isDataExist = true;
      }

      this.currentQuestion.isLoading = true;
      clientApi
        .get(`/questions/${id}`)
        .then(({ data }) => {
          if (
            this.currentQuestion.isDataExist &&
            data.id !== this.currentQuestion.data.id
          ) {
            return;
          }
          this.currentQuestion.data = data;
        })
        .finally(() => {
          this.currentQuestion.isLoading = false;
        });
    },
  },
});
