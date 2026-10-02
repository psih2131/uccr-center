<template>
  <section v-if="docs.length" class="course-docs">
    <div class="container">
      <h2 class="section-title course-docs__title">Какие документы нужны?</h2>

      <div class="course-docs__grid">
        <article v-for="item in docs" :key="item.id || item.title" class="course-docs__card">
          <span class="course-docs__line course-docs__line--v1" aria-hidden="true"></span>
          <span class="course-docs__line course-docs__line--v2" aria-hidden="true"></span>

          <span v-if="item.icon" class="course-docs__icon">
            <img :src="item.icon" alt="" width="60" height="60">
          </span>

          <h3>{{ item.title }}</h3>

          <div v-if="item.text" class="course-docs__text" v-html="item.text"></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: docsSection } = await useFetch(`${config.public.strapiUrl}/api/course-docs-list-sec`, {
  key: 'course-docs-list-sec',
  query: {
    'populate[docs_items][populate][icon]': true,
  },
})

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

const docs = computed(() =>
  (docsSection.value?.data?.docs_items || []).map((item) => ({
    id: item.id,
    title: item.title || '',
    text: item.text || '',
    icon: mediaUrl(item.icon),
  })),
)
</script>
