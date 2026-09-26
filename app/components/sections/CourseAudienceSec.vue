<template>
  <section class="course-audience">
    <div class="container">
      <h2 class="section-title">Для кого эта программа?</h2>

      <div class="course-audience__slider-wrap">
        <button class="slider-nav" type="button" aria-label="Назад" @click="swiper.prev()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 5L8 12l7 7" stroke="#145771" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <ClientOnly>
          <swiper-container ref="sliderRef" class="course-audience__slider" :init="false">
            <swiper-slide v-for="(item, index) in items" :key="item.title">
              <article class="course-audience__card">
                <img :src="item.photo" :alt="item.title">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <p>{{ item.title }}</p>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <button class="slider-nav" type="button" aria-label="Вперёд" @click="swiper.next()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="#145771" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import tm1 from '~/assets/images/team/tm1.jpg'
import tm2 from '~/assets/images/team/tm2.jpg'
import tm3 from '~/assets/images/team/tm3.jpg'
import tm4 from '~/assets/images/team/tm4.jpg'
import tm5 from '~/assets/images/team/tm5.jpg'

const sliderRef = ref(null)
const swiper = useSwiper(sliderRef, {
  slidesPerView: 5,
  spaceBetween: 20,
})

const photos = [tm1, tm2, tm3, tm4, tm5]

const items = [
  'Пилотам частных самолетов',
  'Техникам аэропортов',
  'Инженерам АТБ',
  'Слушателям без опыта',
  'Специалистам по обслуживанию',
  'Механикам 2 разряда',
].map((title, index) => ({
  title,
  photo: photos[index % photos.length],
}))
</script>
