<template>
  <div
    class="header__search"
    :class="{
      'header__search--focus': searchFocus || Boolean(search.trim()),
      'header__search--open': isDropdownOpen,
    }"
  >
    <div class="header__search-icon">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83317 2.33464C3.90017 2.33464 2.33317 3.90164 2.33317 5.83464C2.33317 7.76763 3.90017 9.33463 5.83317 9.33463C7.76617 9.33463 9.33317 7.76763 9.33317 5.83464C9.33317 3.90164 7.76617 2.33464 5.83317 2.33464ZM1.1665 5.83464C1.1665 3.25731 3.25584 1.16797 5.83317 1.16797C8.4105 1.16797 10.4998 3.25731 10.4998 5.83464C10.4998 6.91305 10.134 7.90603 9.51975 8.69626L12.6623 11.8388C12.8901 12.0666 12.8901 12.436 12.6623 12.6638C12.4345 12.8916 12.0652 12.8916 11.8374 12.6638L8.6948 9.52122C7.90456 10.1355 6.91159 10.5013 5.83317 10.5013C3.25584 10.5013 1.1665 8.41196 1.1665 5.83464Z" fill="#B8C4DA"/>
      </svg>
    </div>

    <input
      class="header__search-input"
      :class="{ 'header__search-input--clearable': Boolean(search) || isLoading }"
      type="text"
      name="q"
      placeholder="Найти курс"
      autocomplete="off"
      v-model="search"
      @focus="onFocus"
      @blur="onBlur"
    >

    <span v-if="isLoading" class="header__search-loader" aria-label="Загрузка"></span>

    <button
      v-else-if="search"
      class="header__search-clear"
      type="button"
      aria-label="Очистить"
      @mousedown.prevent
      @click="clearSearch"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>

    <div v-if="isDropdownOpen" class="header__search-dropdown">
      <p v-if="isLoading" class="header__search-status">Ищем курсы...</p>
      <p v-else-if="!results.length" class="header__search-status">Ничего не найдено</p>
      <ul v-else class="header__search-list">
        <li v-for="item in results" :key="item.id || item.slug">
          <NuxtLink
            class="header__search-item"
            :to="item.to"
            @mousedown.prevent
            @click="closeDropdown"
          >
            <img
              v-if="item.image"
              class="header__search-item-image"
              :src="item.image"
              :alt="item.title"
            >
            <span class="header__search-item-body">
              <span class="header__search-item-title">{{ item.title }}</span>
              <span class="header__search-item-price">{{ item.price }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const { courseUrl } = useCity()

const search = ref('')
const searchFocus = ref(false)
const isLoading = ref(false)
const results = ref([])
const hasSearched = ref(false)

let debounceTimer = null
let blurTimer = null
let requestId = 0

const query = computed(() => search.value.trim())
const isDropdownOpen = computed(() => searchFocus.value && query.value.length > 0 && hasSearched.value)

function onFocus() {
  if (blurTimer) {
    clearTimeout(blurTimer)
    blurTimer = null
  }
  searchFocus.value = true
}

function onBlur() {
  blurTimer = setTimeout(() => {
    searchFocus.value = false
  }, 150)
}

function closeDropdown() {
  searchFocus.value = false
  search.value = ''
  results.value = []
  hasSearched.value = false
  isLoading.value = false
}

function clearSearch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  requestId += 1
  search.value = ''
  results.value = []
  hasSearched.value = false
  isLoading.value = false
  searchFocus.value = true
}

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

async function searchCourses(value) {
  const currentRequest = ++requestId
  isLoading.value = true
  hasSearched.value = true

  try {
    const response = await $fetch(`${config.public.strapiUrl}/api/courses`, {
      query: {
        'filters[title][$containsi]': value,
        'populate[direction]': true,
        'populate[preview]': true,
        'pagination[pageSize]': 8,
        sort: 'title:asc',
      },
    })

    if (currentRequest !== requestId) return

    results.value = (response?.data || [])
      .filter((item) => item?.slug && item?.title)
      .map((item) => ({
        id: item.documentId || item.id,
        slug: item.slug,
        title: item.title,
        image: mediaUrl(item.preview),
        price: item.default_price != null ? `${item.default_price} ₽` : '—',
        to: courseUrl(item.direction?.slug || 'rabochie-professii', item.slug),
      }))
  } catch (error) {
    if (currentRequest !== requestId) return
    results.value = []
  } finally {
    if (currentRequest === requestId) {
      isLoading.value = false
    }
  }
}

watch(query, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  if (!value) {
    results.value = []
    hasSearched.value = false
    isLoading.value = false
    return
  }

  debounceTimer = setTimeout(() => {
    searchCourses(value)
  }, 1500)
})

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
  if (blurTimer) clearTimeout(blurTimer)
})
</script>
