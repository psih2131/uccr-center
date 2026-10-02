<template>
  <section class="course-hero">
    <div class="container">
      <div class="course-hero__top">
        <div class="course-hero__head">
          <p class="course-hero__crumbs">
            <NuxtLink to="/">Главная</NuxtLink>
            <span> - </span>
            <span class="course-hero__crumbs-current">{{ course.title }}</span>
          </p>

          <h1 class="course-hero__title">
            <span class="course-hero__title-row">
              <span v-html="formatTitle(course.H1_title || course.title)"></span>
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
                Отправляя форму, я соглашаюсь с <NuxtLink to="/docs/polzovatelskoe-soglashenie">Пользовательским соглашением</NuxtLink> и даю согласие на обработку персональных данных в соответствии с&nbsp;<NuxtLink to="/docs/politika-konfidencialnosti">Политикой конфиденциальности</NuxtLink>
              </span>
            </label>
          </form>
        </article>

        <article class="course-hero__photo">
          <img :src="previewUrl" :alt="course.page_preview?.alternativeText || course.title || ''">
          <div class="course-hero__stats">
            <div class="course-hero__stat course-hero__stat--format">
              <span class="course-hero__stat-label">
                <img src="@/assets/icons/program-book.svg" alt="" width="18" height="18">
                Формат обучения
              </span>
              <b>{{ course.form_learning || 'Дистанционно' }}</b>
            </div>
            <div class="course-hero__stat">
              <span class="course-hero__stat-label">
                <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
                Срок обучения
              </span>
              <b>{{ durationLabel }}</b>
            </div>
            <div v-if="course.default_price != null" class="course-hero__stat course-hero__stat--price">
              <strong>{{ course.default_price }}р</strong>
              <span v-if="hasOldPrice" class="course-hero__stat-old">
                <s>{{ course.old_price_rub }}р</s>
                <em>-{{ priceDiff }}р</em>
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

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
  direction: {
    type: Object,
    default: null,
  },
})

const config = useRuntimeConfig()
const store = useCounterStore()

const benefits = [
  'Работаем на основании Лицензии Министерства Образования',
  'До оплаты можете ознакомиться с учебным планом',
  'Все сведения вносим в ФИС ФРДО',
  'Рассрочка 0% на все курсы',
]

function formatTitle(title) {
  return String(title || '').replaceAll(
    '{{}}',
    '<span class="course-hero__title-decor" aria-hidden="true"></span>',
  )
}

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

const previewUrl = computed(() => mediaUrl(props.course.page_preview) || heroImage)

const durationLabel = computed(() => {
  const time = props.course.time
  if (!time) return '100 часов'
  return /час/i.test(String(time)) ? time : `${time} часов`
})

const hasOldPrice = computed(() => {
  return props.course.old_price_rub != null && props.course.default_price != null
})

const priceDiff = computed(() => {
  if (!hasOldPrice.value) return 0
  return Math.abs(props.course.old_price_rub - props.course.default_price)
})

const sendLead = () => {
  store.openModal('success')
}
</script>
