import { RESERVED_PATH_SLUGS, getDefaultCity } from '~/data/cities'

/**
 * Город из URL (/moskva/...).
 * Если города нет — ссылки без города: /rabochie-professii/burilshhik
 */
export function useCity() {
  const route = useRoute()
  const { data: cities } = useCities()

  function knownCitySlug(slug) {
    if (typeof slug !== 'string' || !slug || RESERVED_PATH_SLUGS.includes(slug)) return null
    return (cities.value || []).some((item) => item.slug === slug) ? slug : null
  }

  const citySlug = computed(() => {
    if (typeof route.params.city === 'string') return knownCitySlug(route.params.city)
    const [first] = route.path.split('/').filter(Boolean)
    return knownCitySlug(first)
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
    return cityUrl(directionSlug)
  }

  function isDirectionPath(slug) {
    if (!slug) return false
    const parts = route.path.replace(/\/+$/, '').split('/').filter(Boolean)
    if (knownCitySlug(parts[0])) parts.shift()
    if (parts[0] === 'directions') parts.shift()
    return parts[0] === slug
  }

  function catalogUrl(directionSlug) {
    return cityUrl('directions', directionSlug, 'catalog')
  }

  function courseUrl(directionSlug, courseSlug) {
    return cityUrl(directionSlug, courseSlug)
  }

  /**
   * Собирает URL той же страницы для другого города (или без города).
   * Сначала парсит path (надёжнее params).
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

    const catalogMatch = rest.match(/^\/directions\/([^/]+)\/catalog$/)
    if (catalogMatch) {
      return withCity(`/directions/${catalogMatch[1]}/catalog`)
    }

    const directionMatch = rest.match(/^\/directions\/([^/]+)$/)
    if (directionMatch) {
      return withCity(`/${directionMatch[1]}`)
    }

    const courseMatch = rest.match(/^\/([^/]+)\/([^/]+)$/)
    if (courseMatch && !RESERVED_PATH_SLUGS.includes(courseMatch[1])) {
      return withCity(`/${courseMatch[1]}/${courseMatch[2]}`)
    }

    const bareMatch = rest.match(/^\/([^/]+)$/)
    if (bareMatch && !RESERVED_PATH_SLUGS.includes(bareMatch[1])) {
      return withCity(`/${bareMatch[1]}`)
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
    isDirectionPath,
    catalogUrl,
    courseUrl,
    pathForCity,
  }
}
