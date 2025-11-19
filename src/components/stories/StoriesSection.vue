<script setup lang="ts">
import { computed } from "vue";
import articles from "@/dummydata/articles";
import StoryCard from "./StoryCard.vue";

type Article = {
  id: number;
  title: string;
  img: string;
};

const props = defineProps<{
  items?: Article[];
}>();
//todo: переделать на реальные артиксл
// const stories = computed(() => props.items ?? articles.slice(0, 8));

const stories = computed(() => {
  const first = articles[0];

  if (!first) {
    return [];
  }

  return Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    title: first.title,
    img: first.img,
  }));
});
</script>

<template>
  <section class="stories">
    <header class="stories__header">
      <h2 class="stories__title">Сюжеты</h2>
    </header>

    <div class="stories__grid">
      <StoryCard
          v-for="story in stories"
          :key="story.id"
          :id="story.id"
          :title="story.title"
          :img="story.img"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.stories {
  font-family: var(--font-main);
}

.stories__header {
  margin-bottom: var(--paddingM);
}

.stories__title {
  margin-top: 0;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.2;
  color: var(--color-text);
}

/* сетка карточек */
.stories__grid {
  display: grid;
  gap: var(--paddingM);
  grid-template-columns: 1fr;
}

/* tablet: 2 в ряд */
@include respond($bp-tablet) {
  .stories__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* desktop: 3 в ряд, как в макете */
@include respond($bp-desktop) {
  .stories__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>