<template>
  <main v-if="direction" class="catalog-page">
    <SectionsDirectionHero :direction="direction" :hero="direction.hero_section" catalog />
    <SectionsCatalogSec :direction="direction" />
    <SectionsDirectionDocSec />
    <SectionsTeamSec />
    <SectionsReviewsSec />
    <SectionsFaqSec />
    <SectionsAboutSec />
    <SectionsFormSec />
  </main>
</template>

<script setup>
import { isKnownCitySlug } from '~/utils/fetchCities'

definePageMeta({
  validate: (route) => isKnownCitySlug(String(route.params.city || '')),
})

const route = useRoute()
const config = useRuntimeConfig()
const { data: cities } = await useCities()

const city = computed(() =>
  (cities.value || []).find((item) => item.slug === route.params.city) || null,
)

if (!city.value) {
  throw createError({ statusCode: 404, statusMessage: 'Город не найден' })
}

const { data: directionResponse } = await useFetch(`${config.public.strapiUrl}/api/directions`, {
  key: () => `catalog-direction-${route.params.city}-${route.params.id}`,
  query: {
    'filters[slug][$eq]': route.params.id,
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'populate[hero_section][populate]': '*',
  },
})

const direction = computed(() => directionResponse.value?.data?.[0] || null)

if (!direction.value) {
  throw createError({ statusCode: 404, statusMessage: 'Направление не найдено' })
}

useSeoMeta({
  title: () => `Каталог — ${direction.value?.title}`,
})
</script>
