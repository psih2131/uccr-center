import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const apiBase = String(useRuntimeConfig().public.strapiUrl || '').replace(/\/$/, '')

  try {
    const res = await $fetch(`${apiBase}/api/blogs`, {
      query: {
        'fields[0]': 'slug',
        'fields[1]': 'updatedAt',
        'pagination[pageSize]': 100,
      },
    })
    const list = res?.data || []

    return list.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.updatedAt,
      changefreq: 'weekly',
      priority: 0.7,
    }))
  } catch (e) {
    console.error('[sitemap/blog]', e)
    return []
  }
})
