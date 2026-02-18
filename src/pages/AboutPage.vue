<template>
  <main class="about">
    <section class="about__inner">
      <h1 class="about__title">О нас</h1>
      <img src="../assets/img_about.JPG" class="about__img" alt="">
      <p class="about__paragraph">
        Центр по развитию прикладных геополитических исследований
        на евразийском пространстве «Стан» (сокращённо «Стан-Центр»)
        расположен в Калининграде — в самом, на наш взгляд, удачном месте
        на Евразийском континенте, где переплелись история и современность
        широко понимаемых Запада и Востока.
      </p>

      <p class="about__paragraph">
        Наша команда системно занимается анализом ситуации в геополитическом
        треугольнике «Европейский союз — Российская Федерация —
        Центрально-Азиатский регион». Итоги нашей деятельности мы спешим
        донести до всех граждан Большой Евразии, заинтересованных в
        общественно-политическом просвещении.
      </p>

      <section class="about__contacts">
        <h2 class="about__subtitle">Мы в социальных сетях</h2>

        <ul class="about__links">
          <li>
            Мы в
            <a
                href="https://t.me/stan_center"
                target="_blank"
                rel="noopener noreferrer"
                class="about__link"
            >
              «Телеграме»
            </a>
          </li>
          <li>
            Мы в
            <a
                href="https://ok.ru/stan.center"
                target="_blank"
                rel="noopener noreferrer"
                class="about__link"
            >
              «Одноклассниках»
            </a>
          </li>
          <li>
            Мы в
            <a
                href="https://vk.com/stan_center"
                target="_blank"
                rel="noopener noreferrer"
                class="about__link"
            >
              «Вконтакте»
            </a>
          </li>
          <li>
            Мы в
            <a
                href="https://youtube.com/@stan_center"
                target="_blank"
                rel="noopener noreferrer"
                class="about__link"
            >
              «Ютубе»
            </a>
          </li>
          <li>
            Мы в
            <a
                href="https://www.tiktok.com/@stan_center"
                target="_blank"
                rel="noopener noreferrer"
                class="about__link"
            >
              «Тиктоке»
            </a>
          </li>
        </ul>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
/* тут пока ничего не нужно */
</script>

<style scoped lang="scss">
.about {
  padding-block: var(--paddingXL);
  font-family: var(--font-main);
}

.about__img {
  max-width: 800px;
 }

.about__inner {
  @include container;
  max-width: 800px;
}

.about__title {
  margin: 0 0 var(--paddingL);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
}

.about__paragraph {
  margin: 0 0 var(--paddingM);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
}

.about__contacts {
  margin-top: var(--paddingL);
  padding-top: var(--paddingM);
  border-top: 1px solid var(--color-border);
}

.about__subtitle {
  margin: 0 0 var(--paddingS);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
}

.about__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
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