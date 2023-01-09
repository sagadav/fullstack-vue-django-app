import { clientApi } from "@/api/axios";
import router from "@/router";
import type { RequestState } from "@/types/request-state";
import type { PaginationResponseState } from "@/types/responses-state";
import type { User } from "@/types/users";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      users: {
        isLoading: false,
        results: [],
        page: 1,
        limit: 5,
        count: 0,
      } as PaginationResponseState<User[]>,
    };
  },
  actions: {
    async loadUsers() {
      this.users.isLoading = true;
      clientApi
        .get("/users", { params: { offset: (this.users.page - 1) * 5 } })
        .then(({ data }) => {
          this.users = Object.assign(this.users, data);
        })
        .finally(() => (this.users.isLoading = false));
    },
    async updatePageAndLoadUsers(page: number) {
      await router.replace({ query: { page } });
      this.users.page = page;
      this.loadUsers();
    },
  },
});
