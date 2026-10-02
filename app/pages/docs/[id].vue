<template>
  <main class="docs-page">
    <section class="docs">
      <div class="text-content">
        <h1 v-if="doc.title">{{ doc.title }}</h1>
        <div v-if="textHtml" v-html="textHtml"></div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { marked } from 'marked'

const route = useRoute()
const config = useRuntimeConfig()
const slug = computed(() => String(route.params.id || ''))

marked.setOptions({
  breaks: true,
  gfm: true,
})

const { data: docsResponse } = await useFetch(`${config.public.strapiUrl}/api/docs-pages`, {
  key: () => `docs-page-${slug.value}`,
  query: computed(() => ({
    'filters[slug][$eq]': slug.value,
    'pagination[pageSize]': 1,
  })),
})

const doc = computed(() => docsResponse.value?.data?.[0] || null)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Документ не найден' })
}

const textHtml = computed(() => {
  if (!doc.value?.text) return ''
  return marked.parse(String(doc.value.text))
})

useSeoMeta({
  title: () => doc.value?.title || 'Документ',
})
</script>
