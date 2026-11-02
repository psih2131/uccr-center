<template>
  <section v-if="html" class="course-seo-text-down">
    <div class="container">
      <div class="course-seo-text-down__box text-content" v-html="html" />
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
</script>
