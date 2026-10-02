<template>
  <section v-if="items.length" class="programs">
    <div class="container">
      <div class="programs__head">
        <h2 class="section-title programs__title">Популярные програмы</h2>
        <ButtonsBtnPill title="Смотреть все програмы" type="link" :to="catalogUrl('rabochie-professii')" />
      </div>

      <div class="programs__slider-wrap">
        <button
          v-if="showControls"
          class="slider-nav programs__nav programs__nav--prev"
          type="button"
          aria-label="Назад"
          @click="swiper.prev()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>

        <ClientOnly>
          <swiper-container ref="sliderRef" class="programs__slider" :init="false">
            <swiper-slide v-for="(item, index) in items" :key="item.id || item.slug || index">
              <article class="program-card">
                <div class="program-card__top">
                  <span class="program-card__icon" :style="{ background: item.color }">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <path d="M9.238 20.419c-.381 0-.697-.317-.697-.698v-1.926c0-.381.316-.697.697-.697s.698.316.698.697v1.926c0 .39-.317.698-.698.698Z" fill="white"/>
                      <path d="M14 20.419c-.381 0-.698-.317-.698-.698v-3.86c0-.382.317-.698.698-.698s.698.316.698.698v3.86c0 .391-.317.698-.698.698Z" fill="white"/>
                      <path d="M18.762 20.419c-.382 0-.698-.317-.698-.698v-5.786c0-.381.316-.698.698-.698s.697.317.697.698v5.786c0 .391-.307.698-.697.698Z" fill="white"/>
                      <path d="M9.235 15.098c-.316 0-.595-.214-.679-.53-.093-.373.13-.754.512-.847 3.423-.856 6.437-2.726 8.735-5.396l.428-.502a.698.698 0 1 1 1.06.912l-.428.502c-2.484 2.902-5.758 4.921-9.46 5.842-.056.018-.112.018-.168.018Z" fill="white"/>
                      <path d="M18.76 11.693c-.381 0-.697-.316-.697-.698V8.977h-2.028a.698.698 0 1 1 0-1.396h2.726c.381 0 .697.317.697.698v2.726c0 .381-.307.698-.698.698Z" fill="white"/>
                      <path d="M16.791 24h-5.582C6.158 24 4 21.842 4 16.791v-5.582C4 6.158 6.158 4 11.209 4h5.582C21.842 4 24 6.158 24 11.209v5.582C24 21.842 21.842 24 16.791 24ZM11.209 5.395C6.921 5.395 5.395 6.921 5.395 11.21v5.581c0 4.289 1.526 5.814 5.814 5.814h5.582c4.288 0 5.814-1.525 5.814-5.814v-5.581c0-4.289-1.526-5.814-5.814-5.814h-5.582Z" fill="white"/>
                    </svg>
                  </span>
                  <span v-if="item.category" class="program-card__cat" :style="{ color: item.color }">{{ item.category }}</span>
                </div>

                <div class="program-card__info">
                  <h3 class="program-card__title">{{ item.title }}</h3>
                  <p v-if="item.text" class="program-card__text">{{ item.text }}</p>
                </div>

                <span class="program-card__line"></span>

                <div class="program-card__meta">
                  <div class="program-card__meta-col">
                    <div class="program-card__meta-label">
                      <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
                      <span>Срок обучения</span>
                    </div>
                    <b>{{ item.hours }}</b>
                  </div>
                  <div class="program-card__meta-col">
                    <div class="program-card__meta-label">
                      <img src="@/assets/icons/program-book.svg" alt="" width="18" height="18">
                      <span>Формат обучения</span>
                    </div>
                    <b>{{ item.format }}</b>
                  </div>
                </div>

                <span class="program-card__line"></span>

                <div class="program-card__bottom">
                  <strong class="program-card__price">{{ item.price || '—' }}</strong>
                  <ButtonsBtnPill title="Подробнее" type="link" :to="item.to" />
                </div>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <button
          v-if="showControls"
          class="slider-nav programs__nav programs__nav--next"
          type="button"
          aria-label="Вперёд"
          @click="swiper.next()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>
      </div>

      <div v-if="showControls" class="programs__dots">
        <button
          v-for="(_, index) in items"
          :key="index"
          class="programs__dot"
          :class="{ 'programs__dot--active': activeIndex === index }"
          type="button"
          :aria-label="`Слайд ${index + 1}`"
          @click="goTo(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const sliderRef = ref(null)
const activeIndex = ref(0)
const slidesPerView = 3
const colors = ['#5DA0BA', '#66AF5E', '#966DC3']
const { catalogUrl, courseUrl } = useCity()

function formatHours(time) {
  if (!time) return '—'
  return /час/i.test(String(time)) ? time : `${time} часов`
}

const items = computed(() =>
  (props.items || []).map((course, index) => {
    const directionSlug = course.direction?.slug || 'rabochie-professii'

    return {
      id: course.documentId || course.id,
      slug: course.slug,
      category: course.direction?.title || '',
      title: course.title || '',
      text: course.subtitle || '',
      hours: formatHours(course.time),
      format: course.form_learning || 'Дистанционно',
      price: course.default_price != null ? `${course.default_price} ₽` : '',
      color: colors[index % colors.length],
      to: courseUrl(directionSlug, course.slug),
    }
  }),
)

const showControls = computed(() => items.value.length > slidesPerView)

const swiper = useSwiper(sliderRef, {
  slidesPerView,
  spaceBetween: 23,
  loop: items.value.length > slidesPerView,
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
</script>
