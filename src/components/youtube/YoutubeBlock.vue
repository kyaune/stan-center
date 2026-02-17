<script setup lang="ts">
import { computed } from "vue";
import { useWordPressYoutubeLink } from "@/composables/useWordPressYoutubeLink";

const channelUrl = "https://www.youtube.com/@stan_center";

const { videoUrl, loading } = useWordPressYoutubeLink();

/**
 * Извлекает video ID из YouTube-ссылки любого формата:
 * https://www.youtube.com/watch?v=XXXX
 * https://youtu.be/XXXX
 * https://www.youtube.com/embed/XXXX
 */
function extractVideoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] || null;
}

const embedUrl = computed(() => {
  const id = extractVideoId(videoUrl.value);
  return id ? `https://www.youtube.com/embed/${id}` : null;
});
</script>

<template>
  <section class="youtube">
    <div class="youtube__inner">
      <header class="youtube__header">
        <h2 class="youtube__title">Видеотека</h2>
      </header>

      <p v-if="loading" class="youtube__loading">Загрузка видео...</p>

      <div v-else-if="embedUrl" class="youtube__video-wrapper">
        <iframe
            class="youtube__iframe"
            :src="embedUrl"
            title="Видео Стан-Центр на YouTube"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        />
      </div>

      <a
        :href="channelUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="youtube__channel-button"
      >
        Все видео на YouTube
      </a>
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
  font-size: 2rem;
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

.youtube__loading {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  padding: var(--paddingXL) 0;
}

.youtube__channel-button {
  margin-top: var(--paddingL);
  display: inline-block;
  border: none;
  border-radius: var(--radius-sm);
  padding: 12px 24px;
  background-color: var(--color-primary);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.youtube__channel-button:hover {
  background-color: var(--color-primary-light);
  box-shadow: var(--shadow-soft);
  transform: translateY(-1px);
}
</style>