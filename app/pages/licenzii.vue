<template>
  <main class="licenses-page">
    <SectionsLicensesPageSec :page="licensePage" :items="licenses" />
    <SectionsFaqSec :items="licensePage?.faq_sec || []" />
    <SectionsAboutSec />
    <SectionsFormSec />
  </main>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: licenseResponse } = await useFetch(`${config.public.strapiUrl}/api/license`, {
  key: 'license-page',
  query: {
    'populate[faq_sec]': true,
  },
})

const { data: licensesResponse } = await useFetch(`${config.public.strapiUrl}/api/licenses-lists`, {
  key: 'licenses-lists',
  query: {
    'populate[photo]': true,
  },
})

const licensePage = computed(() => licenseResponse.value?.data || null)
const licenses = computed(() => licensesResponse.value?.data || [])

useSeoMeta({
  title: 'Лицензии',
})
</script>
