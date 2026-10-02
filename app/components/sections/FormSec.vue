<template>
  <section v-if="formSection?.data" class="home-form" id="consult">
    <div class="container">
      <div class="home-form__box">

        <div class="home-form__bg-decor">
          <img :src="formBg" alt="" width="676" height="392">
        </div>

        <div class="home-form__box-content">
          <span class="home-form__line home-form__line--1"></span>
          <span class="home-form__line home-form__line--2"></span>
          <span class="home-form__line home-form__line--3"></span>

          <div class="home-form__head">
            <h2 class="home-form__title">{{ formSection.data.title }}</h2>
            <p class="home-form__text" v-html="formattedText"></p>
          </div>

          <div class="home-form__form">
            <div class="home-form__fields">
              <input class="home-form__input home-form__input--name" type="text" name="name" placeholder="Ваше имя">
              <input class="home-form__input home-form__input--phone" type="tel" name="phone" placeholder="Номер телефона">
              <button class="btn-pill btn-pill--light home-form__submit" type="button" @click="openSuccess">
                Отправить заявку
                <span class="btn-pill__icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </span>
              </button>
            </div>

            <div class="home-form__bottom">
              <span class="home-form__check" aria-hidden="true"></span>
              <p class="home-form__policy">
                Отправляя форму, я соглашаюсь с
                <NuxtLink to="/docs/polzovatelskoe-soglashenie">Пользовательским соглашением</NuxtLink>
                и даю согласие на обработку персональных данных в соответствии с
                <NuxtLink to="/docs/politika-konfidencialnosti">Политикой конфиденциальности</NuxtLink>
              </p>
              <div v-if="socials.length" class="home-form__socials">
                <a
                  v-for="(social, index) in socials"
                  :key="index"
                  class="home-form__social"
                  :href="social.url || '#'"
                  :aria-label="social.name || 'Соцсеть'"
                  target="_blank"
                  rel="noopener noreferrer"
                  v-html="social.svg_icon_code"
                ></a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup>
import formBg from '@/assets/images/decor/form-bg.jpg'

const config = useRuntimeConfig()
const store = useCounterStore()

const openSuccess = () => {
  store.openModal('success')
}

const { data: formSection } = await useFetch(`${config.public.strapiUrl}/api/form-section`, {
  key: 'form-section',
  query: {
    'populate[socials_media_links]': true,
  },
})

const socials = computed(() => formSection.value?.data?.socials_media_links ?? [])

const formattedText = computed(() => {
  const text = formSection.value?.data?.text
  if (!text) return ''
  return text.replace(/\n/g, '<br>')
})
</script>
