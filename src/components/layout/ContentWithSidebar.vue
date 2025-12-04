<template>
  <section class="content-section">
    <div class="content-section__inner">
      <div class="content-section__main">
        <slot name="content" />
      </div>

      <aside class="content-section__sidebar">
        <slot name="sidebar" />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
/* пока без пропсов, чистая обёртка */
</script>

<style scoped lang="scss">
.content-section {
  margin-top: -20px;
  padding-block: var(--paddingXL);
  font-family: var(--font-main);
}

.content-section__inner {
  display: grid;
  gap: var(--paddingL);
  align-items: flex-start;
}

/* mobile: main сверху, sidebar снизу */
.content-section__main {
  min-width: 0;
}

.content-section__sidebar {
  min-width: 0;
}

/* desktop: две колонки — основная + узкий сайдбар */
@include respond($bp-desktop) {
  .content-section__inner {
    grid-template-columns: minmax(0, 3fr) minmax(260px, 1fr);
    align-items: flex-start;
  }
}
</style>