<template>
  <section class="course-audience">
    <div class="container">
      <h2 class="section-title course-audience__title">Для кого эта программа?</h2>

      <div class="course-audience__slider-wrap">
        <button
          class="slider-nav course-audience__nav course-audience__nav--prev"
          type="button"
          aria-label="Назад"
          @click="swiper.prev()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>

        <ClientOnly>
          <swiper-container ref="sliderRef" class="course-audience__slider" :init="false">
            <swiper-slide v-for="(item, index) in items" :key="`${item.title}-${index}`">
              <article class="course-audience__card">
                <div class="course-audience__photo">
                  <img :src="item.photo" :alt="item.title">
                </div>
                <span class="course-audience__num">{{ String(index + 1).padStart(2, '0') }}</span>
                <p class="course-audience__caption">{{ item.title }}</p>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <button
          class="slider-nav course-audience__nav course-audience__nav--next"
          type="button"
          aria-label="Вперёд"
          @click="swiper.next()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import photo1 from '~/assets/images/for-who/x1.jpg'
import photo2 from '~/assets/images/for-who/x2.jpg'
import photo3 from '~/assets/images/for-who/x3.jpg'
import photo4 from '~/assets/images/for-who/x4.jpg'
import photo5 from '~/assets/images/for-who/x5.png'
import photo6 from '~/assets/images/for-who/x6.jpg'

const sliderRef = ref(null)

const swiper = useSwiper(sliderRef, {
  slidesPerView: 6,
  spaceBetween: 10,
  loop: true,
})

const items = [
  { title: 'Пилотам частных самолетов', photo: photo1 },
  { title: 'Техникам аэропортов', photo: photo2 },
  { title: 'Инженерам АТБ', photo: photo3 },
  { title: 'Слушателям без опыта', photo: photo4 },
  { title: 'Специалистам по обслуживанию', photo: photo5 },
  { title: 'Механикам 2 разряда', photo: photo6 },
  { title: 'Кандидатам на повышение', photo: photo1 },
  { title: 'Сотрудникам авиакомпаний', photo: photo3 },
]
</script>
