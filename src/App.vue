<script setup>
import HomePage from "@/pages/HomePage.vue";
import Header from "@/components/header.vue";
import AppFooter from '@/components/AppFooter.vue'
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="app">
    <header>
      <Header />
    </header>
    <main class="app__main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1 0 auto;
}
</style>
