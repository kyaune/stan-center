<script setup lang="ts">
defineProps<{
  id: number
  title: string
  img: string
}>()
</script>

<template>
  <RouterLink
      class="story-card"
      :to="{ name: 'article', params: { id } }"
  >
  <article class="story-card">
    <div class="story-card__image-wrapper">
      <img :src="img" :alt="title" class="story-card__image" />

      <div class="story-card__gradient" />

      <div class="story-card__content">
        <h3 class="story-card__title">
          {{ title }}
        </h3>
      </div>
    </div>
  </article>
  </RouterLink>
</template>

<style scoped lang="scss">
.story-card {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #000;
}

.story-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

.story-card__image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5; // стабильная высота карточки
}

.story-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* зелёно-тёмный градиент как в макете */
.story-card__gradient {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55%;
  background: linear-gradient(
    to top,
    rgba(0, 99, 46, 0.95) 0%,
    rgba(0, 99, 46, 0.85) 40%,
    rgba(0, 99, 46, 0.0) 100%
  );
}

.story-card__content {
  position: absolute;
  left: var(--paddingM);
  right: var(--paddingM);
  bottom: var(--paddingM);
}

.story-card__title {
  margin: 0;
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.3;
  color: var(--font-color-main);
}
</style>