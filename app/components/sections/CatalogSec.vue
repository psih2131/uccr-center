<template>
  <section class="catalog">
    <div class="container">
      <div class="catalog__head">
        <h2 class="catalog__title">
          Каталог рабочих профессий:
          <span>{{ selectedName }}</span>
        </h2>
        <div class="catalog__head-actions">
          <button class="catalog__show-all" type="button" @click="showAll">
            показать все
          </button>
          <AlphabeticalIndex />
        </div>
      </div>

      <div class="catalog__body">
        <aside class="catalog__aside">
          <CatalogCategoryNav
            :popular="popular"
            :others="others"
            :selected-id="selectedId"
            @select="selectCategory"
          />
        </aside>

        <div class="catalog__main">
          <div ref="searchBarRef" class="catalog__search-wrap">
            <form class="catalog__search" @submit.prevent="submitSearch">
              <button
                type="button"
                class="catalog__filter-btn"
                :class="{ 'catalog__filter-btn--active': categoriesOpen }"
                :aria-expanded="categoriesOpen"
                aria-controls="catalog-categories-panel"
                @click.stop="toggleCategoriesPanel"
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
                  <path d="M1 3h18M4 9h12M7 15h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                Фильтр
              </button>
              <label class="catalog__search-field">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5.2" stroke="currentColor" stroke-width="1.6"/>
                <path d="M10.4 10.4 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
              <input
                v-model="query"
                type="text"
                placeholder="Поиск по курсам и профессиям"
              >
              <button
                v-if="query || activeSearch"
                class="catalog__search-clear"
                type="button"
                aria-label="Очистить поиск"
                @click="clearSearch"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </label>
              <button class="catalog__search-btn" type="submit">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="5.2" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M10.4 10.4 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
                Поиск
              </button>
            </form>

            <div
              v-if="categoriesOpen"
              id="catalog-categories-panel"
              class="catalog__filter-panel"
            >
              <button type="button" class="catalog__filter-all" @click="pickCategory(null)">
                Все направления
              </button>
              <CatalogCategoryNav
                :popular="popular"
                :others="others"
                :selected-id="selectedId"
                @select="pickCategory"
              />
            </div>
          </div>

          <!--
          <div class="catalog__toolbar">
            <div class="catalog__filters">
              <span class="catalog__filter-icon" aria-hidden="true">
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                  <path d="M1 3h18M4 9h12M7 15h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
              <div class="catalog-select" :class="{ 'catalog-select--open': openFilter === 'format' }">
                <button class="catalog-select__btn" type="button" @click="toggleFilter('format')">
                  {{ formatLabel }}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div v-if="openFilter === 'format'" class="catalog-select__list">
                  <button
                    v-for="option in formatOptions"
                    :key="option"
                    type="button"
                    @click="setFormat(option)"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
              <div class="catalog-select" :class="{ 'catalog-select--open': openFilter === 'term' }">
                <button class="catalog-select__btn" type="button" @click="toggleFilter('term')">
                  {{ termLabel }}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div v-if="openFilter === 'term'" class="catalog-select__list">
                  <button
                    v-for="option in termOptions"
                    :key="option"
                    type="button"
                    @click="setTerm(option)"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>

            <div class="catalog__sort">
              <span class="catalog__filter-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 4h10M3 8h7M3 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
              <div class="catalog-select" :class="{ 'catalog-select--open': openFilter === 'sort' }">
                <button class="catalog-select__btn" type="button" @click="toggleFilter('sort')">
                  {{ sortLabel }}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div v-if="openFilter === 'sort'" class="catalog-select__list">
                  <button
                    v-for="option in sortOptions"
                    :key="option"
                    type="button"
                    @click="setSort(option)"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          -->

          <p v-if="isLoading && !items.length" class="catalog__empty">Загрузка...</p>
          <p v-else-if="!items.length && activeSearch" class="catalog__empty">Ничего не найдено</p>
          <p v-else-if="!items.length" class="catalog__empty">Курсы не найдены</p>

          <div v-else class="catalog__grid">
            <ProgramCard
              v-for="item in items"
              :key="item.id || item.slug"
              :item="item"
            />
          </div>

          <div v-if="hasMore" class="catalog__more">
            <ButtonsBtnPill
              title="Загрузить ещё"
              type="modal"
              @click="loadMore"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CatalogCategoryNav from '~/components/catalog/CatalogCategoryNav.vue'
import ProgramCard from '~/components/cards/ProgramCard.vue'

const PAGE_SIZE = 8
const colors = ['#5DA0BA', '#66AF5E', '#966DC3']

const props = defineProps({
  direction: {
    type: Object,
    required: true,
  },
})

const config = useRuntimeConfig()
const { courseUrl } = useCity()

const directionSlug = computed(() => props.direction?.slug || '')

const selectedId = ref(null)
const categoriesOpen = ref(false)
const searchBarRef = ref(null)
const query = ref('')
const activeSearch = ref('')
const page = ref(1)
const pageCount = ref(1)
const courses = ref([])
const isLoading = ref(false)

const { data: categoriesResponse } = await useFetch(`${config.public.strapiUrl}/api/category-directions`, {
  key: () => `catalog-categories-${directionSlug.value}`,
  query: {
    'filters[direction][slug][$eq]': directionSlug.value,
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'populate[courses][count]': true,
    'pagination[pageSize]': 100,
  },
})

function relationCount(value) {
  if (typeof value?.count === 'number') return value.count
  if (Array.isArray(value)) return value.length
  return 0
}

function formatHours(time) {
  if (!time) return '—'
  return /час/i.test(String(time)) ? time : `${time} часов`
}

const categories = computed(() =>
  (categoriesResponse.value?.data || [])
    .filter((item) => item?.slug && item?.title)
    .map((item) => ({
      id: item.slug,
      name: item.title,
      count: relationCount(item.courses),
    }))
    .sort((a, b) => b.count - a.count),
)

const popular = computed(() => categories.value.slice(0, 5))
const others = computed(() => categories.value.slice(5))

const selectedName = computed(() => {
  if (!selectedId.value) {
    return props.direction?.menuTitle || props.direction?.title || 'Все'
  }

  return categories.value.find((entry) => entry.id === selectedId.value)?.name
    || props.direction?.menuTitle
    || props.direction?.title
    || 'Все'
})

const items = computed(() =>
  courses.value.map((course, index) => ({
    id: course.documentId || course.id || course.slug,
    slug: course.slug,
    category: course.category_direction?.title || props.direction?.title || '',
    title: course.title || '',
    text: course.subtitle || '',
    hours: formatHours(course.time),
    format: course.form_learning || '—',
    price: course.default_price != null ? `${course.default_price} ₽` : '',
    color: colors[index % colors.length],
    to: courseUrl(directionSlug.value, course.slug),
  })),
)

const hasMore = computed(() => page.value < pageCount.value)

function buildCoursesQuery(nextPage) {
  const params = {
    'filters[direction][slug][$eq]': directionSlug.value,
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'fields[2]': 'subtitle',
    'fields[3]': 'time',
    'fields[4]': 'form_learning',
    'fields[5]': 'default_price',
    'populate[category_direction][fields][0]': 'title',
    'populate[category_direction][fields][1]': 'slug',
    'pagination[page]': nextPage,
    'pagination[pageSize]': PAGE_SIZE,
    sort: 'title:asc',
  }

  if (selectedId.value) {
    params['filters[category_direction][slug][$eq]'] = selectedId.value
  }

  if (activeSearch.value) {
    params['filters[title][$containsi]'] = activeSearch.value
  }

  return params
}

let requestId = 0

async function fetchCourses({ reset = false } = {}) {
  if (!directionSlug.value) return
  if (!reset && isLoading.value) return

  const nextPage = reset ? 1 : page.value + 1
  const currentRequest = ++requestId
  isLoading.value = true

  try {
    const response = await $fetch(`${config.public.strapiUrl}/api/courses`, {
      query: buildCoursesQuery(nextPage),
    })

    if (currentRequest !== requestId) return

    const list = response?.data || []
    courses.value = reset ? list : [...courses.value, ...list]
    page.value = nextPage
    pageCount.value = Number(response?.meta?.pagination?.pageCount) || 1
  } catch (error) {
    if (currentRequest !== requestId) return
    if (reset) {
      courses.value = []
      page.value = 1
      pageCount.value = 1
    }
  } finally {
    if (currentRequest === requestId) {
      isLoading.value = false
    }
  }
}

function toggleCategoriesPanel() {
  categoriesOpen.value = !categoriesOpen.value
}

function pickCategory(id) {
  selectCategory(id)
  categoriesOpen.value = false
}

function onDocumentClick(event) {
  if (!categoriesOpen.value) return
  const root = searchBarRef.value
  if (root && !root.contains(event.target)) {
    categoriesOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})

function selectCategory(id) {
  selectedId.value = id
  query.value = ''
  activeSearch.value = ''
}

function showAll() {
  selectedId.value = null
  query.value = ''
  activeSearch.value = ''
}

function submitSearch() {
  if (!selectedId.value) return

  activeSearch.value = query.value.trim()
}

function clearSearch() {
  query.value = ''
  activeSearch.value = ''
}

async function loadMore() {
  if (!hasMore.value || isLoading.value) return
  await fetchCourses({ reset: false })
}

await fetchCourses({ reset: true })

watch([selectedId, activeSearch], async () => {
  await fetchCourses({ reset: true })
})
</script>
