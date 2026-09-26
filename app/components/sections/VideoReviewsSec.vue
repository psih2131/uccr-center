<template>
  <section class="video-reviews">
    <div class="container">
      <h2 class="section-title video-reviews__title">Видео-отзывы наших клиентов</h2>

      <div class="video-reviews__slider-wrap">
        <button class="slider-nav video-reviews__nav video-reviews__nav--prev" type="button" aria-label="Назад" @click="swiper.prev()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>

        <ClientOnly>
          <swiper-container ref="sliderRef" class="video-reviews__slider" :init="false">
            <swiper-slide v-for="(item, index) in items" :key="index">
              <article class="video-card">
                <img class="video-card__image" :src="item.image" :alt="item.name">
                <button class="video-card__play" type="button" aria-label="Смотреть видео">
                  <span></span>
                </button>
                <div class="video-card__info">
                  <h3 class="video-card__name">{{ item.name }}</h3>
                  <p class="video-card__age">{{ item.age }}</p>
                </div>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <button class="slider-nav video-reviews__nav video-reviews__nav--next" type="button" aria-label="Вперёд" @click="swiper.next()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>
      </div>

      <div class="video-reviews__dots">
        <button
          v-for="(_, index) in items"
          :key="index"
          class="video-reviews__dot"
          :class="{ 'video-reviews__dot--active': activeIndex === index }"
          type="button"
          :aria-label="`Слайд ${index + 1}`"
          @click="goTo(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import rw1 from '~/assets/images/reviews/rw1.jpg'
import rw2 from '~/assets/images/reviews/rw2.png'
import rw3 from '~/assets/images/reviews/rw3.jpg'
import rw4 from '~/assets/images/reviews/rw4.png'
import rw5 from '~/assets/images/reviews/rw5.jpg'

const sliderRef = ref(null)
const activeIndex = ref(0)

const swiper = useSwiper(sliderRef, {
  slidesPerView: 5,
  spaceBetween: 10,
  loop: true,
  on: {
    slideChange(instance) {
      activeIndex.value = instance.realIndex
    },
  },
})

const getInstance = () => sliderRef.value?.swiper ?? sliderRef.value

const goTo = (index) => {
  const instance = getInstance()
  if (!instance) return
  if (typeof instance.slideToLoop === 'function') {
    instance.slideToLoop(index)
    return
  }
  instance.slideTo?.(index)
}

const items = [
  { name: 'Алексей Дмитриев', age: '32 года', image: rw1 },
  { name: 'Алексей Дмитриев', age: '32 года', image: rw2 },
  { name: 'Алексей Дмитриев', age: '32 года', image: rw3 },
  { name: 'Алексей Дмитриев', age: '32 года', image: rw4 },
  { name: 'Алексей Дмитриев', age: '32 года', image: rw5 },
  { name: 'Алексей Дмитриев', age: '32 года', image: rw1 },
]
</script>
