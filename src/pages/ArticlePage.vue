<template>
  <main class="article">
    <ContentWithSidebar>
      <template #content>
        <article class="article__content">
          <!-- Крупная обложка -->
          <div class="article__cover">
            <img
              :src="article.img"
              :alt="article.title"
              class="article__cover-img"
            />

            <p class="article__cover-caption">
              Шавкат Мирзиёев и Владимир Путин в Кремле. Иллюстрация: Kremlin.ru
            </p>

            <div class="article__meta-row">
              <button type="button" class="article__tag-link">
                {{ article.tag }}
              </button>
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
          </header>

          <!-- Текст статьи (захардкоженный макет) -->
          <div class="article__body">
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

            <!-- Встроенная картинка + подпись (мок) -->
<!--            <figure class="article__figure">-->
<!--              <div class="article__figure-img">-->
<!--                <img src="../assets/image-9.png" alt="" />-->
<!--              </div>-->
<!--              <figcaption class="article__figure-caption">-->
<!--                Подпись к фотографии. Здесь будет реальное фото.-->
<!--              </figcaption>-->
<!--            </figure>-->

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
                Сюжет: Центральная Азия
              </h2>
              <ul class="article__related-list">
                <li class="article__related-item">
                  <a href="#" class="article__related-link">Новость по теме 1</a>
                </li>
                <li class="article__related-item">
                  <a href="#" class="article__related-link">Аналитика по теме 2</a>
                </li>
                <li class="article__related-item">
                  <a href="#" class="article__related-link">Интервью по теме 3</a>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ContentWithSidebar from '@/components/layout/ContentWithSidebar.vue'
import SidebarFilters from '@/components/sidebar/SidebarFilters.vue'
import articles from '@/dummydata/articles'

const route = useRoute()

const article = computed(() => {
  const id = Number(route.params.id)
  const found = articles.find((a) => a.id === id)
  return found ?? articles[0]
})

const articleMetaDate = '31 июля 2025 г., 14:52'
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
  object-fit: cover;
  border-radius: var(--radius-md);
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
  font-size: 0.95rem;
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
  height: 260px;
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
</style>