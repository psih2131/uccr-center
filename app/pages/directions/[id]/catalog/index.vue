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
const route = useRoute()
const config = useRuntimeConfig()

const { data: directionResponse } = await useFetch(`${config.public.strapiUrl}/api/directions`, {
  key: () => `catalog-direction-${route.params.id}`,
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
