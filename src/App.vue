<script setup>
import HomePage from "@/pages/HomePage.vue";
import Header from "@/components/header.vue";
import AppFooter from '@/components/AppFooter.vue'
import { RouterView } from 'vue-router'

</script>

<template>
<header>
  <Header />
</header>
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
</style>
