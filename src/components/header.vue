<template>
  <div class="header__container">
    <div class="header__logo">
      <a class="header__brand" href="/">
        <img class="header__logo" src="" alt="СТАН.Центр" />
      </a>
    </div>
    <div class="header__navs">
    <nav class="header__pages" aria-label="Основная навигация">
      <div v-for="({ text, href }, index) in navLinks" :key="index" class="header__nav-item">
        <a
            class="header__nav-link"
            :href="href"
        >
          {{ text }}
        </a>
      </div>
    </nav>
    </div>
    <div class="header__actions" aria-label="Соцсети">
      <a
          v-for="({ label, src, alt, href }, index) in socialLinks"
          :key="index"
          class="header__social-link"
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
import logoTg from '@/assets/logos/logo_tg_1.png'
import logoTt from '@/assets/logos/logo_tt_1.png'
import logoYt from '@/assets/logos/logo_yt_1.png'
import logoVk from '@/assets/logos/logo_vk_1.png'
import logoOk from '@/assets/logos/logo_ok_1.png'

const navLinks = [
  { text: 'Аналитика', href: '/analytics' },
  { text: 'Интервью', href: '/interview' },
  { text: 'Мнения', href: '/opinions' },
  { text: 'Обзоры', href: '/reviews' }
]

const socialLinks = [
  { label: 'Телеграм', src: logoTg, alt: 'logo tg', href: 'https://t.me/stan_center' },
  { label: 'Тикток', src: logoTt, alt: 'logo tt', href: 'https://www.tiktok.com/@stan_center' },
  { label: 'Ютуб', src: logoYt, alt: 'logo yt', href: 'https://youtube.com/@stan_center' },
  { label: 'Вконтакте', src: logoVk, alt: 'logo vk', href: 'https://vk.com/stan_center' },
  { label: 'Одноклассники', src: logoOk, alt: 'logo ok', href: 'https://ok.ru/stan.center' }
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
}

.header__social-link {
  color: var(--color-text);

  &:hover {
    color: var(--color-primary); // 👈 станет фирменно зелёной
  }
}

.link__image {
  height: 36px;
  width: 36px;
  display: block;
}

</style>