<template>
  <main class="contacts">
    <section class="contacts__inner">
      <img src="../assets/tilsit.JPG" class="contacts__img" alt="">
      <h1 class="contacts__title">Контакты</h1>

      <p class="contacts__paragraph">
        Адрес АНО «Стан-Центр»: Калининград, улица Минская, дом № 25, кабинет № 311.
      </p>

      <p class="contacts__paragraph">
        Генеральный директор АНО «Стан-Центр»:
        Выползов Андрей Александрович
      </p>
      <p class="contacts__paragraph">
        Шеф-редактор «Стан-Центра»:
        Макаров Никита Витальевич
      </p>

      <p class="contacts__paragraph">
        Телефон:
        <a class="contacts__link" href="tel:+79125777577">
          +7&nbsp;912&nbsp;577-75-77
        </a>
      </p>

      <p class="contacts__paragraph">
        Электронный адрес:
        <a class="contacts__link" href="mailto:russia@stan.center">
          russia@stan.center
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
  padding-block: var(--paddingM);
  font-family: var(--font-main);

  @include respond($bp-tablet) {
    padding-block: var(--paddingXL);
  }
}

.contacts__inner {
  @include container;
  max-width: 800px;
}

.contacts__img {
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: var(--radius-md);
  margin-bottom: var(--paddingL);
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
  margin: 0 0 var(--paddingM);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);

  @include respond($bp-tablet) {
    margin-bottom: var(--paddingL);
    font-size: 2rem;
  }
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