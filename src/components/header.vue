<template>
  <div class="header__container">
    <div class="header__logo">
      <RouterLink class="header__brand" :to="{name: 'home'}">
        <img class="header__logo-img" src="@/assets/stan_logo.png" alt="СТАН.Центр" />
      </RouterLink>
    </div>

    <!-- Бургер-кнопка для мобильных -->
    <button
        class="header__burger"
        :class="{ 'header__burger--open': mobileMenuOpen }"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Меню"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Навигация (десктоп) -->
    <div class="header__navs">
      <nav class="header__pages">
        <RouterLink
            :to="{ name: 'analitika' }"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': isActive('analitika') }"
        >
          Аналитика
        </RouterLink>

        <RouterLink
            :to="{ name: 'intervyu' }"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': isActive('intervyu') }"
        >
          Интервью
        </RouterLink>

        <RouterLink
            :to="{ name: 'mneniya' }"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': isActive('mneniya') }"
        >
          Мнения
        </RouterLink>

        <RouterLink
            :to="{ name: 'obzory' }"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': isActive('obzory') }"
        >
          Обзоры
        </RouterLink>
      </nav>
    </div>

    <!-- Соцсети (десктоп) -->
    <div class="header__actions" aria-label="Соцсети">
      <a
          v-for="({ label, src, alt, href, name }, index) in socialLinks"
          :key="index"
          class="header__social-link"
          :class="`header__social-link--${name}`"
          :href="href"
          :aria-label="label"
          rel="nofollow noopener"
          target="_blank"
      >
        <img class="link__image" :src="src" :alt="alt" />
      </a>
    </div>

    <!-- Мобильное меню -->
    <div class="header__mobile-menu" :class="{ 'header__mobile-menu--open': mobileMenuOpen }">
      <nav class="header__mobile-nav">
        <RouterLink
            :to="{ name: 'analitika' }"
            class="header__mobile-link"
            :class="{ 'header__mobile-link--active': isActive('analitika') }"
            @click="mobileMenuOpen = false"
        >
          Аналитика
        </RouterLink>
        <RouterLink
            :to="{ name: 'intervyu' }"
            class="header__mobile-link"
            :class="{ 'header__mobile-link--active': isActive('intervyu') }"
            @click="mobileMenuOpen = false"
        >
          Интервью
        </RouterLink>
        <RouterLink
            :to="{ name: 'mneniya' }"
            class="header__mobile-link"
            :class="{ 'header__mobile-link--active': isActive('mneniya') }"
            @click="mobileMenuOpen = false"
        >
          Мнения
        </RouterLink>
        <RouterLink
            :to="{ name: 'obzory' }"
            class="header__mobile-link"
            :class="{ 'header__mobile-link--active': isActive('obzory') }"
            @click="mobileMenuOpen = false"
        >
          Обзоры
        </RouterLink>
      </nav>

      <div class="header__mobile-social">
        <a
            v-for="({ label, src, alt, href, name }, index) in socialLinks"
            :key="index"
            class="header__social-link"
            :class="`header__social-link--${name}`"
            :href="href"
            :aria-label="label"
            rel="nofollow noopener"
            target="_blank"
        >
          <img class="link__image" :src="src" :alt="alt" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import logoTg from '@/assets/logos/telegram.svg'
import logoTt from '@/assets/logos/tiktok.svg'
import logoYt from '@/assets/logos/youtube.svg'
import logoVk from '@/assets/logos/vk.svg'
import logoOk from '@/assets/logos/odnoklassniki.svg'

const route = useRoute()
const mobileMenuOpen = ref(false)

const isActive = (name: string) => route.name === name

const navLinks = [
  { text: 'Аналитика', href: '/analytics' },
  { text: 'Интервью', href: '/interview' },
  { text: 'Мнения', href: '/opinions' },
  { text: 'Обзоры', href: '/reviews' }
]

const socialLinks = [
  { label: 'Телеграм', src: logoTg, alt: 'logo tg', href: 'https://t.me/stan_center', name: 'telegram' },
  { label: 'Тикток', src: logoTt, alt: 'logo tt', href: 'https://www.tiktok.com/@stan_center', name: 'tiktok' },
  { label: 'Ютуб', src: logoYt, alt: 'logo yt', href: 'https://youtube.com/@stan_center', name: 'youtube' },
  { label: 'Вконтакте', src: logoVk, alt: 'logo vk', href: 'https://vk.com/stan_center', name: 'vkontakte' },
  { label: 'Одноклассники', src: logoOk, alt: 'logo ok', href: 'https://ok.ru/stan.center', name: 'odnoklassniki' },
]
</script>

<style lang="scss" scoped>
a {
  color: var(--color-text);
}

.header__container {
  background: #ffffff;
  color: var(--color-text);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid var(--color-border);
  padding: var(--paddingL) var(--paddingM);
  font-size: var(--font-size-m);
  max-height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.header__container::before {
  content: '';
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  pointer-events: none;
}

.header__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
}

.header__navs {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: var(--paddingL);
  flex: 1;
  padding-left: 60px;
}

.header__nav-item {
  display: flex;
  align-items: center;
}

.header__nav-link {
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-text);
  transition: color 0.2s ease, transform 0.15s ease;

  &:hover {
    color: var(--color-primary);
    transform: translateY(-1px);
  }

  &--active {
    color: var(--color-primary);
    font-weight: 700;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-primary);
    }
  }
}


.header__pages {
  display: flex;
  align-items: center;
  gap: calc(var(--paddingXL) * 1.5);
  padding: 6px 18px;
  border-radius: 999px;
  background: rgba(144, 213, 172, 0.15);
}

.header__actions {
  display: flex;
  flex-direction: row;
  gap: var(--paddingXL);
  padding-right: 60px;
}

.header__social-link {
  color: var(--color-text);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }

  &:hover .link__image,
  &:focus-visible .link__image {
    /* возвращаем оригинальные цвета SVG */
    filter: none;
    opacity: 1;
    transform: translateY(-1px);
  }
}

.link__image {
  height: 30px;
  width: 30px;
  display: block;
  /* делаем иконку практически чёрной по умолчанию */
  filter: grayscale(1) brightness(0.25);
  opacity: 0.9;
  transition:
    filter 0.25s ease,
    opacity 0.25s ease,
    transform 0.15s ease;
}

.header__social-link--telegram .link__image {
  /* примеры — можешь настроить под нужды */
  /* filter: grayscale(1) brightness(0.3); */
}

.header__social-link--tiktok .link__image {
  /* свои стили для тиктока */
  height: 24px;
  width: 24px;
  padding-top: 2px;
}

.header__social-link--youtube .link__image {
  /* стили для ютуба */
  height: 34px;
  width: 34px;
}

.header__social-link--vkontakte .link__image {
  /* стили для вк */
  padding-top: 2px;
}

.header__social-link--odnoklassniki .link__image {
  /* стили для одноклассников */
  height: 28px;
  width: 28px;
  margin-left: -8px;
  padding-top: 2px;
}

/* ==================== Мобильные стили ==================== */

.header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  padding: 8px;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--color-text);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  &--open {
    span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
}

.header__mobile-menu {
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 1000;
  flex-direction: column;
  padding: var(--paddingXL);
  transform: translateX(100%);
  transition: transform 0.3s ease;

  &--open {
    transform: translateX(0);
  }
}

.header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--paddingM);
}

.header__mobile-link {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  padding: var(--paddingM) 0;
  border-bottom: 1px solid var(--color-border);
  transition: color 0.2s ease;

  &:hover,
  &--active {
    color: var(--color-primary);
  }

  &--active {
    font-weight: 700;
  }
}

.header__mobile-social {
  display: flex;
  gap: var(--paddingL);
  margin-top: auto;
  padding-top: var(--paddingXL);
  justify-content: center;
}

.header__logo-img {
  width: 100%;
  height: auto;
}

/* ==================== Media Queries ==================== */

@media (max-width: 1024px) {
  .header__navs {
    padding-left: var(--paddingL);
  }

  .header__actions {
    padding-right: var(--paddingL);
    gap: var(--paddingM);
  }

  .header__pages {
    gap: var(--paddingL);
  }

  .header__nav-link {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .header__container {
    padding: var(--paddingM);
    max-height: 70px;
  }

  .header__logo {
    width: 120px;
  }

  .header__navs,
  .header__actions {
    display: none;
  }

  .header__burger {
    display: flex;
  }

  .header__mobile-menu {
    display: flex;
    top: 70px;
  }
}

@media (max-width: 480px) {
  .header__container {
    padding: var(--paddingS) var(--paddingM);
    max-height: 60px;
  }

  .header__logo {
    width: 100px;
  }

  .header__mobile-menu {
    top: 60px;
    padding: var(--paddingL);
  }

  .header__mobile-link {
    font-size: 1.1rem;
    padding: var(--paddingS) 0;
  }
}
</style>