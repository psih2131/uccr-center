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
          <h1 v-if="page?.page_title" class="licenses-page-sec__title">
            <span class="licenses-page-sec__title-row">
              <span v-html="formatTitle(page.page_title)"></span>
              <span class="licenses-page-sec__title-plus" aria-hidden="true">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
                  <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
                </svg>
              </span>
            </span>
          </h1>
        </div>

        <p
          v-if="page?.page_subtitle"
          class="licenses-page-sec__lead"
          v-html="page.page_subtitle"
        ></p>
      </div>

      <div v-if="licenses.length" class="licenses-page-sec__list">
        <article
          v-for="(item, index) in licenses"
          :key="item.id || item.title || index"
          class="license-doc"
        >
          <span class="license-doc__line license-doc__line--1" aria-hidden="true"></span>
          <span class="license-doc__line license-doc__line--2" aria-hidden="true"></span>
          <span class="license-doc__line license-doc__line--3" aria-hidden="true"></span>
          <span class="license-doc__line license-doc__line--4" aria-hidden="true"></span>

          <button
            v-if="item.image"
            class="license-doc__preview"
            type="button"
            :aria-label="`Открыть: ${item.title}`"
            @click="openLicense(index)"
          >
            <img class="license-doc__image" :src="item.image" :alt="item.title || ''">
            <span class="license-doc__zoom" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="currentColor"/>
              </svg>
            </span>
          </button>

          <div class="license-doc__body">
            <h2 v-if="item.title" class="license-doc__title">{{ item.title }}</h2>
            <div v-if="item.text" class="license-doc__text" v-html="item.text"></div>
            <ButtonsBtnPill
              v-if="item.link"
              title="Проверить лицензию"
              type="link"
              :to="item.link"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { marked } from 'marked'

const props = defineProps({
  page: {
    type: Object,
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const config = useRuntimeConfig()

marked.setOptions({
  breaks: true,
  gfm: true,
})

function formatTitle(title) {
  return String(title || '').replaceAll(
    '{{}}',
    '<span class="licenses-page-sec__title-decor" aria-hidden="true"></span>',
  )
}

function renderMarkdown(value) {
  if (!value) return ''
  return marked.parse(String(value))
}

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

const licenses = computed(() =>
  (props.items || []).map((item) => ({
    id: item.id,
    title: item.title || '',
    text: renderMarkdown(item.text),
    link: item.link || '',
    image: mediaUrl(item.photo),
  })),
)

const openLicense = async (index) => {
  const gallery = licenses.value
    .filter((item) => item.image)
    .map((item) => ({
      src: item.image,
      type: 'image',
      caption: item.title,
    }))

  if (!gallery.length) return

  const { Fancybox } = await import('@fancyapps/ui')
  Fancybox.show(gallery, { startIndex: index })
}
</script>
