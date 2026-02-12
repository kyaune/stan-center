<script setup lang="ts">
import {computed, watch} from "vue";
import stories from "@/dummydata/stories";
import StoryCard from "./StoryCard.vue";
import { useWordPressCategories } from "@/composables/useWordPressCategories"


type StoryItem = {
  id: number;
  story: string;
  img: string;
};

const props = defineProps<{
  items?: StoryItem[];
}>();

const { categories, loading } = useWordPressCategories()
</script>

<template>
  <section class="stories">
    <header class="stories__header">
      <h2 class="stories__title">Сюжеты</h2>
    </header>

    <div class="stories__grid">
      <StoryCard
          v-for="category in categories"
          :key="category.id"
          :id="category.id"
          :story="category.name"
          :img="category.image"
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
  font-size: 2rem;
  line-height: 1.2;
  color: var(--color-text);
  text-wrap: balance;
  white-space: normal;
  overflow-wrap: anywhere;
  hyphens: auto;
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