<template>
  <main class="quotes-page">
    <ContentWithSidebar>
      <template #content>
        <section class="quotes-page__content">
          <h1 class="quotes-page__title">Все цитаты</h1>

          <!-- Лоадер -->
          <div v-if="loading" class="quotes-page__loader">
            <div class="quotes-page__spinner"></div>
            <p>Загрузка цитат...</p>
          </div>

          <!-- Список цитат -->
          <div v-else-if="quotes.length" class="quotes-page__list">
            <article
                v-for="quote in quotes"
                :key="quote.id"
                class="quotes-page__card"
            >
              <img
                  v-if="quote.expertImage"
                  :src="quote.expertImage"
                  :alt="`Фото ${quote.expertName}`"
                  class="quotes-page__avatar"
              />
              <div v-else class="quotes-page__avatar quotes-page__avatar--placeholder">
                {{ quote.expertName?.charAt(0) || '?' }}
              </div>

              <div class="quotes-page__body">
                <p class="quotes-page__text">
                  «{{ quote.text }}»
                </p>
                <p class="quotes-page__author">
                  {{ quote.expertName }}
                </p>
                <p v-if="quote.expertPosition" class="quotes-page__role">
                  {{ quote.expertPosition }}
                </p>
              </div>
            </article>
          </div>

          <!-- Пустое состояние -->
          <p v-else class="quotes-page__empty">
            Цитаты пока не добавлены.
          </p>
        </section>
      </template>

      <template #sidebar>
        <SidebarFilters />
      </template>
    </ContentWithSidebar>
  </main>
</template>

<script setup lang="ts">
import ContentWithSidebar from '@/components/layout/ContentWithSidebar.vue'
import SidebarFilters from '@/components/sidebar/SidebarFilters.vue'
import { useWordPressQuotes } from '@/composables/useWordPressQuotes'

const { quotes, loading } = useWordPressQuotes()
</script>

<style scoped lang="scss">
.quotes-page {
  padding-block: var(--paddingXL);
  font-family: var(--font-main);
  @include container;
}

.quotes-page__content {
  display: flex;
  flex-direction: column;
  gap: var(--paddingL);
}

.quotes-page__title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.3;
}

.quotes-page__list {
  display: flex;
  flex-direction: column;
  gap: var(--paddingM);
}

.quotes-page__card {
  display: flex;
  gap: var(--paddingM);
  align-items: flex-start;
  padding: var(--paddingM);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: #ffffff;
}

.quotes-page__avatar {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  object-fit: cover;
  object-position: center;
  display: block;
}

.quotes-page__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.quotes-page__text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-text);
}

.quotes-page__author {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.quotes-page__role {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.quotes-page__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
}

.quotes-page__loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--paddingXL);
  color: var(--color-text-muted);
}

.quotes-page__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: var(--paddingM);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.quotes-page__empty {
  padding: var(--paddingXL);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1rem;
}
</style>