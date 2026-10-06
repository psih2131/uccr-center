<script setup>
const route = useRoute()

await navigateTo(`/${route.params.id}/${route.params.course}`, {
  redirectCode: 301,
})
</script>
