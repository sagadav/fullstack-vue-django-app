<script lang="ts" setup>
import { useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import TextInput from "@/components/ui/text-input/text-input.vue";

const authStore = useAuthStore();
const { handleSubmit } = useForm();

const onSubmit = handleSubmit((values) => {
  authStore.login({ password: values.password, username: values.username });
});
</script>

<template>
  <div>
    LOGIN
    <RouterLink to="/">awd</RouterLink>
    <form @submit="onSubmit">
      <TextInput name="username" />
      <TextInput name="password" type="password" />
      <TextInput name="confirmPassword" type="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style></style>
