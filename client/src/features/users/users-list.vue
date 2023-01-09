<script lang="ts" setup>
import { toRefs } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import PaginationUI from "@/components/ui/pagination/pagination-ui.vue";

const userStore = useUserStore();
const route = useRoute();

const updateStateFromQuery = () => {
  userStore.users.page = Number(route.query.page) || 1;
};

updateStateFromQuery();
userStore.loadUsers();

const { users, updatePageAndLoadUsers } = toRefs(userStore);
</script>

<template>
  <div class="users-list-wrapper">
    <div v-if="!users.results.length && users.isLoading">Loading...</div>
    <div v-else-if="!users.results.length">
      <p>No users</p>
      <div
        v-if="users.page !== 1 && users.page * users.limit > users.count"
        @click="updatePageAndLoadUsers(1)"
      >
        Back to first page?
      </div>
    </div>

    <div class="users-list">
      <div v-for="user in users.results" :key="user.id">
        {{ user.username }}
      </div>
    </div>

    <PaginationUI
      :page="users.page"
      :count="users.count"
      :limit="users.limit"
      @click:prev="() => updatePageAndLoadUsers(users.page - 1)"
      @click:next="() => updatePageAndLoadUsers(users.page + 1)"
      @click:page="(page) => updatePageAndLoadUsers(page)"
    />
  </div>
</template>

<style lang="scss" scoped>
.users-list-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.users-list {
  padding-bottom: 16px;
  flex-grow: 1;
}
</style>
