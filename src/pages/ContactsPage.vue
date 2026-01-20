<template>
  <main class="contacts">
    <section class="contacts__inner">
      <img src="../assets/tilsit.jpg" class="about__img" alt="">
      <h1 class="contacts__title">Контакты</h1>

      <p class="contacts__paragraph">
        Адрес АНО «Стан-Центр»: Калининград, улица Минская, дом № 25,
        кабинет № 311.
      </p>

      <p class="contacts__paragraph">
        Генеральный директор АНО «Стан-Центр»:
        Выползов Андрей Александрович
      </p>

      <p class="contacts__paragraph">
        Телефон:
        <a class="contacts__link" href="tel:+79125777577">
          +7&nbsp;912&nbsp;577-75-77
        </a>
      </p>

      <p class="contacts__paragraph">
        Электронный адрес:
        <a class="contacts__link" href="mailto:vypolzov@mail.ru">
          vypolzov@mail.ru
        </a>
      </p>
      <div class="contacts__map">
        <YandexMap />
      </div>
    </section>
  </main>
</template>
<script setup>
import YandexMap from "@/components/YandexMap.vue"
</script>

<style scoped lang="scss">
.contacts {
  padding-block: var(--paddingXL);
  font-family: var(--font-main);
}

.contacts__inner {
  @include container;
  max-width: 800px;
}

.about__img {
  max-width: 800px;
}

.contacts__map {
  margin-top: var(--paddingXL);
  width: 100%;

  iframe {
    border: none;
    width: 100%;
    height: 400px;
    border-radius: var(--radiusM);
  }
}

.contacts__title {
  margin: 0 0 var(--paddingL);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
}

.contacts__paragraph {
  margin: 0 0 var(--paddingM);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
}

.contacts__link {
  color: var(--color-primary);
  text-decoration: none;
}

.contacts__link:hover {
  text-decoration: underline;
}
</style>