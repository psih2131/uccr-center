<template>
  <section class="direction-hero">
    <div class="container">
      <div class="direction-hero__top">
        <div class="direction-hero__head">
          <p class="direction-hero__crumbs">
            <NuxtLink to="/">Главная</NuxtLink>
            <span> - </span>
            <NuxtLink v-if="catalog" :to="`/directions/${direction.slug}`">{{ direction.menuTitle }}</NuxtLink>
            <span v-else class="direction-hero__crumbs-current">{{ direction.menuTitle }}</span>
            <template v-if="catalog">
              <span> - </span>
              <span class="direction-hero__crumbs-current">Каталог</span>
            </template>
          </p>
          <h1 class="direction-hero__title">
            <span class="direction-hero__title-row">
              {{ firstWord }}
              <span class="direction-hero__title-decor" aria-hidden="true"></span>
              {{ firstRest }}
            </span>
            <span v-if="secondLine" class="direction-hero__title-row">
              {{ secondLine }}
              <span class="direction-hero__title-plus" aria-hidden="true">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
                  <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
                </svg>
              </span>
            </span>
          </h1>
        </div>

        <p class="direction-hero__lead">
          Обучение для новичков без опыта и действующих рабочих, которым нужен официальный документ, с учетом перечня профессий <b>2026</b> года. <b>Более 7000 программ рабочих специальностей</b>: присвоение разряда по ЕТКС, практика на оборудовании, квалификационный экзамен и помощь с трудоустройством. Свидетельство и удостоверение установленного образца с внесением в ФИС ФРДО.
        </p>
      </div>

      <div class="direction-hero__cards">
        <article class="direction-hero__card direction-hero__card--info">
          <span class="direction-hero__line direction-hero__line--v1"></span>
          <span class="direction-hero__line direction-hero__line--v2"></span>
          <span class="direction-hero__line direction-hero__line--h1"></span>
          <span class="direction-hero__line direction-hero__line--h2"></span>
          <span class="direction-hero__line direction-hero__line--h3"></span>
          <span class="direction-hero__line direction-hero__line--h4"></span>

          <ul class="direction-hero__list">
            <li v-for="item in benefits" :key="item">
              <span class="direction-hero__check" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M3.5 8.5L7 12L13.5 5" stroke="#145771" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              {{ item }}
            </li>
          </ul>
        </article>

        <article class="direction-hero__card direction-hero__card--photo">
          <img :src="heroImage1" alt="">
        </article>

        <article class="direction-hero__card direction-hero__card--photo">
          <img :src="heroImage2" alt="">
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import heroImage1 from '~/assets/images/hero-img-1.jpg'
import heroImage2 from '~/assets/images/hero-img-2.jpg'

const props = defineProps({
  direction: {
    type: Object,
    required: true,
  },
  catalog: {
    type: Boolean,
    default: false,
  },
})

const benefits = [
  'Работаем на основании Лицензии Мин. Образования',
  'До оплаты можете ознакомиться с учебным планом',
  'Все сведения вносим в ФИС ФРДО',
  'Рассрочка 0% на все курсы',
]

const titleLines = computed(() => props.direction.title.split('\n'))
const firstLine = computed(() => titleLines.value[0] ?? '')
const secondLine = computed(() => titleLines.value[1] ?? '')
const firstWord = computed(() => firstLine.value.split(' ')[0] ?? '')
const firstRest = computed(() => firstLine.value.split(' ').slice(1).join(' '))
</script>
