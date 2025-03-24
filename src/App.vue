<script setup lang="ts">
import { RouterView } from "vue-router";
import Load from "@/components/Load.vue";
import { useLoadingStore } from "./stores/loading";

const loadingStore = useLoadingStore();
</script>

<template>
  <RouterView />
  <Load v-if="loadingStore.isLoading"/>
</template>

<style scoped lang="sccs"></style>
