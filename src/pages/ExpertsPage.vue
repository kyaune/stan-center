<template>
  <main class="experts-page">
    <ContentWithSidebar>
      <template #content>
        <section class="experts-page__content">
          <h1 class="experts-page__title">Все эксперты</h1>

          <div class="experts-page__list">
            <article
                v-for="expert in experts"
                :key="expert.id"
                class="experts-page__card"
            >
              <img
                  :src="expert.avatar"
                  :alt="`Фото эксперта ${expert.name}`"
                  class="experts-page__avatar"
              />
              <div class="experts-page__body">
                <h2 class="experts-page__name">
                  {{ expert.name }}
                </h2>
                <p class="experts-page__role">
                  {{ expert.role }}
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

type Expert = {
  id: number
  name: string
  role: string
  avatar: string
}

// заглушка: 10 одинаковых экспертов
const experts: Expert[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: 'Имя Фамилия',
  role: 'Должность',
  avatar: dummyimg,
}))
</script>

<style scoped lang="scss">
.experts-page {
  padding-block: var(--paddingXL);
  font-family: var(--font-main);
  @include container;
}

.experts-page__content {
  display: flex;
  flex-direction: column;
  gap: var(--paddingL);
}

.experts-page__title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.3;
}

.experts-page__list {
  display: flex;
  flex-direction: column;
  gap: var(--paddingM);
}

.experts-page__card {
  display: flex;
  gap: var(--paddingM);
  align-items: flex-start;
  padding: var(--paddingM);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: #ffffff;
}

.experts-page__avatar {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  object-fit: cover;
  object-position: center;
  display: block;
}

.experts-page__name {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.experts-page__role {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
</style>