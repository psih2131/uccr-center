import { defineSitemapEventHandler } from '#imports'

const CACHE_MS = 5 * 60 * 1000
let cachedTree = null
let cachedAt = 0

async function fetchAll(apiBase, path, query) {
  const list = []
  let page = 1
  let pageCount = 1

  while (page <= pageCount && page <= 50) {
    const res = await $fetch(`${apiBase}/api/${path}`, {
      query: {
        ...query,
        'pagination[page]': page,
        'pagination[pageSize]': 100,
      },
    })
    list.push(...(res?.data || []))
    pageCount = Number(res?.meta?.pagination?.pageCount) || 1
    page += 1
  }

  return list
}

async function loadTree(apiBase) {
  if (cachedTree && Date.now() - cachedAt < CACHE_MS) return cachedTree

  const directions = await fetchAll(apiBase, 'directions', {
    'fields[0]': 'slug',
    'fields[1]': 'updatedAt',
  })

  const tree = []
  for (const direction of directions) {
    if (!direction?.slug) continue
    const courses = await fetchAll(apiBase, 'courses', {
      'filters[direction][slug][$eq]': direction.slug,
      'fields[0]': 'slug',
      'fields[1]': 'updatedAt',
    })
    tree.push({
      slug: direction.slug,
      updatedAt: direction.updatedAt,
      courses: courses.filter((course) => course?.slug),
    })
  }

  cachedTree = tree
  cachedAt = Date.now()
  return tree
}

export default defineSitemapEventHandler(async (event) => {
  const citySlug = getRouterParam(event, 'slug')
  const apiBase = String(useRuntimeConfig().public.strapiUrl || '').replace(/\/$/, '')
  if (!citySlug || !apiBase) return []

  try {
    const directions = await loadTree(apiBase)
    const urls = [
      {
        loc: `/${citySlug}`,
        changefreq: 'weekly',
        priority: 0.8,
      },
    ]

    for (const direction of directions) {
      urls.push(
        {
          loc: `/${citySlug}/${direction.slug}`,
          lastmod: direction.updatedAt,
          changefreq: 'weekly',
          priority: 0.7,
        },
        {
          loc: `/${citySlug}/directions/${direction.slug}/catalog`,
          lastmod: direction.updatedAt,
          changefreq: 'weekly',
          priority: 0.6,
        },
      )

      for (const course of direction.courses) {
        urls.push({
          loc: `/${citySlug}/${direction.slug}/${course.slug}`,
          lastmod: course.updatedAt,
          changefreq: 'weekly',
          priority: 0.5,
        })
      }
    }

    return urls
  } catch (e) {
    console.error(`[sitemap/cities/${citySlug}]`, e)
    return []
  }
})
