<template>
  <SectionsBlogListSec
    :active-category-slug="categorySlug"
    :active-category-title="category?.title || ''"
  />
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const categorySlug = computed(() => String(route.params.slug || ''))

const { data: categoryResponse } = await useFetch(`${config.public.strapiUrl}/api/blog-categories`, {
  key: () => `blog-category-${categorySlug.value}`,
  query: computed(() => ({
    'filters[slug][$eq]': categorySlug.value,
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'pagination[pageSize]': 1,
  })),
})

const category = computed(() => categoryResponse.value?.data?.[0] || null)

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Категория не найдена' })
}

useSeoMeta({
  title: () => category.value?.title ? `Блог — ${category.value.title}` : 'Блог',
})
</script>
