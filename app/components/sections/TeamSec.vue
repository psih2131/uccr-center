<template>
  <section class="team">
    <div class="container">
      <h2 class="section-title team__title">Наша команда специалистов</h2>

      <div class="team__slider-wrap">
        <button class="slider-nav team__nav team__nav--prev" type="button" aria-label="Назад" @click="swiper.prev()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>

        <ClientOnly>
          <swiper-container ref="sliderRef" class="team__slider" :init="false">
            <swiper-slide v-for="person in people" :key="person.name">
              <article class="team-card">
                <img class="team-card__photo" :src="person.photo" :alt="person.name">
                <h3 class="team-card__name">{{ person.name }}</h3>
                <p class="team-card__role">{{ person.role }}</p>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <button class="slider-nav team__nav team__nav--next" type="button" aria-label="Вперёд" @click="swiper.next()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>
      </div>

      <div class="team__dots">
        <button
          v-for="(_, index) in people"
          :key="index"
          class="team__dot"
          :class="{ 'team__dot--active': activeIndex === index }"
          type="button"
          :aria-label="`Слайд ${index + 1}`"
          @click="goTo(index)"
        ></button>
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
const activeIndex = ref(0)

const swiper = useSwiper(sliderRef, {
  slidesPerView: 5,
  spaceBetween: 20,
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

const people = [
  { name: 'Юлия Никитина', role: 'Директор', photo: tm1 },
  { name: 'Алексей Дмитриев', role: 'Методист', photo: tm2 },
  { name: 'Анна Соколова', role: 'Преподаватель', photo: tm3 },
  { name: 'Дмитрий Козлов', role: 'Куратор', photo: tm4 },
  { name: 'Мария Волкова', role: 'Специалист', photo: tm5 },
  { name: 'Игорь Петров', role: 'Преподаватель', photo: tm1 },
]
</script>
