<template>
  <main class="contacts-page">
    <SectionsContactsSec :contact="contact" />
    <SectionsFormSec />
  </main>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: contactResponse } = await useFetch(`${config.public.strapiUrl}/api/contact`, {
  key: 'contact',
  query: {
    'populate[socials_media]': true,
    'populate[map_icon]': true,
  },
})

const contact = computed(() => contactResponse.value?.data || null)

useSeoMeta({
  title: 'Контакты',
})
</script>
