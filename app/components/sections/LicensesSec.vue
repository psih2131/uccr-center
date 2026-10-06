<template>
  <section v-if="items.length" class="licenses">
    <div class="container">
      <div class="licenses__head">
        <h2 class="section-title licenses__title">Лицензии компании</h2>
        <div class="licenses__head-action">
          <ButtonsBtnPill title="Смотреть все лицензии" type="link" to="/licenzii" />
        </div>
      </div>

      <div class="licenses__slider-wrap">
        <button
          v-if="showControls"
          class="slider-nav licenses__nav licenses__nav--prev"
          type="button"
          aria-label="Назад"
          @click="swiper.prev()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>

        <ClientOnly>
          <swiper-container ref="sliderRef" class="licenses__slider" :init="false">
            <swiper-slide v-for="(item, index) in items" :key="item.id || index">
              <article class="license-card">
                <button
                  class="license-card__preview"
                  type="button"
                  :aria-label="`Открыть: ${item.title}`"
                  @click="openLicense(index)"
                >
                  <img class="license-card__image" :src="item.image" alt="">
                  <span class="license-card__zoom" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="currentColor"/>
                    </svg>
                  </span>
                </button>
                <p class="license-card__title">{{ item.title }}</p>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>

        <button
          v-if="showControls"
          class="slider-nav licenses__nav licenses__nav--next"
          type="button"
          aria-label="Вперёд"
          @click="swiper.next()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
          </svg>
        </button>
      </div>

      <div v-if="showControls" class="licenses__dots">
        <button
          v-for="(_, index) in items"
          :key="index"
          class="licenses__dot"
          :class="{ 'licenses__dot--active': activeIndex === index }"
          type="button"
          :aria-label="`Слайд ${index + 1}`"
          @click="goTo(index)"
        ></button>
      </div>

      <div class="licenses__foot">
        <ButtonsBtnPill title="Смотреть все лицензии" type="link" to="/licenzii" />
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

const config = useRuntimeConfig()

const sliderRef = ref(null)
const activeIndex = ref(0)
const slidesPerView = ref(5)

function syncSlidesPerView() {
  const width = window.innerWidth
  if (width <= 760) slidesPerView.value = 2
  else if (width <= 940) slidesPerView.value = 2
  else if (width <= 1240) slidesPerView.value = 3
  else if (width <= 1460) slidesPerView.value = 4
  else slidesPerView.value = 5
}

onMounted(() => {
  syncSlidesPerView()
  window.addEventListener('resize', syncSlidesPerView)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncSlidesPerView)
})

const items = computed(() =>
  (props.items || [])
    .map((item) => ({
      id: item.id,
      title: item.title || '',
      image: mediaUrl(item.photo),
    }))
    .filter((item) => item.image),
)

const showControls = computed(() => items.value.length > slidesPerView.value)

const swiper = useSwiper(sliderRef, {
  slidesPerView: 2,
  spaceBetween: 20,
  breakpoints: {
    761: { slidesPerView: 2 },
    941: { slidesPerView: 3 },
    1241: { slidesPerView: 4 },
    1461: { slidesPerView: 5 },
  },
  loop: items.value.length > slidesPerView.value,
  on: {
    slideChange(instance) {
      activeIndex.value = instance.realIndex
    },
  },
})

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

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

const openLicense = async (index) => {
  const gallery = items.value.map((item) => ({
    src: item.image,
    type: 'image',
    caption: item.title,
  }))

  if (!gallery.length) return

  const { Fancybox } = await import('@fancyapps/ui')
  Fancybox.show(gallery, { startIndex: index })
}
</script>
