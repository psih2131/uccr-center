<template>
  <main class="catalog-page">
    <SectionsDirectionHero :direction="direction" catalog />
    <SectionsCatalogSec />
    <SectionsDirectionDocSec />
    <SectionsTeamSec />
    <SectionsReviewsSec />
    <SectionsFaqSec />
    <SectionsAboutSec />
    <SectionsFormSec />
  </main>
</template>

<script setup>
import { getDirectionBySlug } from '~/data/directions'

const route = useRoute()
const direction = computed(() => getDirectionBySlug(route.params.id))

if (!direction.value) {
  throw createError({ statusCode: 404, statusMessage: 'Направление не найдено' })
}

useSeoMeta({
  title: () => `Каталог — ${direction.value?.menuTitle}`,
})
</script>
