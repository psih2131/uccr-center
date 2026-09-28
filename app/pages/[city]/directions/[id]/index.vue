<template>
  <main class="direction-page">
    <SectionsDirectionHero :direction="direction" />
    <SectionsDirectionSpecsSec :catalog-to="catalogUrl(direction.slug)" />
    <SectionsFaqSec />
    <SectionsAboutSec />
    <SectionsDirectionDocSec />
    <SectionsTeamSec />
    <SectionsReviewsSec />
    <SectionsVideoReviewsSec />
    <SectionsFormSec />
  </main>
</template>

<script setup>
import { getCityBySlug } from '~/data/cities'
import { getDirectionBySlug } from '~/data/directions'

definePageMeta({
  validate: (route) => Boolean(getCityBySlug(String(route.params.city || ''))),
})

const route = useRoute()
const { catalogUrl } = useCity()

const city = computed(() => getCityBySlug(route.params.city))
const direction = computed(() => getDirectionBySlug(route.params.id))

if (!city.value) {
  throw createError({ statusCode: 404, statusMessage: 'Город не найден' })
}

if (!direction.value) {
  throw createError({ statusCode: 404, statusMessage: 'Направление не найдено' })
}

useSeoMeta({
  title: () => direction.value?.menuTitle,
})
</script>
