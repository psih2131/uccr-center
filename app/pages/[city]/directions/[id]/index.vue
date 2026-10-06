<script setup>
import { isKnownCitySlug } from '~/utils/fetchCities'

definePageMeta({
  validate: (route) => isKnownCitySlug(String(route.params.city || '')),
})

const route = useRoute()

await navigateTo(`/${route.params.city}/${route.params.id}`, {
  redirectCode: 301,
})
</script>
