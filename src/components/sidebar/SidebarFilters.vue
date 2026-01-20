<script setup lang="ts">
import dummyimg from '@/assets/dummyimg.jpg';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
const countries = [
  "Россия",
  "Белоруссия",
  "Казахстан",
  "Киргизия",
  "Узбекистан",
  "Таджикистан",
  "Туркмения",
  "БРИКС",
  "Африка",
  "Евросоюз",
];

const countriesRows = computed(() => Math.ceil(countries.length / 2));

const topics = ["Дипломатия", "Угрозы", "Энергетика", "История", "Культура", "Деньги"];

const slugMap: Record<string, string> = {
  "Дипломатия": "diplomatiya",
  "Угрозы": "ugrozy",
  "Энергетика": "energetika",
  "История": "istoriya",
  "Культура": "kultura",
  "Деньги": "dengi",

  // страны
  "Россия": "rossiya",
  "Белоруссия": "belorussiya",
  "Казахстан": "kazakhstan",
  "Киргизия": "kyrgyziya",
  "Узбекистан": "uzbekistan",
  "Таджикистан": "tadjikistan",
  "Туркмения": "turkmeniya",
  "БРИКС": "briks",
  "Африка": "afrika",
  "Евросоюз": "evrosoyuz",
};

type Expert = {
  id: number;
  name: string;
  role: string;
  avatar: string;
};

const experts: Expert[] = [
  { id: 1, name: "Имя Фамилия", role: "Должность", avatar: dummyimg },
  { id: 2, name: "Имя Фамилия", role: "Должность", avatar: dummyimg },
  { id: 3, name: "Имя Фамилия", role: "Должность", avatar: dummyimg },
];

const mainQuote = {
  text: "«Центральной Азии важна последовательная и предсказуемая Россия»",
  author: "Имя Фамилия, должность / источник",
};
</script>

<template>
  <aside class="sidebar">
    <!-- Страны -->
    <section class="sidebar-block sidebar-block--countries">
      <h3 class="sidebar-block__title">Страны</h3>
      <ul class="sidebar-countries" :style="{ '--countries-rows': countriesRows }">
        <li
          v-for="country in countries"
          :key="country"
          class="sidebar-countries__item"
        >
          <RouterLink
            :to="{ name: 'tag', params: { slug: slugMap[country] } }"
            class="sidebar-link"
          >
            {{ country }}
          </RouterLink>
        </li>
      </ul>
    </section>

    <!-- Темы -->
    <section class="sidebar-block sidebar-block--topics">
      <h3 class="sidebar-block__title">Темы</h3>
      <ul class="sidebar-topics">
        <li
          v-for="topic in topics"
          :key="topic"
          class="sidebar-topics__item"
        >
          <RouterLink
            :to="{ name: 'tag', params: { slug: slugMap[topic] } }"
            class="sidebar-chip"
          >
            {{ topic }}
          </RouterLink>
        </li>
      </ul>
    </section>

    <!-- Эксперты -->
    <section class="sidebar-block sidebar-block--experts">
      <h3 class="sidebar-block__title">Эксперты</h3>

      <div class="sidebar-experts">
        <article
          v-for="expert in experts"
          :key="expert.id"
          class="sidebar-expert"
        >
          <img
            :src="expert.avatar"
            :alt="`Фото эксперта ${expert.name}`"
            class="sidebar-expert__avatar"
          />

          <div class="sidebar-expert__body">
            <h4 class="sidebar-expert__name">
              {{ expert.name }}
            </h4>
            <p class="sidebar-expert__role">
              {{ expert.role }}
            </p>
          </div>
        </article>
      </div>

      <RouterLink :to="{ name: 'experti' }" class="sidebar-button">
        Все эксперты
      </RouterLink>
    </section>

    <!-- Цитаты -->
    <section class="sidebar-block sidebar-block--quotes">
      <h3 class="sidebar-block__title">Цитаты</h3>
      <div class="sidebar-quote">
        <img
          :src="dummyimg"
          alt="Фото к цитате"
          class="sidebar-quote__image"
        />
        <div class="sidebar-quote__text-block">
          <p class="sidebar-quote__text">
            {{ mainQuote.text }}
          </p>
        </div>
        <p class="sidebar-quote__meta">
          {{ mainQuote.author }}
        </p>
      </div>

      <RouterLink :to="{ name: 'citati' }" class="sidebar-button">
        Все цитаты
      </RouterLink>
    </section>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  font-family: var(--font-main);
  display: flex;
  flex-direction: column;
  gap: var(--paddingM);
}

/* общий блок сайдбара с зелёной вертикальной полосой слева */
.sidebar-block {
  position: relative;
  background: #ffffff;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  padding: var(--paddingL);
  padding-left: calc(var(--paddingL) + 16px);
}

.sidebar-block::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: var(--radius-md) 0 0 var(--radius-md);
  background-color: var(--color-primary);
}

.sidebar-block__title {
  margin: 0 0 var(--paddingM);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

/* ======================== Страны ======================== */

.sidebar-countries {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(var(--countries-rows), auto);
  grid-auto-flow: column;
  row-gap: 8px;
  column-gap: 32px;
}

.sidebar-countries__item {
  margin: 0;
}

.sidebar-link {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  text-align: left;
  color: var(--color-primary);
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform 0.15s ease,
    text-decoration-color 0.2s ease;
}

.sidebar-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
  transform: translateY(-1px);
}

/* ======================== Темы ======================== */

.sidebar-topics {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--paddingXL);
}

.sidebar-topics__item {
  margin: 0;
}

.sidebar-chip {
  border-radius: 999px;
  padding: 8px 18px;
  border: 2px solid var(--color-primary);
  background: #ffffff;
  font-size: 0.9rem;
  line-height: 1.2;
  color: var(--color-primary);
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;
}

.sidebar-chip:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
  transform: translateY(-1px);
}

/* ======================== Эксперты ======================== */

.sidebar-experts {
  display: flex;
  flex-direction: column;
  gap: var(--paddingM);
}

.sidebar-expert {
  display: flex;
  align-items: flex-start;
  gap: var(--paddingM);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

//.sidebar-expert:hover {
//  background-color: #f6f7f8;
//  border-radius: var(--radius-md);
//  box-shadow: var(--shadow-soft);
//  transform: translateY(-1px);
//}

.sidebar-expert__avatar {
  flex-shrink: 0;
  width: 68px;
  height: 68px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  object-fit: cover;
  object-position: center;
  display: block;
  background-color: #eef2f6;
}

.sidebar-expert__name {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.sidebar-expert__role {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* общая зелёная кнопка */
.sidebar-button {
  margin-top: var(--paddingL);
  display: block;
  border: none;
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.sidebar-button:hover {
  background-color: var(--color-primary-light);
  box-shadow: var(--shadow-soft);
  transform: translateY(-1px);
}

/* ======================== Цитаты ======================== */

.sidebar-quote {
  display: flex;
  flex-direction: column;
  gap: var(--paddingM);
  transition:
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

//.sidebar-quote:hover {
//  box-shadow: var(--shadow-soft);
//  transform: translateY(-1px);
//}

.sidebar-quote__image {
  width: 100%;
  height: 180px;
  border-radius: var(--radius-md);
  display: block;
  object-fit: cover;
  object-position: center;
  background-color: #dde5ef;
}

.sidebar-quote__text-block {
  position: relative;
  border-radius: var(--radius-md);
  padding: var(--paddingM);
  background: rgba(144, 213, 172, 0.18); // мягкий фон в фирменных тонах
  overflow: hidden;
}

.sidebar-quote__text-block::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(
    180deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
}

.sidebar-quote__text {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--color-text);
}

.sidebar-quote__meta {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
</style>