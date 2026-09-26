<template>
  <section class="direction-doc">
    <div class="container">
      <div class="direction-doc__box">
        <button class="direction-doc__preview" type="button" aria-label="Открыть образец документа" @click="openLicense">
          <svg class="direction-doc__plus direction-doc__plus--tl" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
            <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#FFFFFF"/>
            <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#FFFFFF"/>
          </svg>
          <svg class="direction-doc__plus direction-doc__plus--br" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
            <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#FFFFFF"/>
            <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#FFFFFF"/>
          </svg>
          <span class="direction-doc__edge direction-doc__edge--v1"></span>
          <span class="direction-doc__edge direction-doc__edge--v2"></span>
          <span class="direction-doc__edge direction-doc__edge--h1"></span>
          <span class="direction-doc__edge direction-doc__edge--h2"></span>
          <img :src="licenseImage" alt="Образец документа">
          <span class="direction-doc__zoom" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="currentColor"/>
            </svg>
          </span>
        </button>

        <div class="direction-doc__content">
          <svg class="direction-doc__plus direction-doc__plus--content-t" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
            <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
            <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
          </svg>
          <svg class="direction-doc__plus direction-doc__plus--content-b" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
            <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#145771"/>
            <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#145771"/>
          </svg>

          <h2 class="direction-doc__title">{{ title }}</h2>
          <p class="direction-doc__text">
            Диплом о профпереподготовке подтверждает, что дополнительная квалификация, отраженная в документе, равносильна основной специальности, как это предусмотрено законодательством. Что, в свою очередь, предоставляет право на осуществление определенного вида профессиональной деятельности.
          </p>
          <p class="direction-doc__note">
            Мы гарантируем 100% принятие документов работодателями и госструктурами, после прохождения курса вы получите:
          </p>
          <ul class="direction-doc__list">
            <li v-for="item in items" :key="item">
              <span class="direction-doc__check" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M3.5 8.5L7 12L13.5 5" stroke="#F3F9F6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import licenseImage from '~/assets/images/licenses/license-dir.png'

const openLicense = async () => {
  const { Fancybox } = await import('@fancyapps/ui')
  Fancybox.show(
    [{ src: licenseImage, type: 'image', caption: 'Образец документа' }],
  )
}

defineProps({
  title: {
    type: String,
    default: 'Образец документа после прохождения курсов',
  },
})

const items = [
  'Работаем на основании Лицензии Министерства Образования',
  'До оплаты можете ознакомиться с учебным планом',
  'Все сведения вносим в ФИС ФРДО',
  'Рассрочка 0% на все курсы',
]
</script>
