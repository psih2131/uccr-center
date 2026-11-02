<template>
  <section v-if="html" class="course-seo-text">
    <div class="container">
      <h2 class="section-title course-seo-text__title">Подробнее о курсе</h2>

      <div
        class="course-seo-text__card"
        :class="{
          'course-seo-text__card--open': isOpen,
          'course-seo-text__card--collapsed': needToggle && !isOpen,
        }"
      >
        <div ref="bodyRef" class="course-seo-text__body">
          <div class="course-seo-text__box text-content" v-html="html" />
        </div>

        <div v-if="needToggle && !isOpen" class="course-seo-text__fade" aria-hidden="true" />

        <div v-if="needToggle" class="course-seo-text__action">
          <button
            class="course-seo-text__toggle"
            type="button"
            :aria-expanded="isOpen"
            @click="toggle"
          >
            <span>{{ isOpen ? 'Свернуть' : 'Читать полностью' }}</span>
            <span class="course-seo-text__toggle-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.41 7.16a.83.83 0 0 1 1.18 0L10 11.57l4.41-4.41a.83.83 0 1 1 1.18 1.18l-5 5a.83.83 0 0 1-1.18 0l-5-5a.83.83 0 0 1 0-1.18Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

const html = computed(() => {
  const value = String(props.content || '').trim()
  return value || ''
})

const bodyRef = ref(null)
const isOpen = ref(false)
const needToggle = ref(false)
const MAX_HEIGHT = 600

const measure = () => {
  const el = bodyRef.value
  if (!el) return
  needToggle.value = el.scrollHeight > MAX_HEIGHT + 8
  if (!needToggle.value) isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  nextTick(() => {
    measure()
    requestAnimationFrame(measure)
  })
})

watch(html, async () => {
  isOpen.value = false
  await nextTick()
  measure()
})
</script>
