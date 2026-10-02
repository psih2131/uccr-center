<template>
  <section v-if="hero" class="about-hero">
    <div class="about-hero__inner">
      <div class="about-hero__grid" aria-hidden="true">
        <span class="about-hero__line about-hero__line--v-left"></span>
        <span class="about-hero__line about-hero__line--v-right"></span>
        <span class="about-hero__line about-hero__line--h-top"></span>
        <span class="about-hero__line about-hero__line--h-1"></span>
        <span class="about-hero__line about-hero__line--h-2"></span>
        <span class="about-hero__line about-hero__line--h-3"></span>
        <span class="about-hero__line about-hero__line--h-4"></span>
        <span class="about-hero__line about-hero__line--v-a"></span>
        <span class="about-hero__line about-hero__line--v-b"></span>
        <span class="about-hero__line about-hero__line--v-c"></span>

        <svg class="about-hero__plus about-hero__plus--lg" width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect x="23" width="4" height="50" rx="2" fill="#145771"/>
          <rect y="27" width="4" height="50" rx="2" transform="rotate(-90 0 27)" fill="#145771"/>
        </svg>

        <svg class="about-hero__plus about-hero__plus--md" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect x="11.9609" width="2.08" height="26" rx="1.04" fill="#D82136"/>
          <rect y="14.0391" width="2.08" height="26" rx="1.04" transform="rotate(-90 0 14.0391)" fill="#D82136"/>
        </svg>

        <span
          v-for="(corner, index) in corners"
          :key="`${corner.x}-${corner.y}-${corner.dir}`"
          class="about-hero__corner"
          :class="[`about-hero__corner--${corner.dir}`, `about-hero__corner--${index + 1}`]"
          :style="{ left: `${corner.x}px`, top: `${corner.y}px` }"
        ></span>
      </div>

      <div class="container about-hero__content">
        <p class="about-hero__crumbs">
          <NuxtLink to="/">Главная</NuxtLink>
          <span> - </span>
          <span class="about-hero__crumbs-current">О компании</span>
        </p>

        <div class="about-hero__main">
          <img
            class="about-hero__photo"
            :src="imageUrl"
            :alt="hero.image?.alternativeText || 'Учебный центр УЦЦР'"
            width="387"
            height="483"
          >

          <div class="about-hero__info">
            <h1 v-if="hero.title" class="about-hero__lead">
              <span class="about-hero__label">
                <span class="about-hero__dot"></span>
                О компании
              </span>
              <span v-html="formatTitle(hero.title)"></span>
              <img
                v-if="!hasTitleDecor"
                class="about-hero__lead-pic"
                :src="heroPill"
                alt=""
                width="97"
                height="37"
              >
            </h1>

            <div
              v-if="textHtml"
              class="about-hero__texts"
              v-html="textHtml"
            ></div>
          </div>
        </div>

        <article
          v-for="(item, index) in stats"
          :key="item.value + index"
          class="about-hero__stat"
          :class="`about-hero__stat--${statIds[index] || 'exp'}`"
        >
          <span class="about-hero__stat-value">{{ item.value }}</span>
          <p class="about-hero__stat-text">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { marked } from 'marked'
import heroImage from '~/assets/images/about/about-hero.png'
import heroPill from '~/assets/images/about/about-hero-pill.png'

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const config = useRuntimeConfig()

marked.setOptions({
  breaks: true,
  gfm: true,
})

const corners = [
  { x: 275, y: 750, dir: 'tl' },
  { x: 834, y: 750, dir: 'tr' },
  { x: 275, y: 859, dir: 'bl' },
  { x: 834, y: 859, dir: 'br' },
  { x: 723, y: 882, dir: 'tl' },
  { x: 1616, y: 882, dir: 'tr' },
  { x: 723, y: 991, dir: 'bl' },
  { x: 1616, y: 991, dir: 'br' },
  { x: 275, y: 1014, dir: 'tl' },
  { x: 1020, y: 1014, dir: 'tr' },
  { x: 275, y: 1125, dir: 'bl' },
  { x: 1020, y: 1125, dir: 'br' },
]

const statIds = ['exp', 'partners', 'offices']

const hero = computed(() => props.data?.about_hero_section || null)

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

const hasTitleDecor = computed(() => String(hero.value?.title || '').includes('{{}}'))

function formatTitle(title) {
  return String(title || '').replaceAll(
    '{{}}',
    `<img class="about-hero__lead-pic" src="${heroPill}" alt="" width="97" height="37">`,
  )
}

const imageUrl = computed(() => mediaUrl(hero.value?.image) || heroImage)

const textHtml = computed(() => {
  const text = hero.value?.text
  if (!text) return ''
  return marked.parse(String(text))
})

const stats = computed(() =>
  (hero.value?.about_items || []).filter((item) => item?.value || item?.text),
)
</script>
