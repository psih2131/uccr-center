<template>
  <section class="course-hero">
    <div class="container">
      <div class="course-hero__top">
        <div class="course-hero__head">
          <p class="course-hero__crumbs">
            <NuxtLink to="/">Главная</NuxtLink>
            <span> - </span>
            <span class="course-hero__crumbs-current">{{ course.shortTitle }}</span>
          </p>

          <h1 class="course-hero__title">
            <span class="course-hero__title-row">Обучение Авиационный механик</span>
            <span class="course-hero__title-row">
              по
              <span class="course-hero__title-decor" aria-hidden="true"></span>
              криогенным системам 2
            </span>
            <span class="course-hero__title-row">
              разряда в Москве
              <span class="course-hero__title-plus" aria-hidden="true">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
                  <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
                </svg>
              </span>
            </span>
          </h1>
        </div>

        <p class="course-hero__lead">
          <b>Учебный центр</b> реализует программы профессионального обучения, повышения квалификации и профессиональной переподготовки для специалистов транспортной, производственной и технической сфер.
        </p>
      </div>

      <div class="course-hero__cards">
        <article class="course-hero__info">
          <span class="course-hero__line course-hero__line--v1"></span>
          <span class="course-hero__line course-hero__line--v2"></span>
          <span class="course-hero__line course-hero__line--v3"></span>
          <span class="course-hero__line course-hero__line--h1"></span>
          <span class="course-hero__line course-hero__line--h2"></span>
          <span class="course-hero__line course-hero__line--h3"></span>
          <span class="course-hero__line course-hero__line--h4"></span>

          <ul class="course-hero__list">
            <li v-for="item in benefits" :key="item">
              <span class="course-hero__check" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M3.5 8.5L7 12L13.5 5" stroke="#145771" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              {{ item }}
            </li>
          </ul>

          <form class="course-hero__form" @submit.prevent="sendLead">
            <input class="course-hero__input" type="tel" name="phone" placeholder="Номер телефона">
            <ButtonsBtnPill class="btn-pill--light" type="modal" title="Отправить заявку" @click="sendLead" />
            <label class="course-hero__policy">
              <span class="course-hero__policy-box"></span>
              <span>
                Отправляя форму, я соглашаюсь с <NuxtLink to="/soglashenie">Пользовательским соглашением</NuxtLink> и даю согласие на обработку персональных данных в соответствии с&nbsp;<NuxtLink to="/politika">Политикой конфиденциальности</NuxtLink>
              </span>
            </label>
          </form>
        </article>

        <article class="course-hero__photo">
          <img :src="heroImage" alt="">
          <div class="course-hero__stats">
            <div class="course-hero__stat course-hero__stat--format">
              <span class="course-hero__stat-label">
                <img src="@/assets/icons/program-book.svg" alt="" width="18" height="18">
                Формат обучения
              </span>
              <b>Дистанционно</b>
            </div>
            <div class="course-hero__stat">
              <span class="course-hero__stat-label">
                <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
                Срок обучения
              </span>
              <b>100 часов</b>
            </div>
            <div class="course-hero__stat course-hero__stat--price">
              <strong>7600р</strong>
              <span class="course-hero__stat-old">
                <s>4200р</s>
                <em>-800р</em>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import heroImage from '~/assets/images/course/course-hero.png'

defineProps({
  course: {
    type: Object,
    required: true,
  },
  direction: {
    type: Object,
    required: true,
  },
})

const store = useCounterStore()

const benefits = [
  'Работаем на основании Лицензии Министерства Образования',
  'До оплаты можете ознакомиться с учебным планом',
  'Все сведения вносим в ФИС ФРДО',
  'Рассрочка 0% на все курсы',
]

const sendLead = () => {
  store.openModal('success')
}
</script>
