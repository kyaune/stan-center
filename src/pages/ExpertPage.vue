<template>
  <!-- Лоадер -->
  <main v-if="!isReady" class="expert-loader">
    <div class="expert-loader__content">
      <div class="expert-loader__spinner"></div>
      <p class="expert-loader__text">Загрузка...</p>
    </div>
  </main>

  <!-- Контент эксперта -->
  <main v-else class="expert-page">
    <ContentWithSidebar>
      <template #content>
        <section class="expert-page__content">
          <!-- Шапка с фото и основной информацией -->
          <div class="expert-page__header">
            <img
                v-if="expert?.avatar"
                :src="expert.avatar"
                :alt="`Фото ${expert.name}`"
                class="expert-page__avatar"
            />
            <div v-else class="expert-page__avatar expert-page__avatar--placeholder">
              {{ expert?.name?.charAt(0) || '?' }}
            </div>

            <div class="expert-page__info">
              <h1 class="expert-page__name">{{ expert?.name }}</h1>
              <p class="expert-page__role">{{ expert?.role }}</p>
            </div>
          </div>

          <!-- Биография -->
          <div v-if="expert?.biography" class="expert-page__biography">
            <h2 class="expert-page__section-title">Биография</h2>
            <p class="expert-page__biography-text">{{ expert.biography }}</p>
          </div>

          <!-- Кнопка назад -->
          <RouterLink :to="{ name: 'experti' }" class="expert-page__back">
            &larr; Все эксперты
          </RouterLink>
        </section>
      </template>

      <template #sidebar>
        <SidebarFilters />
      </template>
    </ContentWithSidebar>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import ContentWithSidebar from '@/components/layout/ContentWithSidebar.vue'
import SidebarFilters from '@/components/sidebar/SidebarFilters.vue'
import { useWordPressExperts } from '@/composables/useWordPressExperts'

const props = defineProps<{
  slug?: string
}>()

const route = useRoute()
const router = useRouter()
const { getExpertBySlug } = useWordPressExperts()

const expert = ref(null)
const isReady = ref(false)

onMounted(async () => {
  const slug = props.slug || route.params.slug

  if (slug) {
    expert.value = await getExpertBySlug(slug as string)

    if (!expert.value) {
      await router.replace({ name: 'not-found' })
      return
    }
  }

  isReady.value = true
})
</script>

<style scoped lang="scss">
.expert-page {
  padding-block: var(--paddingXL);
  font-family: var(--font-main);
  @include container;
}

.expert-page__content {
  display: flex;
  flex-direction: column;
  gap: var(--paddingXL);
}

.expert-page__header {
  display: flex;
  gap: var(--paddingL);
  align-items: flex-start;
}

.expert-page__avatar {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  object-fit: cover;
  object-position: center;
}

.expert-page__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
}

.expert-page__info {
  display: flex;
  flex-direction: column;
  gap: var(--paddingS);
}

.expert-page__name {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
}

.expert-page__role {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-text-muted);
}

.expert-page__biography {
  padding: var(--paddingL);
  background: #ffffff;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.expert-page__section-title {
  margin: 0 0 var(--paddingM);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.expert-page__biography-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  white-space: pre-wrap;
}

.expert-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.expert-page__back:hover {
  text-decoration: underline;
}

/* Лоадер */
.expert-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--paddingXL);
  font-family: var(--font-main);
}

.expert-loader__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--paddingM);
}

.expert-loader__spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.expert-loader__text {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
