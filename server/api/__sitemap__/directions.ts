import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const apiBase = String(useRuntimeConfig().public.strapiUrl || '').replace(/\/$/, '')

  try {
    const res = await $fetch(`${apiBase}/api/directions`, {
      query: {
        'fields[0]': 'slug',
        'fields[1]': 'updatedAt',
        'pagination[pageSize]': 100,
      },
    })
    const list = res?.data || []

    return list.flatMap((direction) => ([
      {
        loc: `/${direction.slug}`,
        lastmod: direction.updatedAt,
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        loc: `/directions/${direction.slug}/catalog`,
        lastmod: direction.updatedAt,
        changefreq: 'weekly',
        priority: 0.7,
      },
    ]))
  } catch (e) {
    console.error('[sitemap/directions]', e)
    return []
  }
})
