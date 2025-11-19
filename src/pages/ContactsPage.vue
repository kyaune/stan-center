<template>
  <main class="contacts">
    <section class="contacts__inner">
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
        <a class="contacts__link" href="tel:+79114752102">
          +7&nbsp;911&nbsp;475-21-02
        </a>
      </p>

      <p class="contacts__paragraph">
        Электронный адрес:
        <a class="contacts__link" href="mailto:vypolzov@mail.ru">
          vypolzov@mail.ru
        </a>
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
/* логика пока не нужна */
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