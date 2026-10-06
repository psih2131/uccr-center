<template>
  <DirectionPage v-if="cityDirectionSlug" :slug="cityDirectionSlug" />
  <main v-else-if="course" class="course-page">
    <SectionsCourseHero :course="course" :direction="direction" />
    <SectionsCourseProgramSec :items="course.what_waiting_for_section || []" />
    <SectionsCourseOfferSec :course="course" />
    <SectionsCourseTariffsSec :section="course.price_sec_v2" />
    <SectionsCourseStepsSec />
    <SectionsCourseAudienceSec :section="course.for_who_section" />
    <SectionsCourseDocsNeedSec />
    <SectionsDirectionDocSec  />
    <SectionsCourseReviewsSec />
    <SectionsCourseFaqSec />
    <SectionsCourseSimilarSec />
    <SectionsAboutSec />
    <SectionsFormSec />
  </main>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { data: cities } = await useCities()

const cityDirectionSlug = computed(() => {
  const first = String(route.params.id || '')
  const known = (cities.value || []).some((item) => item.slug === first)
  return known ? String(route.params.course || '') : ''
})

const { data: courseResponse } = await useFetch(`${config.public.strapiUrl}/api/courses`, {
  key: () => `course-${route.params.id}-${route.params.course}`,
  immediate: !cityDirectionSlug.value,
  query: computed(() => ({
    'filters[slug][$eq]': route.params.course,
    'populate[page_preview]': true,
    'populate[what_waiting_for_section]': true,
    'populate[direction]': true,
    'populate[price_v1_section][populate][price_item]': true,
    'populate[price_v1_section][populate][docs]': true,
    'populate[price_sec_v2][populate][price_list]': true,
    'populate[for_who_section][populate][for_who_items][populate][image]': true,
  })),
})

const course = computed(() => courseResponse.value?.data?.[0] || null)
const direction = computed(() => course.value?.direction || null)

if (!cityDirectionSlug.value && !course.value) {
  throw createError({ statusCode: 404, statusMessage: 'Курс не найден' })
}

if (!cityDirectionSlug.value && direction.value?.slug && direction.value.slug !== route.params.id) {
  throw createError({ statusCode: 404, statusMessage: 'Курс не найден' })
}

useSeoMeta({
  title: () => course.value?.title,
})
</script>
