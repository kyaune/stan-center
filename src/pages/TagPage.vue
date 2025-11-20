<template>
  <main class="tag-page">
    <ContentWithSidebar>
      <!-- Левая колонка: заголовок + карточки -->
      <template #content>
        <section class="tag-page__content">
          <h1 class="tag-page__title">
            Все статьи по тегу «{{ title }}»
          </h1>

          <div class="tag-page__grid">
            <StoryCard
                v-for="article in previewArticles"
                :key="article.id"
                :id="article.id"
                :title="article.title"
                :img="article.img"
            />
          </div>
        </section>
      </template>

      <!-- Правая колонка: сквозной сайдбар -->
      <template #sidebar>
        <SidebarFilters />
      </template>
    </ContentWithSidebar>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ContentWithSidebar from '@/components/layout/ContentWithSidebar.vue'
import SidebarFilters from '@/components/sidebar/SidebarFilters.vue'
import StoryCard from '@/components/stories/StoryCard.vue'
import articles from '@/dummydata/articles'

// карта: slug → заголовок на русском
const TAG_TITLES: Record<string, string> = {
  analitika: 'Аналитика',
  intervyu: 'Интервью',
  mneniya: 'Мнения',
  obzory: 'Обзоры'
}

// карта: slug → значение тега в данных
// пока у тебя в статьях только "интервью", остальные можно потом добить
const TAG_DATA_VALUES: Record<string, string> = {
  analitika: 'аналитика',
  intervyu: 'интервью',
  mneniya: 'мнения',
  obzory: 'обзоры'
}

const route = useRoute()

const tagSlug = computed(() => {
  return (route.meta.tagSlug as string) || (route.params.slug as string) || ''
})

const title = computed(
    () => TAG_TITLES[tagSlug.value] ?? (tagSlug.value || 'Статьи'),
)

const previewArticles = computed(() => {
  const tagValue = TAG_DATA_VALUES[tagSlug.value]
  let list = articles

  if (tagValue) {
    list = articles.filter(
        a => a.tag?.toLowerCase?.() === tagValue.toLowerCase()
    )
  }

  // пока по ТЗ просто три одинаковые карточки-заглушки
  if (!list.length) {
    list = [articles[0], articles[0], articles[0]]
  }

  return list.slice(0, 3)
})
</script>

<style scoped lang="scss">
.tag-page {
  padding-block: var(--paddingXL);
  font-family: var(--font-main);
  @include container;
}

.tag-page__content {
  display: flex;
  flex-direction: column;
}

.tag-page__title {
  margin: 0 0 var(--paddingL);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.3;
}

.tag-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--paddingL);
}
</style>