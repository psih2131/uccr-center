<template>
  <div
    class="alpha-index"
    :class="[`alpha-index--${variant}`, { 'alpha-index--open': isOpen }]"
  >
    <button
      ref="triggerRef"
      type="button"
      class="alpha-index__btn"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @keydown.escape="close"
    >
      <svg class="alpha-index__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M5.83317 2.33464C3.90017 2.33464 2.33317 3.90164 2.33317 5.83464C2.33317 7.76763 3.90017 9.33463 5.83317 9.33463C7.76617 9.33463 9.33317 7.76763 9.33317 5.83464C9.33317 3.90164 7.76617 2.33464 5.83317 2.33464ZM1.1665 5.83464C1.1665 3.25731 3.25584 1.16797 5.83317 1.16797C8.4105 1.16797 10.4998 3.25731 10.4998 5.83464C10.4998 6.91305 10.134 7.90603 9.51975 8.69626L12.6623 11.8388C12.8901 12.0666 12.8901 12.436 12.6623 12.6638C12.4345 12.8916 12.0652 12.8916 11.8374 12.6638L8.6948 9.52122C7.90456 10.1355 6.91159 10.5013 5.83317 10.5013C3.25584 10.5013 1.1665 8.41196 1.1665 5.83464Z" fill="currentColor"/>
      </svg>
      <span class="alpha-index__text">Алфавитный указатель</span>
    </button>

    <Teleport to="body">
      <Transition name="alpha-index">
        <div v-if="isOpen" class="alpha-index-layer">
          <div class="alpha-index-layer__backdrop"></div>

          <div
            ref="panelRef"
            class="alpha-index-layer__panel"
            role="dialog"
            aria-label="Алфавитный указатель"
            :style="panelStyle"
            @mouseenter="onEnter"
            @mouseleave="onLeave"
          >
            <span class="alpha-index-layer__caret" :style="caretStyle" aria-hidden="true"></span>

            <div v-if="showPreloader" class="alpha-index-layer__loader">
              <span class="alpha-index-layer__spinner" aria-hidden="true"></span>
              <p>Загружаем указатель...</p>
            </div>

            <template v-else>
              <div class="alpha-index-layer__tabs">
                <button
                  v-for="category in categories"
                  :key="category.slug"
                  type="button"
                  class="alpha-index-layer__tab"
                  :class="{ 'alpha-index-layer__tab--active': activeCategory === category.slug }"
                  @click="selectCategory(category.slug)"
                >
                  {{ category.title }}
                </button>
              </div>

              <label class="alpha-index-layer__search">
                <input
                  ref="searchRef"
                  v-model="query"
                  type="text"
                  placeholder="Поиск"
                  autocomplete="off"
                  @keydown.escape.stop="close"
                >
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5.83317 2.33464C3.90017 2.33464 2.33317 3.90164 2.33317 5.83464C2.33317 7.76763 3.90017 9.33463 5.83317 9.33463C7.76617 9.33463 9.33317 7.76763 9.33317 5.83464C9.33317 3.90164 7.76617 2.33464 5.83317 2.33464ZM1.1665 5.83464C1.1665 3.25731 3.25584 1.16797 5.83317 1.16797C8.4105 1.16797 10.4998 3.25731 10.4998 5.83464C10.4998 6.91305 10.134 7.90603 9.51975 8.69626L12.6623 11.8388C12.8901 12.0666 12.8901 12.436 12.6623 12.6638C12.4345 12.8916 12.0652 12.8916 11.8374 12.6638L8.6948 9.52122C7.90456 10.1355 6.91159 10.5013 5.83317 10.5013C3.25584 10.5013 1.1665 8.41196 1.1665 5.83464Z" fill="#99AAC9"/>
                </svg>
              </label>

              <div class="alpha-index-layer__letters">
                <button
                  type="button"
                  class="alpha-index-layer__letter"
                  :class="{ 'alpha-index-layer__letter--active': activeLetter === 'all' }"
                  @click="activeLetter = 'all'"
                >
                  Все
                </button>
                <button
                  v-for="letter in alphabeticalLetters"
                  :key="letter"
                  type="button"
                  class="alpha-index-layer__letter"
                  :class="{
                    'alpha-index-layer__letter--active': activeLetter === letter,
                    'alpha-index-layer__letter--disabled': !availableLetters.has(letter),
                  }"
                  :disabled="!availableLetters.has(letter)"
                  @click="activeLetter = letter"
                >
                  {{ letter }}
                </button>
              </div>

              <div v-if="filteredGroups.length" class="alpha-index-layer__content">
                <div
                  v-for="group in filteredGroups"
                  :key="group.letter"
                  class="alpha-index-group"
                >
                  <h3 class="alpha-index-group__letter">{{ group.letter }}</h3>
                  <ul class="alpha-index-group__list">
                    <li v-for="item in group.items" :key="item.courseSlug">
                      <NuxtLink
                        :to="courseUrl(item.directionSlug, item.courseSlug)"
                        class="alpha-index-group__link"
                        @click="close"
                      >
                        {{ item.title }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
              <p v-else class="alpha-index-layer__empty">Ничего не найдено</p>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { alphabeticalLetters } from '~/data/alphabeticalIndex'

defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'header'].includes(value),
  },
})

const config = useRuntimeConfig()
const route = useRoute()
const { courseUrl } = useCity()

const isOpen = ref(false)
const query = ref('')
const activeCategory = ref('')
const activeLetter = ref('all')
const triggerRef = ref(null)
const panelRef = ref(null)
const searchRef = ref(null)
const panelStyle = ref({})
const caretStyle = ref({})

const categories = ref([])
const isLoading = ref(false)
const isLoaded = ref(false)
const showPreloader = ref(false)

let closeTimer = null
let hidePreloaderTimer = null

const currentCategory = computed(
  () => categories.value.find((item) => item.slug === activeCategory.value) || categories.value[0] || null,
)

const availableLetters = computed(() => {
  const q = query.value.trim().toLowerCase()
  const letters = new Set()

  for (const group of currentCategory.value?.groups || []) {
    const items = q
      ? group.items.filter((item) => item.title.toLowerCase().includes(q))
      : group.items
    if (items.length) letters.add(group.letter)
  }

  return letters
})

const filteredGroups = computed(() => {
  const q = query.value.trim().toLowerCase()
  let groups = currentCategory.value?.groups || []

  if (activeLetter.value !== 'all') {
    groups = groups.filter((group) => group.letter === activeLetter.value)
  }

  return groups
    .map((group) => ({
      letter: group.letter,
      items: q
        ? group.items.filter((item) => item.title.toLowerCase().includes(q))
        : group.items,
    }))
    .filter((group) => group.items.length)
})

watch(() => route.fullPath, () => {
  close()
})

watch(query, () => {
  if (activeLetter.value !== 'all' && !availableLetters.value.has(activeLetter.value)) {
    activeLetter.value = 'all'
  }
})

watch(isOpen, (open) => {
  if (!import.meta.client) return

  if (open) {
    nextTick(() => {
      document.addEventListener('pointerdown', onOutsidePointer, true)
    })
    loadData()
  } else {
    document.removeEventListener('pointerdown', onOutsidePointer, true)
    resetFilters()
  }
})

onBeforeUnmount(() => {
  clearTimeout(closeTimer)
  clearTimeout(hidePreloaderTimer)
  detachListeners()
  if (import.meta.client) {
    document.removeEventListener('pointerdown', onOutsidePointer, true)
  }
})

function buildGroups(courses, directionSlug) {
  const map = new Map()

  for (const course of courses) {
    const title = String(course.title || '').trim()
    const courseSlug = course.slug
    if (!title || !courseSlug) continue

    const letter = title[0].toUpperCase()
    if (!map.has(letter)) map.set(letter, [])

    map.get(letter).push({
      title,
      directionSlug,
      courseSlug,
    })
  }

  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'ru'))
    .map(([letter, items]) => ({
      letter,
      items: items.sort((a, b) => a.title.localeCompare(b.title, 'ru')),
    }))
}

async function fetchAllPages(endpoint, query = {}) {
  const pageSize = 100
  const items = []
  let page = 1
  let pageCount = 1

  while (page <= pageCount && page <= 50) {
    const response = await $fetch(`${config.public.strapiUrl}${endpoint}`, {
      query: {
        ...query,
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
      },
    })

    const batch = Array.isArray(response?.data) ? response.data : []
    items.push(...batch)
    pageCount = Number(response?.meta?.pagination?.pageCount) || 1
    page += 1
  }

  return items
}

async function loadData() {
  if (isLoaded.value || isLoading.value) return

  isLoading.value = true
  showPreloader.value = true

  try {
    const [directions, courses] = await Promise.all([
      fetchAllPages('/api/directions', {
        'fields[0]': 'title',
        'fields[1]': 'slug',
        sort: 'title:asc',
      }),
      fetchAllPages('/api/courses', {
        'fields[0]': 'title',
        'fields[1]': 'slug',
        'populate[direction][fields][0]': 'slug',
        'populate[direction][fields][1]': 'title',
        sort: 'title:asc',
      }),
    ])

    const nextCategories = directions
      .filter((item) => item?.slug && item?.title)
      .map((direction) => {
        const directionCourses = courses.filter(
          (course) => course.direction?.slug === direction.slug,
        )

        return {
          slug: direction.slug,
          title: direction.title,
          groups: buildGroups(directionCourses, direction.slug),
        }
      })

    categories.value = nextCategories
    activeCategory.value = nextCategories[0]?.slug || ''
    isLoaded.value = true
  } catch (error) {
    categories.value = []
    activeCategory.value = ''
  } finally {
    isLoading.value = false
    clearTimeout(hidePreloaderTimer)
    hidePreloaderTimer = setTimeout(() => {
      showPreloader.value = false
    }, 300)
  }
}

function selectCategory(slug) {
  activeCategory.value = slug
  activeLetter.value = 'all'
  query.value = ''
}

function resetFilters() {
  query.value = ''
  activeLetter.value = 'all'
  activeCategory.value = categories.value[0]?.slug || ''
}

function attachListeners() {
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)
}

function detachListeners() {
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
}

function onOutsidePointer(event) {
  const target = event.target
  if (triggerRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  close()
}

function open() {
  clearTimeout(closeTimer)
  updatePosition()

  if (isOpen.value) return

  isOpen.value = true
  attachListeners()
  nextTick(updatePosition)
}

function close() {
  clearTimeout(closeTimer)
  if (!isOpen.value) return

  isOpen.value = false
  detachListeners()
}

function onEnter() {
  open()
}

function onLeave() {
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    const overTrigger = triggerRef.value?.matches(':hover')
    const overPanel = panelRef.value?.matches(':hover')
    if (overTrigger || overPanel) return
    close()
  }, 220)
}

function updatePosition() {
  const el = triggerRef.value
  if (!el || !import.meta.client) return

  const rect = el.getBoundingClientRect()
  const gap = 18
  const sidePad = 40
  const width = Math.min(1440, window.innerWidth - sidePad * 2)
  const left = Math.max(sidePad, (window.innerWidth - width) / 2)
  const caretLeft = Math.min(
    Math.max(24, rect.left + rect.width / 2 - left),
    width - 24,
  )

  const nextStyle = {
    top: `${rect.bottom + gap}px`,
    left: `${left}px`,
    width: `${width}px`,
  }

  if (
    panelStyle.value.top !== nextStyle.top
    || panelStyle.value.left !== nextStyle.left
    || panelStyle.value.width !== nextStyle.width
  ) {
    panelStyle.value = nextStyle
  }

  const nextCaret = { left: `${caretLeft}px` }
  if (caretStyle.value.left !== nextCaret.left) {
    caretStyle.value = nextCaret
  }
}
</script>
