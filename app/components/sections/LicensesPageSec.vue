<template>
  <section class="licenses-page-sec">
    <div class="container">
      <div class="licenses-page-sec__intro">
        <div class="licenses-page-sec__intro-main">
          <p class="licenses-page-sec__crumbs">
            <NuxtLink to="/">Главная</NuxtLink>
            <span> - </span>
            <span class="licenses-page-sec__crumbs-current">Лицензии</span>
          </p>
          <h1 class="licenses-page-sec__title">
            <span class="licenses-page-sec__title-row">
              Лицензии учебного
              <span class="licenses-page-sec__title-plus" aria-hidden="true">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="19.5508" width="3.9" height="42" rx="1.95" fill="#D92139"/>
                  <rect y="22.4492" width="3.9" height="42" rx="1.95" transform="rotate(-90 0 22.4492)" fill="#D92139"/>
                </svg>
              </span>
            </span>
            <span class="licenses-page-sec__title-row">
              <span class="licenses-page-sec__title-decor" aria-hidden="true"></span>
              центра «УЦЦР»
            </span>
          </h1>
        </div>

        <p class="licenses-page-sec__lead">
          <b>Учебный центр «УЦЦР»</b> осуществляет обучение по программам дополнительного профессионального образования и специализированным направлениям подготовки в соответствии с действующими требованиями законодательства. На странице представлены основные аккредитации, лицензии и разрешительные документы учебного центра.
        </p>
      </div>

      <div class="licenses-page-sec__list">
        <article v-for="(item, index) in items" :key="item.title + index" class="license-doc">
          <span class="license-doc__line license-doc__line--1" aria-hidden="true"></span>
          <span class="license-doc__line license-doc__line--2" aria-hidden="true"></span>
          <span class="license-doc__line license-doc__line--3" aria-hidden="true"></span>
          <span class="license-doc__line license-doc__line--4" aria-hidden="true"></span>

          <button
            class="license-doc__preview"
            type="button"
            :aria-label="`Открыть: ${item.title}`"
            @click="openLicense(index)"
          >
            <img class="license-doc__image" :src="item.image" :alt="item.title">
            <span class="license-doc__zoom" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="currentColor"/>
              </svg>
            </span>
          </button>

          <div class="license-doc__body">
            <h2 class="license-doc__title">{{ item.title }}</h2>
            <div class="license-doc__text">
              <p>
                <b>Учебный центр “УЦЦР”</b> соответствует требованиям постановления Правительства Российской Федерации от 16 декабря 2021 г. <b>№ 2334</b> и аккредитован для обучения работодателей и работников вопросам охраны труда.
              </p>
              <p>
                <b>Регистрационный номер в реестре: 9787</b><br>
                Данные о работниках, прошедших проверку знаний требований охраны труда вносятся в реестр <b>ЕИСОТ</b>.
              </p>
            </div>
            <ButtonsBtnPill title="Проверить лицензию" type="link" :to="item.href" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import license2 from '~/assets/images/licenses/license-2.png'
import license3 from '~/assets/images/licenses/license-3.png'
import license4 from '~/assets/images/licenses/license-4.png'

const items = [
  { title: 'Аккредитация Минтруда России', image: license4, href: '#' },
  { title: 'Лицензия Министерства Образования', image: license2, href: '#' },
  { title: 'Аккредитация Минтруда России', image: license3, href: '#' },
]

const openLicense = async (index) => {
  const { Fancybox } = await import('@fancyapps/ui')
  Fancybox.show(
    items.map((item) => ({
      src: item.image,
      type: 'image',
      caption: item.title,
    })),
    { startIndex: index },
  )
}
</script>
