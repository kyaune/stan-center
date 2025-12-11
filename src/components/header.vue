<template>
  <div class="header__container">
    <div class="header__logo">
      <RouterLink class="header__brand" :to="{name: 'home'}">
        <img class="header__logo" src="@/assets/stan_logo.png" alt="СТАН.Центр" />
      </RouterLink>
    </div>
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
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

import logoTg from '@/assets/logos/telegram.svg'
import logoTt from '@/assets/logos/tiktok.svg'
import logoYt from '@/assets/logos/youtube.svg'
import logoVk from '@/assets/logos/vk.svg'
import logoOk from '@/assets/logos/odnoklassniki.svg'

const route = useRoute()

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
</style>