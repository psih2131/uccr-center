import { RESERVED_PATH_SLUGS, getDefaultCity } from '~/data/cities'

/**
 * Город из URL (/abakan/directions/...).
 * Если города нет — дефолтные ссылки без города: /directions/...
 */
export function useCity() {
  const route = useRoute()
  const { data: cities } = useCities()

  const citySlug = computed(() => {
    const slug = route.params.city
    if (typeof slug !== 'string' || RESERVED_PATH_SLUGS.includes(slug)) return null
    return (cities.value || []).some((item) => item.slug === slug) ? slug : null
  })

  const city = computed(() => {
    if (!citySlug.value) return null
    return (cities.value || []).find((item) => item.slug === citySlug.value) || null
  })

  const hasCity = computed(() => Boolean(citySlug.value))

  function cityUrl(...parts) {
    const segments = [
      ...(citySlug.value ? [citySlug.value] : []),
      ...parts,
    ]
      .flat()
      .filter((part) => part != null && part !== '')
    return `/${segments.join('/')}`
  }

  function directionUrl(directionSlug) {
    return cityUrl('directions', directionSlug)
  }

  function catalogUrl(directionSlug) {
    return cityUrl('directions', directionSlug, 'catalog')
  }

  function courseUrl(directionSlug, courseSlug) {
    return cityUrl('directions', directionSlug, 'catalog', courseSlug)
  }

  /**
   * Собирает URL той же страницы для другого города (или без города).
   * Сначала парсит path (надёжнее params) — так не теряется /catalog/[course].
   */
  function pathForCity(nextCitySlug) {
    const path = route.path.replace(/\/+$/, '') || '/'
    const current = citySlug.value

    const withCity = (base) => (nextCitySlug ? `/${nextCitySlug}${base}` : base)

    let rest = path
    if (current && (path === `/${current}` || path === `/${current}/`)) {
      rest = '/'
    } else if (current && path.startsWith(`/${current}/`)) {
      rest = path.slice(`/${current}`.length) || '/'
    }

    const courseMatch = rest.match(/^\/directions\/([^/]+)\/catalog\/([^/]+)$/)
    if (courseMatch) {
      return withCity(`/directions/${courseMatch[1]}/catalog/${courseMatch[2]}`)
    }

    const catalogMatch = rest.match(/^\/directions\/([^/]+)\/catalog$/)
    if (catalogMatch) {
      return withCity(`/directions/${catalogMatch[1]}/catalog`)
    }

    const directionMatch = rest.match(/^\/directions\/([^/]+)$/)
    if (directionMatch) {
      return withCity(`/directions/${directionMatch[1]}`)
    }

    if (rest === '/') {
      return nextCitySlug ? `/${nextCitySlug}` : '/'
    }

    // Глобальные страницы (blog, docs, …) — без city-префикса в URL
    if (!current) {
      return nextCitySlug ? `/${nextCitySlug}` : rest
    }

    if (rest.startsWith('/directions')) {
      return withCity(rest)
    }

    return nextCitySlug ? `/${nextCitySlug}` : rest
  }

  return {
    citySlug,
    city,
    hasCity,
    defaultCity: getDefaultCity(),
    cityUrl,
    directionUrl,
    catalogUrl,
    courseUrl,
    pathForCity,
  }
}
