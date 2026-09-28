<template>
  <main class="home-page">
    <SectionsHomeHero />
    <SectionsDirectionsSec />
    <SectionsAboutSec />
    <SectionsFormSec />
    <SectionsProgramsSec />
    <SectionsTeamSec />
    <SectionsReviewsSec />
    <SectionsVideoReviewsSec />
    <SectionsPrinciplesSec />
    <SectionsFaqSec />
    <SectionsLogosSec />
    <SectionsArticlesSec />
  </main>
</template>

<script setup>
import { getCityBySlug } from '~/data/cities'

definePageMeta({
  validate: (route) => Boolean(getCityBySlug(String(route.params.city || ''))),
})

const route = useRoute()
const city = computed(() => getCityBySlug(route.params.city))

if (!city.value) {
  throw createError({ statusCode: 404, statusMessage: 'Город не найден' })
}

useSeoMeta({
  title: () => `УЦЦР — ${city.value?.name}`,
})
</script>
