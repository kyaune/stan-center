<script setup lang="ts">
const videoId = "NZIwXnyY3eQ";

const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
</script>

<template>
  <section class="youtube">
    <div class="youtube__inner">
      <header class="youtube__header">
        <h2 class="youtube__title">Мы на YouTube</h2>
        <p class="youtube__subtitle">
          Подписывайтесь
          <a
              href="https://youtube.com/@stan_center"
              target="_blank"
              rel="noopener noreferrer"
              class="about__link"
          >
            на наш канал
          </a>
          и смотрите аналитические видео и интервью.
        </p>

      </header>

      <div class="youtube__video-wrapper">
        <iframe
            class="youtube__iframe"
            :src="youtubeUrl"
            title="Видео Стан-Центр на YouTube"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.youtube {
  font-family: var(--font-main);
}

.youtube__inner {
  width: 70%;
}

.youtube__header {
  margin-bottom: var(--paddingM);
}

.youtube__title {
  margin: 0 0 4px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.youtube__subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text);
}

/* обёртка для 16:9 */
.youtube__video-wrapper {
  position: relative;
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  background: #000;
  aspect-ratio: 16 / 9;

  @include respond($bp-tablet) {
    aspect-ratio: 16 / 9;
  }
}

.youtube__iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.about__link {
  font-size: 0.95rem;
  color: var(--color-primary);
  text-decoration: none;
  cursor: pointer;
}

.about__link:hover {
  text-decoration: underline;
}
</style>