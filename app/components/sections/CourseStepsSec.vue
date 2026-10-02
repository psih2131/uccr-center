<template>
  <section v-if="steps.length" class="course-steps">
    <div class="container">
      <h2 class="section-title">Как пройти обучение</h2>

      <div class="course-steps__grid">
        <article v-for="item in steps" :key="item.id || item.num" class="course-step">
          <span class="course-step__num">№{{ item.num }}</span>
          <h3 class="course-step__title">{{ item.title }}</h3>
          <p class="course-step__text">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: stepsSection } = await useFetch(`${config.public.strapiUrl}/api/course-staps-section`, {
  key: 'course-staps-section',
  query: {
    'populate[staps_item]': true,
  },
})

const steps = computed(() =>
  (stepsSection.value?.data?.staps_item || []).map((item, index) => ({
    id: item.id,
    num: String(index + 1).padStart(2, '0'),
    title: item.title || '',
    text: item.subtitle || '',
  })),
)
</script>
