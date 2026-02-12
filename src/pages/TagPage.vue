<template>
  <main class="tag-page">
    <ContentWithSidebar>
      <!-- Левая колонка: заголовок + карточки -->
      <template #content>
        <section class="tag-page__content">
          <h1 class="tag-page__title">
            Все статьи по теме «{{ title }}»
          </h1>

          <!-- Лоадер -->
          <div v-if="loading" class="tag-page__loader">
            <div class="tag-page__spinner"></div>
            <p>Загрузка статей...</p>
          </div>

          <!-- Список статей -->
          <div v-else-if="filteredArticles.length" class="tag-page__grid">
            <FavouriteArticleCard
                v-for="article in filteredArticles"
                :key="article.id"
                :article="article"
            />
          </div>

          <!-- Пустое состояние -->
          <p v-else class="tag-page__empty">
            Статьи по теме «{{ title }}» пока не найдены.
          </p>
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
import FavouriteArticleCard from '@/components/articles/FavouriteArticleCard.vue'
import { useWordPressArticles } from '@/composables/useWordPressArticles'

const { articles, loading } = useWordPressArticles()

// карта: slug → заголовок на русском
const TAG_TITLES: Record<string, string> = {
  // тематики
  diplomatiya: "Дипломатия",
  ugrozy: "Угрозы",
  energetika: "Энергетика",
  istoriya: "История",
  kultura: "Культура",
  dengi: "Деньги",

  // страны
  rossiya: "Россия",
  belorussiya: "Белоруссия",
  kazakhstan: "Казахстан",
  kyrgyziya: "Киргизия",
  uzbekistan: "Узбекистан",
  tadjikistan: "Таджикистан",
  turkmeniya: "Туркмения",
  briks: "БРИКС",
  afrika: "Африка",
  evrosoyuz: "Евросоюз",

  // существующие типы
  analitika: "Аналитика",
  intervyu: "Интервью",
  mneniya: "Мнения",
  obzory: "Обзоры"
}

// карта: slug → русское значение для фильтрации
const SLUG_TO_VALUE: Record<string, string> = {
  // типы статей
  analitika: 'аналитика',
  intervyu: 'интервью',
  mneniya: 'мнения',
  obzory: 'обзоры',

  // страны
  rossiya: 'Россия',
  belorussiya: 'Белоруссия',
  kazakhstan: 'Казахстан',
  kyrgyziya: 'Киргизия',
  uzbekistan: 'Узбекистан',
  tadjikistan: 'Таджикистан',
  turkmeniya: 'Туркмения',
  briks: 'БРИКС',
  afrika: 'Африка',
  evrosoyuz: 'Евросоюз',

  // тематики
  diplomatiya: 'Дипломатия',
  ugrozy: 'Угрозы',
  energetika: 'Энергетика',
  istoriya: 'История',
  kultura: 'Культура',
  dengi: 'Деньги',
}

// Определяем категорию slug (тип, страна или тема)
const TYPE_SLUGS = ['analitika', 'intervyu', 'mneniya', 'obzory']
const COUNTRY_SLUGS = ['rossiya', 'belorussiya', 'kazakhstan', 'kyrgyziya', 'uzbekistan', 'tadjikistan', 'turkmeniya', 'briks', 'afrika', 'evrosoyuz']
const THEME_SLUGS = ['diplomatiya', 'ugrozy', 'energetika', 'istoriya', 'kultura', 'dengi']

const route = useRoute()

const tagSlug = computed(() => {
  return (route.meta.tagSlug as string) || (route.params.slug as string) || ''
})

const title = computed(
    () => TAG_TITLES[tagSlug.value] ?? (tagSlug.value || 'Статьи'),
)

const filteredArticles = computed(() => {
  const slug = tagSlug.value
  const filterValue = SLUG_TO_VALUE[slug]

  if (!filterValue || !articles.value.length) {
    return []
  }

  // Фильтруем по типу
  if (TYPE_SLUGS.includes(slug)) {
    return articles.value.filter(
        a => a.type?.toLowerCase() === filterValue.toLowerCase()
    )
  }

  // Фильтруем по стране
  if (COUNTRY_SLUGS.includes(slug)) {
    return articles.value.filter(
        a => a.countries?.includes(filterValue)
    )
  }

  // Фильтруем по теме
  if (THEME_SLUGS.includes(slug)) {
    return articles.value.filter(
        a => a.themes?.includes(filterValue)
    )
  }

  return []
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 320px));
  gap: var(--paddingL);
}

.tag-page__loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--paddingXL);
  color: var(--color-text-muted);
}

.tag-page__spinner {
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

.tag-page__empty {
  padding: var(--paddingXL);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1rem;
}
</style>