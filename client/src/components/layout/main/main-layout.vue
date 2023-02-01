<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const nowYear = new Date().getFullYear();
</script>

<template>
  <div class="main-layout">
    <header class="header">
      <RouterLink :to="{ name: 'home' }"> Test QnA site </RouterLink>
      <nav class="header-nav-buttons">
        <RouterLink to="/users">Users list</RouterLink>
        <template v-if="authStore.isLoggedIn">
          <button @click="() => authStore.logout()">Log out</button>
          <div>
            {{ authStore.user.username }}
          </div>
        </template>
        <template v-else>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/login">Registration</RouterLink>
        </template>
      </nav>
    </header>
    <main class="container">
      <RouterView />
    </main>
    <footer class="footer">© «Artur inc», {{ nowYear }}</footer>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  margin: auto;
  width: 100%;
  padding: 12px 24px;
  margin-bottom: 50px;
  flex-grow: 0;
  flex-shrink: 0;
  border-bottom: 1px solid;
  .header-nav-buttons {
    margin-left: auto;
    display: flex;
    gap: 12px;
  }
}
.main-layout {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  flex-grow: 1;
}
.footer {
  padding: 24px 24px;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
