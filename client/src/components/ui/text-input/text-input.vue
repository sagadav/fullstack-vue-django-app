<script lang="ts" setup>
import { defineProps, toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  value: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
});

const name = toRef(props, "name");

const { value } = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div>
    <input v-model="value" :type="type" />
  </div>
</template>

<style></style>
