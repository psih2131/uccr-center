<template>
  <main v-if="direction" class="direction-page">
    <SectionsDirectionHero :direction="direction" :hero="direction.hero_section" />
    <SectionsDirectionSpecsSec
      :section-title="direction.title"
      :total-courses="direction.courses?.count || 0"
      :catalog-to="catalogUrl(direction.slug)"
      :direction-slug="direction.slug"
      :course-ids="(direction.populars_courses || []).map((item) => item.documentId)"
    />
    <SectionsFaqSec :items="direction.faq_sec || []" />
    <SectionsAboutSec />
    <SectionsDirectionDocSec />
    <SectionsTeamSec />
    <SectionsReviewsSec :section="direction.reviews_section" />
    <SectionsVideoReviewsSec />
    <SectionsFormSec />
  </main>
</template>

<script setup>
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const config = useRuntimeConfig()
const { catalogUrl } = useCity()

const { data: directionResponse } = await useFetch(`${config.public.strapiUrl}/api/directions`, {
  key: () => `direction-${props.slug}`,
  query: computed(() => ({
    'filters[slug][$eq]': props.slug,
    'populate[hero_section][populate]': '*',
    'populate[faq_sec]': '*',
    'populate[populars_courses][fields][0]': 'documentId',
    'populate[courses][count]': true,
    'populate[reviews_section][populate][reviews][populate][logo_company]': true,
  })),
})

const direction = computed(() => directionResponse.value?.data?.[0] || null)

if (!direction.value) {
  throw createError({ statusCode: 404, statusMessage: 'Направление не найдено' })
}

useSeoMeta({
  title: () => direction.value?.title,
})
</script>
