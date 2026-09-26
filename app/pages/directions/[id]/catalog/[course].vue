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
import { getCourseBySlug } from '~/data/courses'
import { getDirectionBySlug } from '~/data/directions'

const route = useRoute()
const direction = computed(() => getDirectionBySlug(route.params.id))
const course = computed(() => getCourseBySlug(route.params.course))

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
