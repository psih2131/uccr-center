<template>
  <main class="docs-page">
    <section class="docs">
      <div class="text-content" v-html="doc.html"></div>
    </section>
  </main>
</template>

<script setup>
import { getDocBySlug } from '~/data/docs'

const route = useRoute()
const doc = computed(() => getDocBySlug(route.params.id))

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Документ не найден' })
}

useSeoMeta({
  title: () => doc.value?.title,
})
</script>
