<template>
  <section class="catalog">
    <div class="container">
      <div class="catalog__head">
        <h2 class="catalog__title">
          Каталог рабочих профессий:
          <span>{{ selectedName }}</span>
        </h2>
        <div class="catalog__head-actions">
          <button class="catalog__show-all" type="button" @click="resetFilters">
            показать все
          </button>
          <AlphabeticalIndex />
        </div>
      </div>

      <div class="catalog__body">
        <aside class="catalog__aside">
          <div class="catalog-nav">
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
                @click="selectedId = item.id"
              >
                <span class="catalog-nav__radio"></span>
                <span class="catalog-nav__name">{{ item.name }}</span>
                <span class="catalog-nav__count">{{ item.count }} программы</span>
              </div>
            </div>
          </div>

          <div class="catalog-nav">
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
                @click="selectedId = item.id"
              >
                <span class="catalog-nav__radio"></span>
                <span class="catalog-nav__name">{{ item.name }}</span>
                <span class="catalog-nav__count">{{ item.count }} программы</span>
              </div>
            </div>
          </div>
        </aside>

        <div class="catalog__main">
          <form class="catalog__search" @submit.prevent>
            <label class="catalog__search-field">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5.2" stroke="currentColor" stroke-width="1.6"/>
                <path d="M10.4 10.4 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
              <input
                v-model="query"
                type="search"
                placeholder="Поиск по курсам и профессиям"
              >
            </label>
            <button class="catalog__search-btn" type="submit">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5.2" stroke="currentColor" stroke-width="1.6"/>
                <path d="M10.4 10.4 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
              Поиск
            </button>
          </form>

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

          <div class="catalog__grid">
            <article v-for="(item, index) in visibleItems" :key="index" class="program-card">
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
                <span class="program-card__cat" :style="{ color: item.color }">{{ item.category }}</span>
              </div>

              <div class="program-card__info">
                <h3 class="program-card__title">{{ item.title }}</h3>
                <p class="program-card__text">{{ item.text }}</p>
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
                <strong class="program-card__price">{{ item.price }}</strong>
                <ButtonsBtnPill title="Подробнее" type="link" :to="item.to" />
              </div>
            </article>
          </div>

          <div class="catalog__pager">
            <button class="catalog__pager-arrow" type="button" :disabled="page === 1" @click="page = Math.max(1, page - 1)">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                <path d="M7 1 1 7l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              v-for="num in totalPages"
              :key="num"
              class="catalog__page"
              :class="{ 'catalog__page--active': page === num }"
              type="button"
              @click="page = num"
            >
              {{ String(num).padStart(2, '0') }}
            </button>
            <button class="catalog__pager-arrow" type="button" :disabled="page === totalPages" @click="page = Math.min(totalPages, page + 1)">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                <path d="M1 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const colors = ['#5DA0BA', '#66AF5E', '#966DC3']

const popular = [
  { id: 'avtomatizaciya', name: 'Автоматизация', count: 4 },
  { id: 'bdd', name: 'БДД', count: 12 },
  { id: 'bankovskoe-delo', name: 'Банковское дело', count: 54 },
  { id: 'geodeziya', name: 'Геодезия', count: 44 },
  { id: 'geologiya', name: 'Геология', count: 2 },
  { id: 'burenie', name: 'Бурение', count: 3 },
]

const others = [
  { id: 'svarka', name: 'Сварка', count: 8 },
  { id: 'stroitelstvo', name: 'Строительство', count: 22 },
  { id: 'elektrobezopasnost', name: 'Электробезопасность', count: 18 },
  { id: 'ohrana-truda', name: 'Охрана труда', count: 31 },
  { id: 'pozharnaya', name: 'Пожарная безопасность', count: 9 },
  { id: 'prombezopasnost', name: 'Промышленная безопасность', count: 11 },
  { id: 'ekologiya', name: 'Экология', count: 6 },
  { id: 'logistika', name: 'Логистика', count: 7 },
]

const formatOptions = ['Формат обучения', 'Дистанционно', 'Очно']
const termOptions = ['Срок обучения', '20 часов', '40 часов', '72 часа']
const sortOptions = ['По умолчанию', 'Сначала дешевле', 'Сначала дороже']

const selectedId = ref('avtomatizaciya')
const query = ref('')
const page = ref(1)
const totalPages = 5
const openFilter = ref('')
const formatLabel = ref('Формат обучения')
const termLabel = ref('Срок обучения')
const sortLabel = ref('По умолчанию')

const selectedName = computed(() => {
  const item = [...popular, ...others].find((entry) => entry.id === selectedId.value)
  return item?.name ?? 'Автоматизация'
})

const route = useRoute()
const { courseUrl } = useCity()
const courseTo = computed(() => (
  courseUrl(route.params.id || 'rabochie-professii', 'ezhegodnoe-obuchenie-voditelej')
))

const items = computed(() => Array.from({ length: 8 }, (_, index) => ({
  category: 'Повышение квалификации',
  title: 'Ежегодное обучение водителей',
  text: 'Обязательное ежегодное обучение для водителей автотранспортных средств.',
  hours: '20 часов',
  format: 'Дистанционно',
  price: '1000 ₽',
  color: colors[index % colors.length],
  to: courseTo.value,
})))

const visibleItems = computed(() => {
  const value = query.value.trim().toLowerCase()
  const list = items.value
  if (!value) {
    return list
  }

  return list.filter((item) => (
    item.title.toLowerCase().includes(value)
    || item.category.toLowerCase().includes(value)
  ))
})

const toggleFilter = (name) => {
  openFilter.value = openFilter.value === name ? '' : name
}

const setFormat = (option) => {
  formatLabel.value = option
  openFilter.value = ''
}

const setTerm = (option) => {
  termLabel.value = option
  openFilter.value = ''
}

const setSort = (option) => {
  sortLabel.value = option
  openFilter.value = ''
}

const resetFilters = () => {
  selectedId.value = 'avtomatizaciya'
  query.value = ''
  formatLabel.value = 'Формат обучения'
  termLabel.value = 'Срок обучения'
  sortLabel.value = 'По умолчанию'
  page.value = 1
  openFilter.value = ''
}
</script>
