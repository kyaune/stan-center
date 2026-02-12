<template>
  <main class="not-found">
    <div class="not-found__container">
      <span class="not-found__code">404</span>
      <h1 class="not-found__title">Страница не найдена</h1>
      <p class="not-found__text">
        К сожалению, запрашиваемая страница не существует или была удалена.
      </p>
      <RouterLink to="/" class="not-found__button">
        Вернуться на главную
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--paddingXL);
  font-family: var(--font-main);
}

.not-found__container {
  text-align: center;
  max-width: 480px;
}

.not-found__code {
  display: block;
  font-size: 8rem;
  font-weight: 800;
  line-height: 1;
  color: var(--color-primary);
  margin-bottom: var(--paddingM);
}

.not-found__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 var(--paddingS);
}

.not-found__text {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0 0 var(--paddingL);
}

.not-found__button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #006633;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
