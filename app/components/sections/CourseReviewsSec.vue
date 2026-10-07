<template>
  <section v-if="showSection" class="reviews">
    <div class="container">
      <h2 class="section-title reviews__title">{{ titleText }}</h2>

      <template v-if="items.length">
        <div class="reviews__slider-wrap">
          <button
            v-if="showControls"
            class="slider-nav reviews__nav reviews__nav--prev"
            type="button"
            aria-label="Назад"
            @click="slidePrev"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
            </svg>
          </button>

          <ClientOnly>
            <swiper-container ref="sliderRef" class="reviews__slider" :init="false">
              <swiper-slide v-for="(item, index) in items" :key="item.id || index">
                <article class="review-card" :style="cardHeight ? { height: `${cardHeight}px` } : undefined">
                  <div class="review-card__top">
                    <span class="review-card__num">№{{ item.num }}</span>
                    <span class="review-card__tag">{{ item.tag }}</span>
                    <svg class="review-card__plus" width="20" height="20" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                      <path d="M7.5 2V13M2 7.5H13" stroke="#99AAC9" stroke-width="1.4" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <img class="review-card__logo" :src="item.logo" :alt="item.company">
                  <h3 class="review-card__company">{{ item.company }}</h3>
                  <p class="review-card__text">{{ truncateText(item.text) }}</p>
                  <button class="review-card__more" type="button" @click="openReview(item)">
                    <span class="review-card__icon">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 5.25C6 4.83579 6.33579 4.5 6.75 4.5L12.75 4.5C13.1642 4.5 13.5 4.83579 13.5 5.25V11.25C13.5 11.6642 13.1642 12 12.75 12C12.3358 12 12 11.6642 12 11.25V7.06066L5.78033 13.2803C5.48744 13.5732 5.01256 13.5732 4.71967 13.2803C4.42678 12.9874 4.42678 12.5126 4.71967 12.2197L10.9393 6L6.75 6C6.33579 6 6 5.66421 6 5.25Z" fill="#145771"/>
                      </svg>

                    </span>
                    Читать полностью
                  </button>
                </article>
              </swiper-slide>
            </swiper-container>
          </ClientOnly>

          <button
            v-if="showControls"
            class="slider-nav reviews__nav reviews__nav--next"
            type="button"
            aria-label="Вперёд"
            @click="slideNext"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
            </svg>
          </button>
        </div>

        <div v-if="showControls" class="reviews__dots">
          <button
            v-for="(item, index) in items"
            :key="item.id || index"
            class="reviews__dot"
            :class="{ 'reviews__dot--active': activeIndex === index }"
            type="button"
            :aria-label="`Слайд ${index + 1}`"
            @click="goTo(index)"
          ></button>
        </div>
      </template>
    </div>

    <ModalReview
      :open="isReviewModalOpen"
      :review="activeReview"
      @close="closeReview"
    />
  </section>
</template>

<script setup>
import ModalReview from '~/components/modals/ModalReview.vue'

const config = useRuntimeConfig()

const { data: reviewsSection } = await useFetch(`${config.public.strapiUrl}/api/course-reviews-sec`, {
  key: 'course-reviews-sec',
  query: {
    'populate[reviews][populate][reviews][populate][logo_company]': true,
  },
})

const section = computed(() => reviewsSection.value?.data?.reviews || null)

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

function formatNum(index) {
  return String(index + 1).padStart(2, '0')
}

function truncateText(text, maxLength = 300) {
  const value = String(text || '')
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength).trimEnd()}...`
}

const titleText = computed(() => section.value?.section_title || '')
const showSection = computed(() => Boolean(String(titleText.value).trim()))

const items = computed(() =>
  (section.value?.reviews || []).map((item, index) => ({
    id: item.documentId || item.id,
    num: formatNum(index),
    tag: item.type || '',
    company: item.name || '',
    logo: mediaUrl(item.logo_company),
    text: item.text || '',
  })),
)

const slidesPerView = ref(3)

function syncSlidesPerView() {
  const width = window.innerWidth
  if (width <= 760) slidesPerView.value = 1
  else if (width <= 1460) slidesPerView.value = 2
  else slidesPerView.value = 3
}

const showControls = computed(() => items.value.length > slidesPerView.value)

const sliderRef = ref(null)
const activeIndex = ref(0)
const cardHeight = ref(null)
const isReviewModalOpen = ref(false)
const activeReview = ref(null)

function openReview(item) {
  activeReview.value = item
  isReviewModalOpen.value = true
}

function closeReview() {
  isReviewModalOpen.value = false
  activeReview.value = null
}

async function waitImages(root) {
  const images = [...root.querySelectorAll('img')]
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve()
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
      })
    }),
  )
}

async function measureCardHeight() {
  await nextTick()
  const root = sliderRef.value
  if (!root?.querySelectorAll) return false

  await waitImages(root)

  cardHeight.value = null
  await nextTick()

  const cards = [...root.querySelectorAll('.review-card')]
  if (!cards.length) return false

  cardHeight.value = Math.max(...cards.map((card) => card.offsetHeight))
  await nextTick()
  return true
}

async function initSlider() {
  syncSlidesPerView()
  const el = sliderRef.value
  if (!el || !items.value.length) return

  const measured = await measureCardHeight()
  if (!measured) return

  if (el.swiper) {
    el.swiper.update()
    return
  }

  Object.assign(el, {
    slidesPerView: 1,
    spaceBetween: 21,
    breakpoints: {
      761: { slidesPerView: 2 },
      1461: { slidesPerView: 3 },
    },
    loop: items.value.length > 1,
    on: {
      slideChange(instance) {
        activeIndex.value = instance.realIndex
      },
    },
  })

  el.initialize()
}

const getInstance = () => sliderRef.value?.swiper ?? null

function slidePrev() {
  getInstance()?.slidePrev()
}

function slideNext() {
  getInstance()?.slideNext()
}

const goTo = (index) => {
  const instance = getInstance()
  if (!instance) return
  if (typeof instance.slideToLoop === 'function') {
    instance.slideToLoop(index)
    return
  }
  instance.slideTo?.(index)
}

watch(sliderRef, (el) => {
  if (el) initSlider()
}, { flush: 'post' })

onMounted(() => {
  if (sliderRef.value) initSlider()
  window.addEventListener('resize', initSlider)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', initSlider)
})
</script>
