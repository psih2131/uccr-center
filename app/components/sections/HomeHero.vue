<template>
  <section class="hero">
    <div class="container">
      <div class="hero__top">
        <h1 v-if="hero?.section_title" class="hero__title">
          <span class="hero__title-row">
            <span v-html="formatTitle(hero.section_title)"></span>
            <span class="hero__title-plus" aria-hidden="true">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
                <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
              </svg>
            </span>
          </span>
        </h1>
        <p
          v-if="hero?.subtitle"
          class="hero__lead"
          v-html="hero.subtitle"
        ></p>
      </div>

      <div class="hero__work">
        <div class="hero__main" :style="mainBgStyle">
          <div class="hero__tags">
            <div class="hero__tags-row">
              <template v-for="(item, index) in tagRows[0]" :key="item.slug">
                <span v-if="index" class="hero__dot"></span>
                <NuxtLink :to="directionUrl(item.slug)" class="hero__tag">{{ item.menuTitle }}</NuxtLink>
              </template>
            </div>
            <div class="hero__tags-row">
              <template v-for="(item, index) in tagRows[1]" :key="item.slug">
                <span v-if="index" class="hero__dot"></span>
                <NuxtLink :to="directionUrl(item.slug)" class="hero__tag">{{ item.menuTitle }}</NuxtLink>
              </template>
            </div>
          </div>
          <div class="hero__main-title-wrapper">
            <h2 v-if="hero?.box1_title" class="hero__main-title">{{ hero.box1_title }}</h2>
            <span class="hero__num">01</span>
          </div>
        </div>

        <NuxtLink to="/o-kompanii" class="hero__col hero__col--about">
          <span class="hero__col-line hero__col-line--h"></span>
          <span class="hero__col-line hero__col-line--v hero__col-line--left"></span>
          <span class="hero__col-line hero__col-line--v hero__col-line--right"></span>
          <span class="hero__col-dot hero__col-dot--red"></span>
          <span class="hero__col-title">{{ hero?.box_2_title || 'О нашей компании' }}</span>
          <span class="hero__num">02</span>
        </NuxtLink>

        <NuxtLink to="/licenzii" class="hero__col hero__col--licenses">
          <span class="hero__col-line hero__col-line--h"></span>
          <span class="hero__col-line hero__col-line--v hero__col-line--left"></span>
          <span class="hero__col-line hero__col-line--v hero__col-line--right"></span>
          <span class="hero__col-dot hero__col-dot--cyan"></span>
          <span class="hero__col-title">{{ hero?.box_3_title || 'Наши лицензии' }}</span>
          <span class="hero__num">03</span>
        </NuxtLink>

        <article class="hero__featured" :style="featuredBgStyle">
          <div class="hero__featured-panel">
            <span class="hero__num">04</span>
            <p
              v-if="hero?.box_4_title"
              class="hero__featured-title"
              v-html="formatFeaturedTitle(hero.box_4_title)"
            ></p>
            <div v-if="socials.length" class="hero__socials">
              <a
                v-for="(social, index) in socials"
                :key="index"
                class="hero__social"
                :href="social.url || '#'"
                :aria-label="social.name || 'Соцсеть'"
                target="_blank"
                rel="noopener noreferrer"
                v-html="social.svg_icon_code"
              ></a>
            </div>
            <div class="hero__contacts">
              <p class="hero__hotline">Горячая линия</p>
              <a
                v-if="hero?.box_4_phone"
                class="hero__phone"
                :href="phoneHref(hero.box_4_phone)"
              >
                {{ hero.box_4_phone }}
              </a>
              <a
                v-if="hero?.box_4_email"
                class="hero__mail"
                :href="`mailto:${hero.box_4_email}`"
              >
                {{ hero.box_4_email }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getDirectionBySlug } from '~/data/directions'

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const config = useRuntimeConfig()
const { directionUrl } = useCity()

const hero = computed(() => props.data?.hero_sec || null)

const socials = computed(() =>
  (hero.value?.box_4_socials || []).filter((item) => item?.svg_icon_code),
)

const tagRows = [
  ['rabochie-professii', 'ohrana-truda', 'perepodgotovka'],
  ['povyshenie-kvalifikacii', 'attestaciya'],
].map((row) => row.map((slug) => getDirectionBySlug(slug)).filter(Boolean))

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

function formatTitle(title) {
  return String(title || '').replaceAll(
    '{{}}',
    '<span class="hero__title-decor" aria-hidden="true"></span>',
  )
}

function formatFeaturedTitle(title) {
  return String(title || '').replace(/\n/g, '<br>')
}

function phoneHref(phone) {
  return `tel:${String(phone || '').replace(/[^\d+]/g, '')}`
}

const mainBgStyle = computed(() => {
  const url = mediaUrl(hero.value?.box_1_image)
  if (!url) return null
  return {
    backgroundImage: `linear-gradient(0deg, rgba(20, 87, 113, 0.83), rgba(20, 87, 113, 0.83)), url(${url})`,
  }
})

const featuredBgStyle = computed(() => {
  const url = mediaUrl(hero.value?.box_4_image)
  if (!url) return null
  return {
    backgroundImage: `url(${url})`,
  }
})
</script>
