/**
 * SEO из Strapi-компонента main.seo (поле Seo).
 * Если секции нет — все meta-поля страницы = null.
 * cityForm — город в предложном падеже. Если он передан, дописывается в конец title и ogTitle.
 */
export function usePageSeo(seoSource, cityForm = '') {
  const seo = computed(() => {
    const raw = toValue(seoSource)
    if (!raw || typeof raw !== 'object') return null
    return raw
  })

  const cityLabel = computed(() => String(toValue(cityForm) || '').trim())

  const pick = (key) =>
    computed(() => {
      const value = seo.value?.[key]
      if (value == null || value === '') return null
      return value
    })

  const withCity = (key) =>
    computed(() => {
      const value = seo.value?.[key]
      if (value == null || value === '') return null
      if (!cityLabel.value) return value
      return `${value} в ${cityLabel.value}`
    })

  useSeoMeta({
    title: withCity('title'),
    description: pick('meta_description'),
    keywords: pick('keywords'),
    ogType: pick('og_type'),
    ogTitle: withCity('og_title'),
    ogDescription: pick('og_description'),
  })
}
