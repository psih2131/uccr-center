<template>
  <section class="reviews">
    <div class="container">
      <h2 class="section-title reviews__title">Отзывы и кейсы</h2>

      <div class="reviews__slider-wrap">
        <button class="slider-nav reviews__nav reviews__nav--prev" type="button" aria-label="Назад" @click="swiper.prev()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>

        <ClientOnly>
          <swiper-container ref="sliderRef" class="reviews__slider" :init="false">
            <swiper-slide v-for="(item, index) in items" :key="index">
              <article class="review-card">
                <div class="review-card__top">
                  <span class="review-card__num">№{{ item.num }}</span>
                  <span class="review-card__tag">{{ item.tag }}</span>
                  <svg class="review-card__plus" width="20" height="20" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M7.5 2V13M2 7.5H13" stroke="#99AAC9" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </div>
                <img class="review-card__logo" :src="item.logo" :alt="item.company">
                <h3 class="review-card__company">{{ item.company }}</h3>
                <p class="review-card__text">{{ item.text }}</p>
                <a class="review-card__more" href="#">
                  <span class="review-card__icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 5.25C6 4.83579 6.33579 4.5 6.75 4.5L12.75 4.5C13.1642 4.5 13.5 4.83579 13.5 5.25V11.25C13.5 11.6642 13.1642 12 12.75 12C12.3358 12 12 11.6642 12 11.25V7.06066L5.78033 13.2803C5.48744 13.5732 5.01256 13.5732 4.71967 13.2803C4.42678 12.9874 4.42678 12.5126 4.71967 12.2197L10.9393 6L6.75 6C6.33579 6 6 5.66421 6 5.25Z" fill="#145771"/>
                    </svg>

                  </span>
                  Читать полностью
                </a>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <button class="slider-nav reviews__nav reviews__nav--next" type="button" aria-label="Вперёд" @click="swiper.next()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>
      </div>

      <div class="reviews__dots">
        <button
          v-for="(_, index) in items"
          :key="index"
          class="reviews__dot"
          :class="{ 'reviews__dot--active': activeIndex === index }"
          type="button"
          :aria-label="`Слайд ${index + 1}`"
          @click="goTo(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import pr1 from '~/assets/images/partners/pr1.png'
import pr2 from '~/assets/images/partners/pr2.png'
import pr3 from '~/assets/images/partners/pr3.png'

const sliderRef = ref(null)
const activeIndex = ref(0)

const swiper = useSwiper(sliderRef, {
  slidesPerView: 3,
  spaceBetween: 21,
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

const text = 'Размышляя над проблемой, автор приводит слова старого мастера о том, что истинное ремесло требует терпения. Этот эпизод показывает, как важна преемственность поколений и уважение к труду'

const items = [
  { num: '01', tag: 'Банк', company: 'ПАО “РОСБАНК”', logo: pr1, text },
  { num: '02', tag: 'Банк', company: 'ООО “СБЕРБАНК”', logo: pr2, text },
  { num: '03', tag: 'СРО', company: 'ООО “СБЕРБАНК”', logo: pr3, text },
  { num: '04', tag: 'Банк', company: 'ПАО “РОСБАНК”', logo: pr1, text },
]
</script>
