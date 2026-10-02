<template>
  <main class="home-page">
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
const config = useRuntimeConfig()

const { data: homeResponse } = await useFetch(`${config.public.strapiUrl}/api/home`, {
  key: 'home-page',
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
</script>
