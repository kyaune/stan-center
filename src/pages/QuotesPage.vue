<template>
  <main class="quotes-page">
    <ContentWithSidebar>
      <template #content>
        <section class="quotes-page__content">
          <h1 class="quotes-page__title">Все цитаты</h1>

          <div class="quotes-page__list">
            <article
                v-for="quote in quotes"
                :key="quote.id"
                class="quotes-page__card"
            >
              <img
                  :src="quote.avatar"
                  :alt="`Фото эксперта ${quote.author}`"
                  class="quotes-page__avatar"
              />

              <div class="quotes-page__body">
                <p class="quotes-page__text">
                  «{{ quote.text }}»
                </p>
                <p class="quotes-page__author">
                  {{ quote.author }}
                </p>
                <p class="quotes-page__role">
                  {{ quote.role }}
                </p>
              </div>
            </article>
          </div>
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
import dummyimg from '@/assets/dummyimg.jpg'

type Quote = {
  id: number
  text: string
  author: string
  role: string
  avatar: string
}

// заглушка: 10 одинаковых цитат
const quotes: Quote[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  text: 'Краткая цитата эксперта по теме Центральной Азии.',
  author: 'Имя Фамилия',
  role: 'Должность',
  avatar: dummyimg,
}))
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
</style>