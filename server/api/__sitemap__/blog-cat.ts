import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const apiBase = String(useRuntimeConfig().public.strapiUrl || '').replace(/\/$/, '')

  try {
    const res = await $fetch(`${apiBase}/api/blog-categories`, {
      query: {
        'fields[0]': 'slug',
        'fields[1]': 'updatedAt',
        'pagination[pageSize]': 100,
      },
    })
    const list = res?.data || []

    return list.map((category) => ({
      loc: `/blog/category/${category.slug}`,
      lastmod: category.updatedAt,
      changefreq: 'weekly',
      priority: 0.6,
    }))
  } catch (e) {
    console.error('[sitemap/blog-cat]', e)
    return []
  }
})
