export const DEFAULT_CITY_SLUG = 'moskva'

/** Зарезервированные сегменты — не использовать как slug города */
export const RESERVED_PATH_SLUGS = [
  'blog',
  'docs',
  'directions',
  'o-kompanii',
  'kontakty',
  'licenzii',
  'api',
  '_nuxt',
]

/**
 * Список городов. Для продакшена сюда можно подставить все ~500 городов.
 * slug — латиница в URL: /abakan/povyshenie-kvalifikacii
 */
export const cities = [
  { slug: 'moskva', name: 'Москва', namePrep: 'Москве' },
  { slug: 'abakan', name: 'Абакан', namePrep: 'Абакане' },
  { slug: 'spb', name: 'Санкт-Петербург', namePrep: 'Санкт-Петербурге' },
  { slug: 'novosibirsk', name: 'Новосибирск', namePrep: 'Новосибирске' },
  { slug: 'ekaterinburg', name: 'Екатеринбург', namePrep: 'Екатеринбурге' },
  { slug: 'kazan', name: 'Казань', namePrep: 'Казани' },
  { slug: 'nizhniy-novgorod', name: 'Нижний Новгород', namePrep: 'Нижнем Новгороде' },
  { slug: 'samara', name: 'Самара', namePrep: 'Самаре' },
  { slug: 'rostov-na-donu', name: 'Ростов-на-Дону', namePrep: 'Ростове-на-Дону' },
  { slug: 'krasnodar', name: 'Краснодар', namePrep: 'Краснодаре' },
]

export function getCityBySlug(slug) {
  if (!slug || RESERVED_PATH_SLUGS.includes(slug)) return null
  return cities.find((item) => item.slug === slug) ?? null
}

export function getDefaultCity() {
  return getCityBySlug(DEFAULT_CITY_SLUG) || cities[0]
}
