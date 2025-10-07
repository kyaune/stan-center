<template>
  <div class="header__container">
    <div class="header__logo">
      <a class="header__brand" href="/">
        <img class="header__logo" src="" alt="СТАН.Центр" />
      </a>
    </div>
    <nav class="header__pages"  aria-label="Основная навигация">
        <div class="header__nav-item">
          <a class="header__nav-link header__nav-link--active" href="/analytics">Аналитика</a>
        </div>
        <div class="header__nav-item">
          <a class="header__nav-link" href="/interview">Интервью</a>
        </div>
        <div class="header__nav-item">
          <a class="header__nav-link" href="/opinions">Мнения</a>
        </div>
        <div class="header__nav-item">
          <a class="header__nav-link" href="/reviews">Обзоры</a>
        </div>
    </nav>
    <div class="header__actions" aria-label="Соцсети">
        <a class="header__social-link" href="#" aria-label="Телеграм">
          <img class="link__image" src="@/assets/logos/logo_tg.png" alt="logo tg" />
        </a>
        <a class="header__social-link" href="#" aria-label="Тикток">
          <img class="link__image" src="@/assets/logos/logo_tt.png" alt="logo tt" />
        </a>
        <a class="header__social-link" href="#" aria-label="Ютуб">
          <img class="link__image" src="@/assets/logos/logo_yt.png" alt="logo yt" />
        </a>
        <a class="header__social-link" href="#" aria-label="Вконтакте">
          <img class="link__image" src="@/assets/logos/logo_vk.png" alt="logo vk" />
        </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
a {
  color: var(--font-color-main);
}

.header__container {
  background: var(--color-primary);
  color: var(--font-color-main);
  padding: var(--paddingL) var(--paddingM);
  max-height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header__logo {

}

.header__pages {
  display: flex;
}

.link__image {
  height: 24px;
  width: 24px;
}
</style>
<script setup lang="ts">
</script>