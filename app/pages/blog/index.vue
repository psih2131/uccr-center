<template>
  <main class="blog-page">
    <section class="blog">
      <div class="container">
        <div class="blog__intro">
          <div class="blog__intro-main">
            <p class="blog__crumbs">
              <NuxtLink to="/">Главная</NuxtLink>
              <span> - </span>
              <span class="blog__crumbs-current">Блог</span>
            </p>
            <h1 class="blog__title">
              Наш блог
              <span class="blog__title-plus" aria-hidden="true">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="19.5508" width="3.9" height="42" rx="1.95" fill="#D92139"/>
                  <rect y="22.4492" width="3.9" height="42" rx="1.95" transform="rotate(-90 0 22.4492)" fill="#D92139"/>
                </svg>
              </span>
            </h1>
          </div>
          <p class="blog__lead">
            <b>Учебный центр</b> реализует программы профессионального обучения, повышения квалификации и профессиональной переподготовки для специалистов транспортной, производственной и технической сфер.
          </p>
        </div>

        <div class="blog__toolbar">
          <div class="blog__filters">
            <button
              v-for="category in blogCategories"
              :key="category.id"
              type="button"
              class="blog__filter"
              :class="{ 'blog__filter--active': activeCategory === category.id }"
              @click="activeCategory = category.id"
            >
              {{ category.label }}
            </button>
          </div>

          <div class="blog__sort">
            <button type="button" class="blog__sort-btn" @click="sortOpen = !sortOpen">
              <span>{{ activeSortLabel }}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="#99AAC9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div v-if="sortOpen" class="blog__sort-list">
              <button
                v-for="option in sortOptions"
                :key="option.id"
                type="button"
                @click="selectSort(option.id)"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="blog__grid">
          <ArticleCard v-for="item in pagedPosts" :key="item.slug" :item="item" />
        </div>

        <nav v-if="totalPages > 1" class="blog__pagination" aria-label="Пагинация">
          <button
            type="button"
            class="blog__page-nav"
            :disabled="currentPage === 1"
            aria-label="Предыдущая страница"
            @click="goToPage(currentPage - 1)"
          >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="white"/>
              <path d="M28 17L20 25L28 33" stroke="#145771" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="blog__pages">
            <button
              v-for="page in totalPages"
              :key="page"
              type="button"
              class="blog__page"
              :class="{ 'blog__page--active': currentPage === page }"
              :aria-current="currentPage === page ? 'page' : undefined"
              @click="goToPage(page)"
            >
              {{ String(page).padStart(2, '0') }}
            </button>
          </div>

          <button
            type="button"
            class="blog__page-nav"
            :disabled="currentPage === totalPages"
            aria-label="Следующая страница"
            @click="goToPage(currentPage + 1)"
          >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="white"/>
              <path d="M22 17L30 25L22 33" stroke="#145771" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </nav>
      </div>
    </section>

    <SectionsFormSec />
  </main>
</template>

<script setup>
import { blogCategories, posts } from '~/data/posts'

useSeoMeta({
  title: 'Блог',
})

const route = useRoute()
const PAGE_SIZE = 12
const activeCategory = ref(route.query.category || 'all')
const currentPage = ref(1)
const sortOpen = ref(false)
const activeSort = ref('default')

watch(
  () => route.query.category,
  (value) => {
    if (value && blogCategories.some((item) => item.id === value)) {
      activeCategory.value = value
    }
  },
)

const sortOptions = [
  { id: 'default', label: 'По умолчанию' },
  { id: 'title', label: 'По названию' },
]

const activeSortLabel = computed(
  () => sortOptions.find((item) => item.id === activeSort.value)?.label || 'По умолчанию',
)

const filteredPosts = computed(() => {
  let list = posts

  if (activeCategory.value !== 'all') {
    list = list.filter((item) => item.category === activeCategory.value)
  }

  if (activeSort.value === 'title') {
    list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'ru'))
  }

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / PAGE_SIZE)))

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredPosts.value.slice(start, start + PAGE_SIZE)
})

watch(activeCategory, () => {
  currentPage.value = 1
})

watch(totalPages, (value) => {
  if (currentPage.value > value) {
    currentPage.value = value
  }
})

function selectSort(id) {
  activeSort.value = id
  sortOpen.value = false
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>
