<template>
  <section class="direction-hero">
    <div class="container">
      <div class="direction-hero__top">
        <div class="direction-hero__head">
          <p class="direction-hero__crumbs">
            <NuxtLink to="/">Главная</NuxtLink>
            <span> - </span>
            <NuxtLink v-if="catalog" :to="directionUrl(direction.slug)">{{ direction.menuTitle || direction.title }}</NuxtLink>
            <span v-else class="direction-hero__crumbs-current">{{ direction.menuTitle || direction.title }}</span>
            <template v-if="catalog">
              <span> - </span>
              <span class="direction-hero__crumbs-current">Каталог</span>
            </template>
          </p>
          <h1 class="direction-hero__title">
            <span class="direction-hero__title-row">
              <span v-html="formatTitle(hero?.section_title || direction.title)"></span>
              <span class="direction-hero__title-plus" aria-hidden="true">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
                  <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
                </svg>
              </span>
            </span>
          </h1>
        </div>

        <p v-if="hero?.description" class="direction-hero__lead" v-html="hero.description"></p>
        <p v-else class="direction-hero__lead">
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
            <li v-for="item in (hero?.advantages?.length ? hero.advantages : fallbackBenefits)" :key="item.id || item.text">
              <span class="direction-hero__check" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M3.5 8.5L7 12L13.5 5" stroke="#145771" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              {{ item.text }}
            </li>
          </ul>
        </article>

        <article class="direction-hero__card direction-hero__card--photo">
          <img :src="mediaUrl(hero?.img_1) || heroImage1" :alt="hero?.img_1?.alternativeText || ''">
        </article>

        <article class="direction-hero__card direction-hero__card--photo">
          <img :src="mediaUrl(hero?.img_2) || heroImage2" :alt="hero?.img_2?.[0]?.alternativeText || ''">
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
  hero: {
    type: Object,
    default: null,
  },
  catalog: {
    type: Boolean,
    default: false,
  },
})

const config = useRuntimeConfig()
const { directionUrl } = useCity()

const fallbackBenefits = [
  { text: 'Работаем на основании Лицензии Мин. Образования' },
  { text: 'До оплаты можете ознакомиться с учебным планом' },
  { text: 'Все сведения вносим в ФИС ФРДО' },
  { text: 'Рассрочка 0% на все курсы' },
]

function formatTitle(title) {
  return String(title || '').replaceAll(
    '{{}}',
    '<span class="direction-hero__title-decor" aria-hidden="true"></span>',
  )
}

function mediaUrl(file) {
  const image = Array.isArray(file) ? file[0] : file
  if (!image?.url) return ''
  if (image.url.startsWith('http')) return image.url
  return `${config.public.strapiUrl}${image.url}`
}
</script>
