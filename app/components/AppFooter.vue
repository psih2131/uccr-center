<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__card footer__card--brand">
          <NuxtLink to="/" class="footer__logo">
            <img :src="logoUrl" alt="УЦЦР">
          </NuxtLink>
          <p v-if="footer?.text" class="footer__about">
            {{ footer.text }}
          </p>
          <span class="footer__rule"></span>
          <div v-if="socials.length" class="footer__socials">
            <a
              v-for="(social, index) in socials"
              :key="index"
              class="footer__social"
              :href="social.url || '#'"
              :aria-label="social.name || 'Соцсеть'"
              target="_blank"
              rel="noopener noreferrer"
              v-html="social.svg_icon_code"
            ></a>
          </div>
          <span class="footer__rule"></span>
          <p class="footer__hot">Горячая линия</p>
          <div v-if="phones.length" class="footer__phones">
            <a
              v-for="(phone, index) in phones"
              :key="index"
              :href="phoneHref(phone)"
            >
              {{ phone }}
            </a>
          </div>
          <a
            v-if="footer?.email"
            class="footer__mail"
            :href="`mailto:${footer.email}`"
          >
            {{ footer.email }}
          </a>
        </div>

        <div class="footer__card footer__card--services">
          <h3 class="footer__title">Услуги и программы</h3>
          <span class="footer__rule"></span>
          <ul class="footer__list">
            <li v-for="item in directions" :key="item.slug">
              <NuxtLink
                :to="directionUrl(item.slug)"
                :class="{ 'footer__link--active': isDirectionPath(item.slug) }"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer__card footer__card--nav">
          <h3 class="footer__title">Навигация по сайту</h3>
          <span class="footer__rule"></span>
          <ul class="footer__list">
            <li><NuxtLink to="/">Главная</NuxtLink></li>
            <li><NuxtLink to="/o-kompanii">О компании</NuxtLink></li>
            <li><NuxtLink to="/licenzii">Лицензии</NuxtLink></li>
            <li><NuxtLink to="/kontakty" class="footer__link--active">Контакты</NuxtLink></li>
            <li><NuxtLink to="/blog">Блог</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p v-if="footer?.copy_text" class="footer__copy">{{ footer.copy_text }}</p>
        <div v-if="docsPages.length" class="footer__legal">
          <NuxtLink
            v-for="(doc, index) in docsPages"
            :key="doc.slug"
            :to="`/docs/${doc.slug}`"
            :class="index === 0 ? 'footer__cookie' : 'footer__policy'"
          >
            {{ doc.title }}
          </NuxtLink>
        </div>
      </div>

      <div class="footer__credit">
        Разработка дизайна:
        <a href="https://kuzmich-agency.com/" target="_blank" rel="noopener">Kuzmich agency</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import defaultLogo from '@/assets/images/logo.png'

defineProps({
  directions: {
    type: Array,
    default: () => [],
  },
})

const config = useRuntimeConfig()
const { directionUrl, isDirectionPath } = useCity()

const { data: footerResponse } = await useFetch(`${config.public.strapiUrl}/api/footer-component`, {
  key: 'footer-component',
  query: {
    'populate[logo]': true,
    'populate[socials_media_links]': true,
  },
})

const { data: docsResponse } = await useFetch(`${config.public.strapiUrl}/api/docs-pages`, {
  key: 'docs-pages-nav',
  query: {
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'pagination[pageSize]': 100,
  },
})

const footer = computed(() => footerResponse.value?.data || null)

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

function phoneHref(phone) {
  return `tel:${String(phone || '').replace(/[^\d+]/g, '')}`
}

const logoUrl = computed(() => mediaUrl(footer.value?.logo) || defaultLogo)

const socials = computed(() =>
  (footer.value?.socials_media_links || []).filter((item) => item?.svg_icon_code),
)

const phones = computed(() =>
  [footer.value?.phone_1, footer.value?.phone_2].filter(Boolean),
)

const docsPages = computed(() =>
  (docsResponse.value?.data || [])
    .filter((item) => item?.slug && item?.title)
    .map((item) => ({
      title: item.title,
      slug: item.slug,
    })),
)
</script>
