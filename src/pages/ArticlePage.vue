<template>
  <!-- Полноэкранный лоадер во время загрузки -->
  <main v-if="!isReady" class="article-loader">
    <div class="article-loader__content">
      <div class="article-loader__spinner"></div>
      <p class="article-loader__text">Загрузка статьи...</p>
    </div>
  </main>

  <!-- Контент статьи -->
  <main v-else class="article">
    <ContentWithSidebar>
      <template #content>
        <article class="article__content">
          <!-- Крупная обложка -->
          <div class="article__cover">
            <div class="article__meta-row">
              <RouterLink
                  v-if="articleTagRouteName"
                  :to="{ name: articleTagRouteName }"
                  class="article__tag-link"
              >
                {{ article.type?.charAt(0).toUpperCase() + article.type?.slice(1) }}
              </RouterLink>
              <template v-if="article.countries && slugMap[article.countries]">
                <span class="article__meta-dot">·</span>
                <RouterLink
                    :to="{ name: 'tag', params: { slug: slugMap[article.countries] } }"
                    class="article__tag-link"
                >
                  {{ article.countries }}
                </RouterLink>
              </template>
              <template v-if="article.themes && slugMap[article.themes]">
                <span class="article__meta-dot">·</span>
                <RouterLink
                    :to="{ name: 'tag', params: { slug: slugMap[article.themes] } }"
                    class="article__tag-link"
                >
                  {{ article.themes }}
                </RouterLink>
              </template>
              <span class="article__meta-dot">·</span>
              <span class="article__meta-date">
    {{ articleMetaDate }}
  </span>
            </div>
          </div>

          <!-- Заголовок, подзаголовок, мета -->
          <header class="article__header">
            <h1 class="article__title">
              {{ article.title }}
            </h1>

            <p class="article__subtitle">
              {{ article.subtitle }}
            </p>
            <img
                :src="article.img"
                :alt="article.title"
                class="article__cover-img"
            />

            <p v-if="article.coverCaption" class="article__cover-caption">
              {{ article.coverCaption }}
            </p>
          </header>

          <!-- Текст статьи (динамический из WordPress или dummy data) -->
          <ArticleContent
            v-if="useWordPress && currentArticle && currentArticle.contentBlocks"
            :blocks="currentArticle.contentBlocks"
          />
          
          <!-- Fallback: старый статический контент для dummy data -->
          <div v-else-if="!useWordPress" class="article__body">
            <p class="article__lead">
              Информационно-аналитический телеграм-канал «Стан-Центр» пообщался
              с экспертом из Узбекистана, кандидатом философских наук,
              профессором Казахстанско-Немецкого университета Рустамом
              Бурнашевым. Эксперт рассказал, чего ждёт Центральная Азия от
              президентских выборов в России.
            </p>

            <p class="article__question">
              <strong>— Уважаемый Рустам Ренатович, на ваш взгляд, может ли смерть Алексея Навального** внести коррективы в текущие политические процессы в России?</strong>
            </p>

            <p>
              — Факт смерти Навального** нужно расследовать. На текущие
              политические процессы в России или в любой другой стране это
              событие никак не повлияет. Что касается его заявлений в бытность
              оппозиционным политиком по поводу ужесточения условий пребывания
              мигрантов из Центральной Азии, то нужно понимать степень его
              влияния на Москву. Этого влияния не было, он не входил в группу
              людей, которые могли рекомендовать и тем более принимать какие-то
              решения в отношении миграционной или какой-то иной политики в
              стране.
            </p>

            <p>
              Навальный** никогда не был каналом передачи информации от власти
              или групп вокруг власти в России и его высказывания по аспектам
              внешней политики Москвы были его личным мнением.
            </p>

            <figure class="article__figure">
              <div class="article__figure-img">
                <img src="../assets/image-9.png" alt="" />
              </div>
              <figcaption class="article__figure-caption">
                Подпись к фотографии.
              </figcaption>
            </figure>

            <p class="article__question">
              <strong>— А вообще, обсуждаются ли выборы президента России в Казахстане и Узбекистане?</strong>
            </p>

            <p>
              — В публичном пространстве Казахстана и Узбекистана президентские
              выборы в России не обсуждаются. СМИ освещает процесс подготовки к
              выборам в формате новостей. Вероятно, ближе к дате начала
              голосования интерес увеличится. Для аудитории в регионе выборы в
              России — рутинное событие, не представляющее особого интереса.
            </p>

            <!-- Пример выделенного блока-цитаты -->
            <aside class="article__quote">
              <p class="article__quote-text">
                Такой вариант для Центральной Азии — вполне допустимый. Важно,
                чтобы это в любом случае будет примером, с которым регион будет
                соотносить собственные ожидания.
              </p>
              <p class="article__quote-meta">
                — Из интервью, источник: «Стан-Центр»
              </p>
            </aside>

            <p class="article__question">
              <strong>— Что страны Центральной Азии могут ожидать от России после мартовских выборов?</strong>
            </p>

            <p>
              — Региону важна предсказуемость и последовательность России по
              отношению к внешним партнёрам. Но это скорее вопрос к системе, а
              не к конкретным персоналиям. В Казахстане, например, сейчас
              запущены внутренние политические процессы, проявляющиеся в смене
              кадров...
            </p>

            <p>
              То есть в системе управления значительно большую роль начинают
              играть институты, а не персоны. Если совсем упрощать объяснение, то
              нам важна сама политика, а не люди, которые её реализовывают.
            </p>

            <p class="article__thanks">
              <strong>— Спасибо за беседу!</strong>
            </p>

            <p class="article__author">
              Беседовала {{ article.author }}.
            </p>

            <p class="article__disclaimer">
              *Экстремистская организация, запрещена на территории Российской Федерации.<br />
              **Физическое лицо, внесённое в список террористов и экстремистов Росфинмониторинга.
            </p>
            <section class="article__related">

              <h2 class="article__related-title">
<!--                Сюжет: <RouterLink class="article__related-title-link" :to="{ name: 'tag', params: { slug: article.story } }">{{ article.story }}</RouterLink>-->
              </h2>
              <h2 class="article__related-title">
                Также по теме:
              </h2>

              <ul class="article__related-list">
                <li class="article__related-item">
                  <a href="#" class="article__related-link">Заголовок связанной новости 1</a>
                </li>
                <li class="article__related-item">
                  <a href="#" class="article__related-link">Заголовок связанной новости 2</a>
                </li>
                <li class="article__related-item">
                  <a href="#" class="article__related-link">Заголовок связанной новости 3</a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </template>

      <template #sidebar>
        <SidebarFilters />
      </template>
    </ContentWithSidebar>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ContentWithSidebar from '@/components/layout/ContentWithSidebar.vue'
import SidebarFilters from '@/components/sidebar/SidebarFilters.vue'
import ArticleContent from '@/components/articles/ArticleContent.vue'
import { useWordPressArticles, TYPE_TO_SLUG } from '@/composables/useWordPressArticles'
import articles from '@/dummydata/articles'

// Props от роутера
const props = defineProps<{
  typeSlug?: string
  id?: string | number
}>()

const slugMap: Record<string, string> = {
  "Дипломатия": "diplomatiya",
  "Угрозы": "ugrozy",
  "Энергетика": "energetika",
  "История": "istoriya",
  "Культура": "kultura",
  "Деньги": "dengi",
  "Россия": "rossiya",
  "Белоруссия": "belorussiya",
  "Казахстан": "kazakhstan",
  "Киргизия": "kyrgyziya",
  "Узбекистан": "uzbekistan",
  "Таджикистан": "tadjikistan",
  "Туркмения": "turkmeniya",
  "БРИКС": "briks",
  "Африка": "afrika",
  "Евросоюз": "evrosoyuz"
};

const route = useRoute()
const router = useRouter()
const { currentArticle, loading, error, fetchArticleByTypeAndId } = useWordPressArticles()

// Режим работы: WordPress или dummy data
const useWordPress = ref(true)

// Флаг готовности статьи к отображению
const isReady = ref(false)

// Текущая статья (из WordPress или dummy)
const article = computed(() => {
  if (useWordPress.value && currentArticle.value) {
    return currentArticle.value
  }

  // Fallback на dummy data
  const id = Number(props.id || route.params.id)
  const found = articles.find((a) => a.id === id)
  return found ?? articles[0]
})

const articleTagRouteName = computed(() => {
  const type = article.value?.type?.toLowerCase?.()
  return type ? TYPE_TO_SLUG[type] : undefined
})

const articleMetaDate = computed(() => {
  return article.value?.date || '31 июля 2025 г., 14:52'
})

// Загрузка статьи из WordPress при монтировании
onMounted(async () => {
  const typeSlug = props.typeSlug
  const id = props.id || route.params.id

  console.log('ArticlePage mounted:', { typeSlug, id, useWordPress: useWordPress.value })

  if (useWordPress.value && typeSlug && id) {
    const result = await fetchArticleByTypeAndId(typeSlug, Number(id))
    console.log({result})
    console.log({currentArticle})

    // Если статья не найдена, редирект на 404
    if (!result || error.value) {
      console.warn('Article not found, redirecting to 404:', error.value)
      await router.replace({ name: 'not-found' })
      return
    }
  }

  // Статья готова к отображению
  isReady.value = true

  // Устанавливаем заголовок вкладки
  const articleTitle = article.value?.title
  if (articleTitle) {
    document.title = `Стан-Центр — ${articleTitle}`
  }
})
</script>

<style scoped lang="scss">
p {
  margin-top: 0;
  margin-bottom: 4px;
}
.article {
  padding-block: var(--paddingXL);
  font-family: var(--font-main);
  @include container;

}

.article__content {
  color: var(--color-text);
}

/* Крупная обложка сверху */
.article__cover {
  margin-bottom: var(--paddingM);
}

.article__cover-img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  //border-radius: var(--radius-md);
  padding-top: 16px;
}

.article__cover-caption {
  margin-top: var(--paddingS);
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--color-text-muted);
}

.article__meta-row {
  margin-top: var(--paddingS);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.4;
}

.article__tag-link {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: underline;
}

.article__meta-dot {
  color: var(--color-text-muted);
}

.article__meta-date {
  color: var(--color-text-muted);
}

/* Заголовок и мета */
.article__header {
  margin-bottom: var(--paddingL);
}

.article__title {
  margin: 0 0 var(--paddingS);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
}

.article__subtitle {
  margin: 0;
  font-size: 1.25rem;
  font-style: italic;
  color: var(--color-text-muted);
  line-height: 1.4;
}

/* Основной текст */
.article__body {
  margin-top: var(--paddingL);
  display: flex;
  flex-direction: column;
  gap: var(--paddingS);
  font-size: 0.95rem;
  line-height: 1.5;
}

.article__lead {
  font-weight: 500;
}

.article__question {
  margin-top: var(--paddingXS);
}

/* Встроенная картинка */
.article__figure {
  margin: var(--paddingL) 0;
}

.article__figure-img {
  width: 100%;
  border-radius: var(--radius-md);
}

.article__figure-caption {
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* Цитата */
// Новая стилизация блока цитаты
.article__quote {
  margin: var(--paddingL) 0;
  padding: var(--paddingL);
  border-radius: var(--radius-md);
  background: rgba(144, 213, 172, 0.2); // мягкий фирменный зелёный фон
  position: relative;
  overflow: hidden;
}

.article__quote::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background-color: var(--color-primary);
}

.article__quote-text {
  margin: 0 0 8px;
  font-size: 1.05rem;
  line-height: 1.6;
  font-style: italic;
  font-weight: 600;
}

.article__quote-meta {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.article__thanks {
  margin-top: var(--paddingL);
}

.article__author {
  margin-top: var(--paddingS);
  font-weight: 500;
}

.article__disclaimer {
  margin-top: var(--paddingL);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.article__related {
  margin-top: var(--paddingXL);
  padding-top: var(--paddingM);
  border-top: 1px solid var(--color-border);
}

.article__related-title {
  margin: 0 0 var(--paddingS);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.article__related-title-link {
  color: var(--color-primary);;
  text-decoration: none;
}

.article__related-title-link:hover,
.article__related-title-link:focus-visible {
  text-decoration: none;
}

.article__related-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.article__related-item {
  margin: 0;
}

.article__related-link {
  position: relative;
  display: inline-block;
  font-size: 0.9rem;
  color: var(--color-primary);
  text-decoration: none;
  cursor: pointer;
  padding-left: 10px;
}

.article__related-link::before {
  content: "·";
  position: absolute;
  left: 0;
  top: 0;
}

.article__related-link:hover {
  text-decoration: underline;
}

/* Полноэкранный лоадер */
.article-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--paddingXL);
  font-family: var(--font-main);
}

.article-loader__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--paddingM);
}

.article-loader__spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.article-loader__text {
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