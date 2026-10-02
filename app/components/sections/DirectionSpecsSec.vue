<template>
  <section class="direction-specs">
    <div class="container">
      <div class="direction-specs__bar">
        <h2 class="direction-specs__title" v-html="sectionTitle"></h2>
        <p class="direction-specs__meta" v-if="totalCourses">
          Количество специализаций: <b>{{ totalCourses }}</b>
        </p>
        <AlphabeticalIndex />
      </div>

      <div class="direction-specs__grid">
        <CourseCard
          v-for="(course, index) in courses"
          :key="course.documentId || course.id"
          :course="course"
          :index="index"
          :to="courseUrl(directionSlug, course.slug)"
        />
      </div>

      <div class="direction-specs__more">
        <ButtonsBtnPill title="Смотреть все специальности" type="link" :to="resolvedCatalogTo" />
      </div>
    </div>
  </section>
</template>

<script setup>
import CourseCard from '~/components/cards/CourseCard.vue'

const props = defineProps({
  sectionTitle: {
    type: String,
    default: '',
  },
  totalCourses: {
    type: Number,
  },
  catalogTo: {
    type: String,
    default: '',
  },
  directionSlug: {
    type: String,
    default: '',
  },
  courseIds: {
    type: Array,
    default: () => [],
  },
})

const config = useRuntimeConfig()
const { catalogUrl, courseUrl } = useCity()

const resolvedCatalogTo = computed(
  () => props.catalogTo || catalogUrl(props.directionSlug),
)

const courseQuery = { populate: 'preview' }
props.courseIds.forEach((id, index) => {
  courseQuery[`filters[documentId][$in][${index}]`] = id
})

const { data: coursesResponse } = await useFetch(`${config.public.strapiUrl}/api/courses`, {
  key: `popular-courses-${props.courseIds.join('-')}`,
  immediate: props.courseIds.length > 0,
  query: courseQuery,
})

const courses = computed(() => {
  const list = coursesResponse.value?.data || []
  const order = new Map(props.courseIds.map((id, index) => [id, index]))
  return [...list].sort(
    (a, b) => (order.get(a.documentId) ?? 0) - (order.get(b.documentId) ?? 0),
  )
})
</script>
