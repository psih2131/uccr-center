<template>
  <section v-if="contact" class="contacts">
    <div class="container">
      <div class="contacts__head">
        <p class="contacts__crumbs">
          <NuxtLink to="/">Главная</NuxtLink>
          <span> - </span>
          <span class="contacts__crumbs-current">Контакты</span>
        </p>
        <h1 class="contacts__title">
          Наши
          <span class="contacts__title-decor" aria-hidden="true"></span>
          контакты
          <span class="contacts__title-plus" aria-hidden="true">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
              <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
            </svg>
          </span>
        </h1>
      </div>

      <div class="contacts__cards">
        <a v-if="contact.phone" class="contacts-card" :href="phoneHref">
          <span class="contacts-card__label">Номер телефона</span>
          <span class="contacts-card__value">{{ contact.phone }}</span>
        </a>

        <a v-if="contact.email_adress" class="contacts-card" :href="`mailto:${contact.email_adress}`">
          <span class="contacts-card__label">Рабочий email</span>
          <span class="contacts-card__value">{{ contact.email_adress }}</span>
        </a>

        <div v-if="contact.address" class="contacts-card">
          <span class="contacts-card__label">Адрес</span>
          <span class="contacts-card__value contacts-card__value--address" v-html="formattedAddress"></span>
        </div>

        <div v-if="contact.time_work" class="contacts-card">
          <span class="contacts-card__label">Режим работы</span>
          <span class="contacts-card__value">{{ contact.time_work }}</span>
        </div>

        <div v-if="socials.length" class="contacts-card contacts-card--messengers">
          <span class="contacts-card__label">мессенджеры</span>
          <div class="contacts-card__messengers">
            <a
              v-for="(social, index) in socials"
              :key="index"
              :href="social.url || '#'"
              :aria-label="social.name || 'Соцсеть'"
              class="contacts_item"
              target="_blank"
              rel="noopener noreferrer"
              v-html="social.svg_icon_code"
            ></a>
          </div>
        </div>
      </div>

      <div class="contacts-map">
        <div class="contacts-map__canvas">
          <SectionsContactsMap
            :coordinates="mapCoordinates"
            :icon="mapIcon"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  contact: {
    type: Object,
    default: null,
  },
})

const config = useRuntimeConfig()

const phoneHref = computed(() => {
  const phone = props.contact?.phone || ''
  return `tel:${phone.replace(/[^\d+]/g, '')}`
})

const formattedAddress = computed(() =>
  String(props.contact?.address || '').replace(/\n/g, '<br>'),
)

const socials = computed(() => props.contact?.socials_media || [])

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

const mapIcon = computed(() => mediaUrl(props.contact?.map_icon))

// Strapi: "lat, lng" → Yandex: [lng, lat]
const mapCoordinates = computed(() => {
  const raw = String(props.contact?.map_location || '').trim()
  if (!raw) return null

  const parts = raw.split(',').map((part) => Number(part.trim()))
  if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) return null

  const [lat, lng] = parts
  return [lng, lat]
})
</script>
