<template>
  <main class="about-page">
    <SectionsAboutHero :data="about" />
    <SectionsPrinciplesSec />
    <SectionsDirectionsSec />
    <SectionsLogosSec :items="about?.partners || []" />
    <SectionsReviewsSec />
    <SectionsVideoReviewsSec />
    <SectionsTeamSec />
    <SectionsLicensesSec :items="about?.licenses_lists || []" />
    <SectionsFormSec />
  </main>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: aboutResponse } = await useFetch(`${config.public.strapiUrl}/api/about`, {
  key: 'about-page',
  query: {
    'populate[about_hero_section][populate][image]': true,
    'populate[about_hero_section][populate][about_items]': true,
    'populate[partners][populate][logo]': true,
    'populate[licenses_lists][populate][photo]': true,
  },
})

const about = computed(() => aboutResponse.value?.data || null)

useSeoMeta({
  title: 'О компании',
})
</script>
