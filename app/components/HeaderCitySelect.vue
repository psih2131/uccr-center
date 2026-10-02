<template>
  <div class="header-city" :class="{ 'header-city--open': isOpen }" ref="rootRef">
    <button
      class="header-city__btn"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <span class="header-city__name">{{ currentLabel }}</span>
      <svg class="header-city__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 5L7 9L11 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-if="isOpen" class="header-city__dropdown" role="listbox">
      <button
        v-for="item in options"
        :key="item.slug || 'default'"
        type="button"
        class="header-city__option"
        :class="{ 'header-city__option--active': item.slug === selectedSlug }"
        role="option"
        :aria-selected="item.slug === selectedSlug"
        @click="selectCity(item.slug)"
      >
        {{ item.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
const { data: cities } = await useCities()

const options = computed(() => [
  { slug: null, title: 'Выберите город' },
  ...(cities.value || []),
])

const route = useRoute()
const { citySlug, pathForCity } = useCity()

const isOpen = ref(false)
const rootRef = ref(null)

const selectedSlug = computed(() => citySlug.value || null)

const currentLabel = computed(() => {
  if (!selectedSlug.value) return 'Выберите город'
  return cities.value?.find((item) => item.slug === selectedSlug.value)?.title || 'Выберите город'
})

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function selectCity(nextSlug) {
  if (nextSlug === selectedSlug.value) {
    close()
    return
  }

  close()

  navigateTo({
    path: pathForCity(nextSlug),
    query: route.query,
  })
}

function onDocPointer(event) {
  if (!isOpen.value) return
  if (rootRef.value?.contains(event.target)) return
  close()
}

watch(() => route.fullPath, close)

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointer)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointer)
})
</script>
