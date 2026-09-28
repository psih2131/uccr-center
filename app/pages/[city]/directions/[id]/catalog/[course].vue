<template>
  <main class="course-page">
    <SectionsCourseHero :course="course" :direction="direction" />
    <SectionsCourseProgramSec />
    <SectionsCourseOfferSec :course="course" />
    <SectionsCourseTariffsSec />
    <SectionsCourseStepsSec />
    <SectionsCourseAudienceSec />
    <SectionsCourseDocsNeedSec />
    <SectionsDirectionDocSec title="Документ подтверждающий прохождение курса" />
    <SectionsReviewsSec />
    <SectionsFaqSec />
    <SectionsCourseSimilarSec />
    <SectionsAboutSec />
    <SectionsFormSec />
  </main>
</template>

<script setup>
import { getCityBySlug } from '~/data/cities'
import { getCourseBySlug } from '~/data/courses'
import { getDirectionBySlug } from '~/data/directions'

definePageMeta({
  validate: (route) => Boolean(getCityBySlug(String(route.params.city || ''))),
})

const route = useRoute()

const city = computed(() => getCityBySlug(route.params.city))
const direction = computed(() => getDirectionBySlug(route.params.id))
const course = computed(() => getCourseBySlug(route.params.course))

if (!city.value) {
  throw createError({ statusCode: 404, statusMessage: 'Город не найден' })
}

if (!direction.value) {
  throw createError({ statusCode: 404, statusMessage: 'Направление не найдено' })
}

if (!course.value) {
  throw createError({ statusCode: 404, statusMessage: 'Курс не найден' })
}

useSeoMeta({
  title: () => course.value?.shortTitle,
})
</script>
