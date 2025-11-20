<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__left">
        © {{ currentYear }} «Стан-Центр»
      </div>

      <nav class="site-footer__nav" aria-label="Навигация по сайту">
        <RouterLink :to="{ name: 'o-nas' }" class="site-footer__link">
          О нас
        </RouterLink>
        <span class="site-footer__divider">|</span>
        <RouterLink :to="{ name: 'contacti' }" class="site-footer__link">
          Контакты
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped lang="scss">
.site-footer {
  height: 80px;
  font-family: var(--font-main);
}

/* чёрный прямоугольник внутри контейнера, как в макете */
.site-footer__inner {
  height: 80px;
  background-color: var(--color-black);
  color: var(--font-color-main);
  padding: 0 var(--paddingL);
  display: flex;
  align-items: center;
  gap: var(--paddingM);
  font-size: 0.85rem;
}

/* «© 2025 «Стан-Центр»» слева, без переноса */
.site-footer__left {
  white-space: nowrap;
}

/* «О нас | Контакты» */
.site-footer__nav {
  display: flex;
  align-items: center;
  gap: var(--paddingXS);
}

.site-footer__link {
  color: var(--font-color-main);
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.site-footer__link:hover {
  opacity: 0.8;
}

.site-footer__divider {
  opacity: 0.5;
}
</style>