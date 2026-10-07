<template>
  <main class="blog-page">
    <section class="blog">
      <div class="container">
        <div class="blog__intro">
          <div class="blog__intro-main">
            <p class="blog__crumbs">
              <NuxtLink to="/">Главная</NuxtLink>
              <span> - </span>
              <template v-if="activeCategorySlug && activeCategoryTitle">
                <NuxtLink to="/blog">Блог</NuxtLink>
                <span> - </span>
                <span class="blog__crumbs-current">{{ activeCategoryTitle }}</span>
              </template>
              <span v-else class="blog__crumbs-current">Блог</span>
            </p>
            <h1 class="blog__title">
              Наш блог
              <span class="blog__title-plus" aria-hidden="true">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
                  <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
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
            <NuxtLink
              to="/blog"
              class="blog__filter"
              :class="{ 'blog__filter--active': !activeCategorySlug }"
            >
              Все
            </NuxtLink>
            <NuxtLink
              v-for="category in categories"
              :key="category.slug"
              :to="`/blog/category/${category.slug}`"
              class="blog__filter"
              :class="{ 'blog__filter--active': activeCategorySlug === category.slug }"
            >
              {{ category.title }}
            </NuxtLink>
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

        <div class="blog-list__grid">
          <ArticleCard v-for="item in visiblePosts" :key="item.slug" :item="item" />
        </div>

        <div v-if="hasMore" class="blog__more">
          <ButtonsBtnPill title="Загрузить ещё" type="modal" @click="loadMore" />
        </div>
      </div>
    </section>

    <SectionsFormSec />
  </main>
</template>

<script setup>
import { mapBlogCard, mapBlogCategories } from '~/utils/mapBlog'

const props = defineProps({
  activeCategorySlug: {
    type: String,
    default: '',
  },
  activeCategoryTitle: {
    type: String,
    default: '',
  },
})

const config = useRuntimeConfig()
const PAGE_SIZE = 3

const { data: categoriesResponse } = await useFetch(`${config.public.strapiUrl}/api/blog-categories`, {
  key: 'blog-categories',
  query: {
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'pagination[pageSize]': 100,
  },
})

const blogsQuery = computed(() => {
  const query = {
    'populate[image]': true,
    'populate[blog_categories]': true,
    'pagination[pageSize]': 100,
    sort: 'createdAt:desc',
  }

  if (props.activeCategorySlug) {
    query['filters[blog_categories][slug][$eq]'] = props.activeCategorySlug
  }

  return query
})

const { data: blogsResponse } = await useFetch(`${config.public.strapiUrl}/api/blogs`, {
  key: () => `blogs-${props.activeCategorySlug || 'all'}`,
  query: blogsQuery,
})

const categories = computed(() => mapBlogCategories(categoriesResponse.value?.data))

const posts = computed(() =>
  (blogsResponse.value?.data || [])
    .map((item) => mapBlogCard(item, config.public.strapiUrl))
    .filter(Boolean),
)

const sortOpen = ref(false)
const activeSort = ref('default')
const visibleCount = ref(PAGE_SIZE)

const sortOptions = [
  { id: 'default', label: 'По умолчанию' },
  { id: 'title', label: 'По названию' },
]

const activeSortLabel = computed(
  () => sortOptions.find((item) => item.id === activeSort.value)?.label || 'По умолчанию',
)

const sortedPosts = computed(() => {
  if (activeSort.value !== 'title') return posts.value
  return [...posts.value].sort((a, b) => a.title.localeCompare(b.title, 'ru'))
})

const visiblePosts = computed(() => sortedPosts.value.slice(0, visibleCount.value))
const hasMore = computed(() => sortedPosts.value.length > visibleCount.value)

watch(
  () => [props.activeCategorySlug, activeSort.value],
  () => {
    visibleCount.value = PAGE_SIZE
  },
)

function selectSort(id) {
  activeSort.value = id
  sortOpen.value = false
}

function loadMore() {
  visibleCount.value += PAGE_SIZE
}
</script>
