<template>
  <DirectionPage v-if="!city && directionSlug" :slug="directionSlug" />
  <main v-else class="home-page">
    <SectionsHomeHero :data="home" />
    <SectionsDirectionsSec />
    <SectionsAboutSec />
    <SectionsFormSec />
    <SectionsProgramsSec :items="home?.popular_programs_sections || []" />
    <SectionsTeamSec />
    <SectionsReviewsSec :reviews="home?.review_home_sections || []" />
    <SectionsVideoReviewsSec />
    <SectionsPrinciplesSec />
    <SectionsFaqSec :items="home?.faq_sections || []" />
    <SectionsLogosSec :items="home?.partners_section || []" />
    <SectionsArticlesSec :items="home?.home_news_sections || []" />
  </main>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { data: cities } = await useCities()

const directionSlug = computed(() => String(route.params.city || ''))
const city = computed(() =>
  (cities.value || []).find((item) => item.slug === directionSlug.value) || null,
)

const { data: homeResponse } = await useFetch(`${config.public.strapiUrl}/api/home`, {
  key: 'home-page',
  immediate: Boolean(city.value),
  watch: [city],
  query: {
    'populate[hero_sec][populate][box_4_socials]': true,
    'populate[hero_sec][populate][box_1_image]': true,
    'populate[hero_sec][populate][box_4_image]': true,
    'populate[popular_programs_sections][populate][direction]': true,
    'populate[review_home_sections][populate][logo_company]': true,
    'populate[faq_sections]': true,
    'populate[partners_section][populate][logo]': true,
    'populate[home_news_sections][populate][image]': true,
    'populate[home_news_sections][populate][blog_categories]': true,
  },
})

const home = computed(() => homeResponse.value?.data || null)

useSeoMeta({
  title: () => (city.value ? `УЦЦР — ${city.value.title}` : undefined),
})
</script>
