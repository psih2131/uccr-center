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
import { getDirectionBySlug } from '~/data/directions'

const route = useRoute()
const { catalogUrl } = useCity()
const direction = computed(() => getDirectionBySlug(route.params.id))

if (!direction.value) {
  throw createError({ statusCode: 404, statusMessage: 'Направление не найдено' })
}

useSeoMeta({
  title: () => direction.value?.menuTitle,
})
</script>
