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
          <div v-if="popular.length" class="catalog-nav">
            <div class="catalog-nav__head">
              <h3 class="catalog-nav__title">
                Популярные направления <span>({{ popular.length }})</span>
              </h3>
              <img class="catalog-nav__plus" src="@/assets/icons/catalog-nav-plus.svg" alt="" width="21" height="21">
            </div>
            <div class="catalog-nav__list">
              <div
                v-for="item in popular"
                :key="`popular-${item.id}`"
                class="catalog-nav__item"
                :class="{ 'catalog-nav__item--active': selectedId === item.id }"
                @click="selectCategory(item.id)"
              >
                <span class="catalog-nav__radio"></span>
                <span class="catalog-nav__name">{{ item.name }}</span>
                <span class="catalog-nav__count">{{ item.count }} программы</span>
              </div>
            </div>
          </div>

          <div v-if="others.length" class="catalog-nav">
            <div class="catalog-nav__head">
              <h3 class="catalog-nav__title">
                Другие направления <span>({{ others.length }})</span>
              </h3>
              <img class="catalog-nav__plus" src="@/assets/icons/catalog-nav-plus.svg" alt="" width="21" height="21">
            </div>
            <div class="catalog-nav__list">
              <div
                v-for="item in others"
                :key="`other-${item.id}`"
                class="catalog-nav__item"
                :class="{ 'catalog-nav__item--active': selectedId === item.id }"
                @click="selectCategory(item.id)"
              >
                <span class="catalog-nav__radio"></span>
                <span class="catalog-nav__name">{{ item.name }}</span>
                <span class="catalog-nav__count">{{ item.count }} программы</span>
              </div>
            </div>
          </div>
        </aside>

        <div class="catalog__main">
          <form class="catalog__search" @submit.prevent="submitSearch">
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
            <article v-for="(item, index) in items" :key="item.id || item.slug" class="program-card">
              <div class="program-card__top">
                <span class="program-card__icon" :style="{ background: item.color }">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M9.238 20.419c-.381 0-.697-.317-.697-.698v-1.926c0-.381.316-.697.697-.697s.698.316.698.697v1.926c0 .39-.317.698-.698.698Z" fill="white"/>
                    <path d="M14 20.419c-.381 0-.698-.317-.698-.698v-3.86c0-.382.317-.698.698-.698s.698.316.698.698v3.86c0 .391-.317.698-.698.698Z" fill="white"/>
                    <path d="M18.762 20.419c-.382 0-.698-.317-.698-.698v-5.786c0-.381.316-.698.698-.698s.697.317.697.698v5.786c0 .391-.307.698-.697.698Z" fill="white"/>
                    <path d="M9.235 15.098c-.316 0-.595-.214-.679-.53-.093-.373.13-.754.512-.847 3.423-.856 6.437-2.726 8.735-5.396l.428-.502a.698.698 0 1 1 1.06.912l-.428.502c-2.484 2.902-5.758 4.921-9.46 5.842-.056.018-.112.018-.168.018Z" fill="white"/>
                    <path d="M18.76 11.693c-.381 0-.697-.316-.697-.698V8.977h-2.028a.698.698 0 1 1 0-1.396h2.726c.381 0 .697.317.697.698v2.726c0 .381-.307.698-.698.698Z" fill="white"/>
                    <path d="M16.791 24h-5.582C6.158 24 4 21.842 4 16.791v-5.582C4 6.158 6.158 4 11.209 4h5.582C21.842 4 24 6.158 24 11.209v5.582C24 21.842 21.842 24 16.791 24ZM11.209 5.395C6.921 5.395 5.395 6.921 5.395 11.21v5.581c0 4.289 1.526 5.814 5.814 5.814h5.582c4.288 0 5.814-1.525 5.814-5.814v-5.581c0-4.289-1.526-5.814-5.814-5.814h-5.582Z" fill="white"/>
                  </svg>
                </span>
                <span v-if="item.category" class="program-card__cat" :style="{ color: item.color }">{{ item.category }}</span>
              </div>

              <div class="program-card__info">
                <h3 class="program-card__title">{{ item.title }}</h3>
                <p v-if="item.text" class="program-card__text">{{ item.text }}</p>
              </div>

              <span class="program-card__line"></span>

              <div class="program-card__meta">
                <div class="program-card__meta-col">
                  <div class="program-card__meta-label">
                    <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
                    <span>Срок обучения</span>
                  </div>
                  <b>{{ item.hours }}</b>
                </div>
                <div class="program-card__meta-col">
                  <div class="program-card__meta-label">
                    <img src="@/assets/icons/program-book.svg" alt="" width="18" height="18">
                    <span>Формат обучения</span>
                  </div>
                  <b>{{ item.format }}</b>
                </div>
              </div>

              <span class="program-card__line"></span>

              <div class="program-card__bottom">
                <strong class="program-card__price">{{ item.price || '—' }}</strong>
                <ButtonsBtnPill title="Подробнее" type="link" :to="item.to" />
              </div>
            </article>
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
