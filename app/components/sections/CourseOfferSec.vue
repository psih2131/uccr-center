<template>
  <section class="course-offer">
    <div class="container">
      <div class="course-offer__box">
        <div class="course-offer__content">
          <svg class="course-offer__plus course-offer__plus--content" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
            <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
            <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
          </svg>

          <div class="course-offer__tags">
            <span class="course-offer__tag course-offer__tag--green">Запись на курс ежедневно</span>
            <span class="course-offer__tag course-offer__tag--blue">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 16.5587C8.775 16.5587 8.55 16.5062 8.3625 16.4012C6.96 15.6362 4.4925 14.8262 2.9475 14.6237L2.73 14.5937C1.7475 14.4737 0.9375 13.5512 0.9375 12.5537V3.49366C0.9375 2.90116 1.17 2.36116 1.5975 1.97116C2.025 1.58116 2.58 1.39366 3.165 1.44616C4.815 1.57366 7.305 2.39866 8.715 3.28366L8.895 3.38866C8.9475 3.41866 9.06 3.41866 9.105 3.39616L9.225 3.32116C10.635 2.43616 13.125 1.59616 14.7825 1.45366C14.7975 1.45366 14.8575 1.45366 14.8725 1.45366C15.42 1.40116 15.9825 1.59616 16.4025 1.98616C16.83 2.37616 17.0625 2.91616 17.0625 3.50866V12.5612C17.0625 13.5662 16.2525 14.4812 15.2625 14.6012L15.015 14.6312C13.47 14.8337 10.995 15.6512 9.6225 16.4087C9.4425 16.5137 9.225 16.5587 9 16.5587ZM2.985 2.56366C2.745 2.56366 2.5275 2.64616 2.355 2.80366C2.1675 2.97616 2.0625 3.22366 2.0625 3.49366V12.5537C2.0625 12.9962 2.445 13.4237 2.8725 13.4837L3.0975 13.5137C4.785 13.7387 7.3725 14.5862 8.8725 15.4037C8.94 15.4337 9.0375 15.4412 9.075 15.4262C10.575 14.5937 13.1775 13.7387 14.8725 13.5137L15.1275 13.4837C15.555 13.4312 15.9375 12.9962 15.9375 12.5537V3.50116C15.9375 3.22366 15.8325 2.98366 15.645 2.80366C15.45 2.63116 15.2025 2.54866 14.925 2.56366C14.91 2.56366 14.85 2.56366 14.835 2.56366C13.4025 2.69116 11.0925 3.46366 9.8325 4.25116L9.7125 4.33366C9.3 4.58866 8.715 4.58866 8.3175 4.34116L8.1375 4.23616C6.855 3.44866 4.545 2.68366 3.075 2.56366C3.045 2.56366 3.015 2.56366 2.985 2.56366Z" fill="white"/>
                <path d="M9 15.9297C8.6925 15.9297 8.4375 15.6747 8.4375 15.3672V4.11719C8.4375 3.80969 8.6925 3.55469 9 3.55469C9.3075 3.55469 9.5625 3.80969 9.5625 4.11719V15.3672C9.5625 15.6822 9.3075 15.9297 9 15.9297Z" fill="white"/>
                <path d="M5.8125 6.92969H4.125C3.8175 6.92969 3.5625 6.67469 3.5625 6.36719C3.5625 6.05969 3.8175 5.80469 4.125 5.80469H5.8125C6.12 5.80469 6.375 6.05969 6.375 6.36719C6.375 6.67469 6.12 6.92969 5.8125 6.92969Z" fill="white"/>
                <path d="M6.375 9.17969H4.125C3.8175 9.17969 3.5625 8.92469 3.5625 8.61719C3.5625 8.30969 3.8175 8.05469 4.125 8.05469H6.375C6.6825 8.05469 6.9375 8.30969 6.9375 8.61719C6.9375 8.92469 6.6825 9.17969 6.375 9.17969Z" fill="white"/>
              </svg>
              Дистанционное обучение
            </span>
          </div>

          <h2 class="course-offer__title">{{ course.specialty }}</h2>
          <p class="course-offer__label">Продолжительность обучения:</p>

          <div class="course-offer__row">
            <div class="course-offer__hours">
              <button
                v-for="item in hours"
                :key="item"
                class="course-offer__hour"
                :class="{ 'course-offer__hour--active': activeHour === item }"
                type="button"
                @click="activeHour = item"
              >
                {{ item }} ак.ч
              </button>
            </div>

            <span class="course-offer__divider" aria-hidden="true"></span>

            <div class="course-offer__aside">
              <div class="course-offer__credit">
                <span>Рассрочка 0%</span>
                <b>
                  от
                  <em>458р/мес</em>
                </b>
                <button type="button" @click="openConsult">Узнать подробнее</button>
              </div>
              <div class="course-offer__price">
                <span>Стоимость обучения</span>
                <div class="course-offer__price-row">
                  <strong>7600р</strong>
                  <span class="course-offer__old">
                    <s>4200р</s>
                    <em>-800р</em>
                  </span>
                </div>
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

          <span class="course-offer__line course-offer__line--1" aria-hidden="true"></span>
          <span class="course-offer__line course-offer__line--2" aria-hidden="true"></span>

          <div class="course-offer__bottom">
            <form class="course-offer__form" @submit.prevent="sendLead">
              <input class="course-offer__input" type="tel" name="phone" placeholder="Номер телефона">
              <ButtonsBtnPill class="btn-pill--light" type="modal" title="Отправить заявку" @click="sendLead" />
              <label class="course-offer__policy">
                <span class="course-offer__policy-box"></span>
                <span>
                  Отправляя форму, я соглашаюсь с <NuxtLink to="/soglashenie">Пользовательским соглашением</NuxtLink> и даю согласие на обработку персональных данных в соответствии с&nbsp;<NuxtLink to="/politika">Политикой конфиденциальности</NuxtLink>
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
                <img src="@/assets/icons/form-max.png" alt="" width="18" height="18">
              </a>
            </div>
          </div>
        </div>

        <div class="course-offer__gallery">
          <svg class="course-offer__plus course-offer__plus--gallery" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
            <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#FFFFFF"/>
            <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#FFFFFF"/>
          </svg>

          <p class="course-offer__gallery-title">Удостоверение о повышении квалификации</p>

          <ClientOnly>
            <swiper-container ref="sliderRef" class="course-offer__slider" :init="false">
              <swiper-slide v-for="(image, index) in images" :key="index">
                <button class="course-offer__slide" type="button" :aria-label="`Открыть документ ${index + 1}`" @click="openDoc(index)">
                  <img :src="image" alt="">
                </button>
              </swiper-slide>
            </swiper-container>
          </ClientOnly>

          <span class="course-offer__line course-offer__line--g1" aria-hidden="true"></span>
          <span class="course-offer__line course-offer__line--g2" aria-hidden="true"></span>

          <div class="course-offer__thumbs-wrap">
            <button class="slider-nav course-offer__nav course-offer__nav--prev" type="button" aria-label="Назад" @click="swiper.prev()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071L10.2929 18.7071C10.6834 19.0976 11.3166 19.0976 11.7071 18.7071C12.0976 18.3166 12.0976 17.6834 11.7071 17.2929L7.41421 13L19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L7.41421 11L11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289Z" fill="currentColor"/>
              </svg>
            </button>

            <div class="course-offer__thumbs">
              <button
                v-for="(image, index) in images"
                :key="`thumb-${index}`"
                type="button"
                class="course-offer__thumb"
                :class="{ 'course-offer__thumb--active': activeIndex === index }"
                :aria-label="`Документ ${index + 1}`"
                @click="goTo(index)"
              >
                <img :src="image" alt="">
              </button>
            </div>

            <button class="slider-nav course-offer__nav course-offer__nav--next" type="button" aria-label="Вперёд" @click="swiper.next()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import licenseDir from '~/assets/images/licenses/license-dir.png'
import license1 from '~/assets/images/licenses/license-1.png'
import license2 from '~/assets/images/licenses/license-2.png'

defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const store = useCounterStore()
const images = [licenseDir, license1, license2]
const hours = ['36', '46', '52', '72', '88', '92']
const activeHour = ref('36')
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
    images.map((src, i) => ({
      src,
      type: 'image',
      caption: `Удостоверение о повышении квалификации ${i + 1}`,
    })),
    { startIndex: index },
  )
}

const benefits = [
  'Работаем на основании Лицензии Министерства Образования',
  'До оплаты можете ознакомиться с учебным планом',
  'Все сведения вносим в ФИС ФРДО',
  'Рассрочка 0% на все курсы',
]

const openConsult = () => {
  store.openModal('consult')
}

const sendLead = () => {
  store.openModal('success')
}
</script>
