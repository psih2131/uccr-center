<template>
  <section class="course-offer">
    <div class="container">
      <div class="course-offer__box">
        <div class="course-offer__content">

          <div class="course-offer__content-top">
            <svg class="course-offer__plus course-offer__plus--content" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
              <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
              <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
            </svg>
          <span class="course-offer__line course-offer__line--h1"></span>
          <span class="course-offer__line course-offer__line--h2"></span>

          <div class="course-offer__tags">
            <span class="course-offer__tag course-offer__tag--green">Запись на курс ежедневно</span>
            <span class="course-offer__tag course-offer__tag--blue">
              <img src="@/assets/icons/program-book.svg" alt="" width="14" height="14">
              {{ course.form_learning || 'Дистанционное обучение' }}
            </span>
          </div>

          <h2 class="course-offer__title">{{ course.title }}</h2>
          <p class="course-offer__label">Продолжительность обучения:</p>

          <div class="course-offer__row">
            <div v-if="priceItems.length" class="course-offer__hours">
              <button
                v-for="item in priceItems"
                :key="item.hour"
                class="course-offer__hour"
                :class="{ 'course-offer__hour--active': activeHour === item.hour }"
                type="button"
                @click="activeHour = item.hour"
              >
                {{ item.hour }} ак.ч
              </button>
            </div>

            <span class="course-offer__divider" aria-hidden="true"></span>

            <div class="course-offer__aside">
              <div class="course-offer__credit">
                <span>Рассрочка 0%</span>
                <b>от <em>458р/мес</em></b>
                <button type="button" @click="openConsult">Узнать подробнее</button>
              </div>
              <div v-if="activePrice" class="course-offer__price">
                <span>Стоимость обучения</span>
                <strong>{{ activePrice.current_price }}р</strong>
                <span v-if="hasOldPrice" class="course-offer__old">
                  <s>{{ activePrice.old_price }}р</s>
                  <em>-{{ priceDiff }}р</em>
                </span>
              </div>
            </div>
          </div>

          <ul class="course-offer__list">
            <li v-for="item in benefits" :key="item">
              <span class="course-offer__check" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M3.5 8.5L7 12L13.5 5" stroke="#F3F9F6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              {{ item }}
            </li>
          </ul>
          </div>
          

          <div class="course-offer__bottom">
            <form class="course-offer__form" @submit.prevent="sendLead">
              <input class="course-offer__input" type="tel" name="phone" placeholder="Номер телефона">
              <ButtonsBtnPill class="btn-pill--light" type="modal" title="Отправить заявку" @click="sendLead" />
              <label class="course-offer__policy">
                <span class="course-offer__policy-box"></span>
                <span>
                  Отправляя форму, я соглашаюсь с
                  <NuxtLink to="/docs/polzovatelskoe-soglashenie">Пользовательским соглашением</NuxtLink>
                  и даю согласие на обработку персональных данных в соответствии с&nbsp;<NuxtLink to="/docs/politika-konfidencialnosti">Политикой конфиденциальности</NuxtLink>
                </span>
              </label>
            </form>

            <div class="course-offer__socials">
              <a class="course-offer__social" href="#" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M18 9C18 13.9705 13.9705 18 9 18C4.0294 18 0 13.9705 0 9C0 4.0294 4.0294 0 9 0C13.9705 0 18 4.0294 18 9ZM9.3226 6.6442C8.4471 7.0083 6.6976 7.762 4.0739 8.905C3.6479 9.0744 3.4247 9.2402 3.4044 9.4022C3.3701 9.6762 3.713 9.784 4.1801 9.9309C4.2437 9.9508 4.3095 9.9715 4.377 9.9935C4.8365 10.1428 5.4546 10.3176 5.776 10.3245C6.0675 10.3308 6.3928 10.2107 6.752 9.964C9.2034 8.3092 10.4688 7.4729 10.5483 7.4549C10.6043 7.4421 10.682 7.4262 10.7346 7.4729C10.7872 7.5197 10.782 7.6082 10.7765 7.632C10.7425 7.7769 9.3961 9.0286 8.6994 9.6763C8.4916 9.8695 8.2891 10.0668 8.085 10.2635C7.6581 10.675 7.338 10.9836 8.1027 11.4876C8.878 11.9985 9.6591 12.5084 10.4152 13.0474C10.788 13.3133 11.1231 13.5521 11.5369 13.514C11.7775 13.4919 12.0259 13.2657 12.152 12.5913C12.4501 10.9974 13.0362 7.5439 13.1717 6.1207C13.1836 5.9961 13.1686 5.8365 13.1566 5.7665C13.1447 5.6964 13.1196 5.5966 13.0286 5.5227C12.9207 5.4352 12.7543 5.4168 12.6798 5.4181C12.3412 5.424 11.8219 5.6046 9.3226 6.6442Z" fill="white"/>
                </svg>
              </a>
              <a class="course-offer__social" href="#" aria-label="MAX">
                <span>M</span>
              </a>
            </div>
          </div>
        </div>

        <div class="course-offer__gallery">
          <svg class="course-offer__plus course-offer__plus--gallery" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
            <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#FFFFFF"/>
            <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#FFFFFF"/>
          </svg>
          <span class="course-offer__line course-offer__line--gallery-h1"></span>
          <span class="course-offer__line course-offer__line--gallery-h2"></span>

          <p class="course-offer__gallery-title">Удостоверение о повышении квалификации</p>

          <ClientOnly>
            <swiper-container ref="sliderRef" class="course-offer__slider" :init="false">
              <swiper-slide v-for="(image, index) in images" :key="index">
                <button class="course-offer__slide" type="button" @click="openDoc(index)">
                  <img :src="image" :alt="`Документ ${index + 1}`">
                </button>
              </swiper-slide>
            </swiper-container>
          </ClientOnly>

          <div class="course-offer__controls">
            <button class="slider-nav course-offer__nav course-offer__nav--prev" type="button" aria-label="Назад" @click="swiper.prev()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
              </svg>
            </button>

            <div class="course-offer__thumbs">
              <button
                v-for="(image, index) in images"
                :key="`thumb-${index}`"
                class="course-offer__thumb"
                :class="{ 'course-offer__thumb--active': activeIndex === index }"
                type="button"
                @click="goTo(index)"
              >
                <img :src="image" alt="">
              </button>
            </div>

            <button class="slider-nav course-offer__nav course-offer__nav--next" type="button" aria-label="Вперёд" @click="swiper.next()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="#145771"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import license1 from '~/assets/images/licenses/license-1.png'
import license2 from '~/assets/images/licenses/license-2.png'
import licenseDir from '~/assets/images/licenses/license-dir.png'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const config = useRuntimeConfig()
const store = useCounterStore()

const fallbackImages = [licenseDir, license1, license2]

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

const priceItems = computed(() => {
  const items = props.course?.price_v1_section?.price_item || []
  return items
    .filter((item) => item?.hour != null)
    .map((item) => ({
      hour: item.hour,
      current_price: item.current_price,
      old_price: item.old_price,
    }))
    .sort((a, b) => a.hour - b.hour)
})

const activeHour = ref(null)

watch(
  priceItems,
  (items) => {
    if (!items.length) {
      activeHour.value = null
      return
    }
    if (!items.some((item) => item.hour === activeHour.value)) {
      activeHour.value = items[0].hour
    }
  },
  { immediate: true },
)

const activePrice = computed(() =>
  priceItems.value.find((item) => item.hour === activeHour.value) || null,
)

const hasOldPrice = computed(() =>
  activePrice.value?.old_price != null && activePrice.value?.current_price != null,
)

const priceDiff = computed(() => {
  if (!hasOldPrice.value) return 0
  return Math.abs(activePrice.value.old_price - activePrice.value.current_price)
})

const images = computed(() => {
  const docs = props.course?.price_v1_section?.docs || []
  const urls = docs.map(mediaUrl).filter(Boolean)
  return urls.length ? urls : fallbackImages
})

const activeIndex = ref(0)
const sliderRef = ref(null)

const swiper = useSwiper(sliderRef, {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  on: {
    slideChange(instance) {
      activeIndex.value = instance.realIndex
    },
  },
})

const benefits = [
  'Работаем на основании Лицензии Министерства Образования',
  'До оплаты можете ознакомиться с учебным планом',
  'Все сведения вносим в ФИС ФРДО',
  'Рассрочка 0% на все курсы',
]

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

const openDoc = async (index) => {
  const { Fancybox } = await import('@fancyapps/ui')
  Fancybox.show(
    images.value.map((src, i) => ({
      src,
      type: 'image',
      caption: `Удостоверение ${i + 1}`,
    })),
    { startIndex: index },
  )
}

const openConsult = () => {
  store.openModal('consult')
}

const sendLead = () => {
  store.openModal('success')
}
</script>
