<template>
  <div class="app-wrapper">
    <AppHeader :directions="directions" />
    <slot />
    <AppFooter :directions="directions" />
    <AppCookie />
    <AppPreloader />
    <ModalsAppModals />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: directionsResponse } = await useFetch(`${config.public.strapiUrl}/api/directions`, {
  key: 'layout-directions',
  query: {
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'pagination[pageSize]': 100,
    sort: 'updatedAt:asc',
  },
})

const directions = computed(() =>
  (directionsResponse.value?.data || [])
    .filter((item) => item?.slug && item?.title)
    .map((item) => ({
      title: item.title,
      slug: item.slug,
    })),
)
</script>
