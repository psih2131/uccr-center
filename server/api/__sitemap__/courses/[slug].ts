import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (event) => {
  const directionSlug = getRouterParam(event, 'slug')
  const apiBase = String(useRuntimeConfig().public.strapiUrl || '').replace(/\/$/, '')
  if (!directionSlug || !apiBase) return []

  try {
    const list = []
    let page = 1
    let pageCount = 1

    while (page <= pageCount) {
      const res = await $fetch(`${apiBase}/api/courses`, {
        query: {
          'filters[direction][slug][$eq]': directionSlug,
          'fields[0]': 'slug',
          'fields[1]': 'updatedAt',
          'pagination[page]': page,
          'pagination[pageSize]': 100,
        },
      })
      list.push(...(res?.data || []))
      pageCount = Number(res?.meta?.pagination?.pageCount) || 1
      page += 1
    }

    return list
      .filter((course) => course?.slug)
      .map((course) => ({
        loc: `/${directionSlug}/${course.slug}`,
        lastmod: course.updatedAt,
        changefreq: 'weekly',
        priority: 0.6,
      }))
  } catch (e) {
    console.error(`[sitemap/courses/${directionSlug}]`, e)
    return []
  }
})
