import { RESERVED_PATH_SLUGS } from '~/data/cities'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('sitemap:sitemaps-resolved', async (ctx) => {
    const apiBase = String(useRuntimeConfig().public.strapiUrl || '').replace(/\/$/, '')
    if (!apiBase) return

    try {
      let page = 1
      let pageCount = 1

      while (page <= pageCount && page <= 50) {
        const res = await $fetch(`${apiBase}/api/cities`, {
          query: {
            sort: 'title:asc',
            'fields[0]': 'title',
            'fields[1]': 'slug',
            'pagination[page]': page,
            'pagination[pageSize]': 100,
          },
        })

        for (const city of res?.data || []) {
          if (!city?.slug || !city?.title || RESERVED_PATH_SLUGS.includes(city.slug)) continue
          ctx.sitemaps[`city-${city.slug}`] = {
            sitemapName: `city-${city.slug}`,
            sources: [`/api/__sitemap__/cities/${city.slug}`],
          }
        }

        pageCount = Number(res?.meta?.pagination?.pageCount) || 1
        page += 1
      }
    } catch (e) {
      console.error('[sitemap/cities]', e)
    }
  })
})
