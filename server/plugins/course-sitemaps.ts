export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('sitemap:sitemaps-resolved', async (ctx) => {
    const apiBase = String(useRuntimeConfig().public.strapiUrl || '').replace(/\/$/, '')
    if (!apiBase) return

    try {
      const res = await $fetch(`${apiBase}/api/directions`, {
        query: {
          'fields[0]': 'slug',
          'pagination[pageSize]': 100,
        },
      })

      for (const direction of res?.data || []) {
        if (!direction?.slug) continue
        ctx.sitemaps[`courses-${direction.slug}`] = {
          sitemapName: `courses-${direction.slug}`,
          sources: [`/api/__sitemap__/courses/${direction.slug}`],
        }
      }
    } catch (e) {
      console.error('[sitemap/courses]', e)
    }
  })
})
