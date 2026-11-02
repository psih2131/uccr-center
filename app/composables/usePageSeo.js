/**
 * SEO из Strapi-компонента main.seo (поле Seo).
 * Если секции нет — все meta-поля страницы = null.
 */
export function usePageSeo(seoSource) {
  const seo = computed(() => {
    const raw = toValue(seoSource)
    if (!raw || typeof raw !== 'object') return null
    return raw
  })

  const pick = (key) =>
    computed(() => {
      const value = seo.value?.[key]
      if (value == null || value === '') return null
      return value
    })

  useSeoMeta({
    title: pick('title'),
    description: pick('meta_description'),
    keywords: pick('keywords'),
    ogType: pick('og_type'),
    ogTitle: pick('og_title'),
    ogDescription: pick('og_description'),
  })
}
