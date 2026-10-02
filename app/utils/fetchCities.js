import { RESERVED_PATH_SLUGS } from '~/data/cities'

const CACHE_KEY = 'cities'

function strapiBaseUrl() {
  const config = useRuntimeConfig()
  return String(config.public.strapiUrl || config.strapiUrl || '').replace(/\/$/, '')
}

async function loadCities() {
  const base = strapiBaseUrl()
  if (!base) return []

  const pageSize = 100
  const items = []
  let page = 1
  let pageCount = 1

  while (page <= pageCount && page <= 50) {
    const response = await $fetch(`${base}/api/cities`, {
      query: {
        sort: 'title:asc',
        'fields[0]': 'title',
        'fields[1]': 'slug',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
      },
    })

    const batch = Array.isArray(response?.data) ? response.data : []
    for (const item of batch) {
      if (!item?.slug || !item?.title) continue
      items.push({
        slug: item.slug,
        title: item.title,
        name: item.title,
      })
    }

    pageCount = Number(response?.meta?.pagination?.pageCount) || 1
    page += 1
  }

  return items
}

export async function fetchCities() {
  const nuxtApp = useNuxtApp()
  const cached = nuxtApp.payload.data[CACHE_KEY]
  if (Array.isArray(cached)) return cached

  if (!nuxtApp._citiesPromise) {
    nuxtApp._citiesPromise = loadCities()
      .then((items) => {
        nuxtApp.payload.data[CACHE_KEY] = items
        return items
      })
      .finally(() => {
        nuxtApp._citiesPromise = null
      })
  }

  return nuxtApp._citiesPromise
}

export async function isKnownCitySlug(slug) {
  if (!slug || RESERVED_PATH_SLUGS.includes(slug)) return false
  const cities = await fetchCities()
  return cities.some((city) => city.slug === slug)
}
