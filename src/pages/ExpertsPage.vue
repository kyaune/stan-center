<template>
  <main class="experts-page">
    <ContentWithSidebar>
      <template #content>
        <section class="experts-page__content">
          <h1 class="experts-page__title">Все эксперты</h1>

          <!-- Лоадер -->
          <div v-if="loading" class="experts-page__loader">
            <div class="experts-page__spinner"></div>
            <p>Загрузка экспертов...</p>
          </div>

          <!-- Список экспертов -->
          <div v-else-if="experts.length" class="experts-page__list">
            <RouterLink
                v-for="expert in experts"
                :key="expert.id"
                :to="{ name: 'expert', params: { slug: expert.slug } }"
                class="experts-page__card"
            >
              <img
                  v-if="expert.avatar"
                  :src="expert.avatar"
                  :alt="`Фото эксперта ${expert.name}`"
                  class="experts-page__avatar"
              />
              <div v-else class="experts-page__avatar experts-page__avatar--placeholder">
                {{ expert.name?.charAt(0) || '?' }}
              </div>
              <div class="experts-page__body">
                <h2 class="experts-page__name">
                  {{ expert.name }}
                </h2>
                <p class="experts-page__role">
                  {{ expert.role }}
                </p>
              </div>
            </RouterLink>
          </div>

          <!-- Пустое состояние -->
          <p v-else class="experts-page__empty">
            Эксперты пока не добавлены.
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
import { useWordPressExperts } from '@/composables/useWordPressExperts'

const { experts, loading } = useWordPressExperts()
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
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.experts-page__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.experts-page__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
}

.experts-page__loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--paddingXL);
  color: var(--color-text-muted);
}

.experts-page__spinner {
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

.experts-page__empty {
  padding: var(--paddingXL);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1rem;
}
</style>