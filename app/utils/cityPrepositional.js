import cityCases from '~/data/cities.json'

export function cityPrepositional(name) {
  const value = String(name || '').trim()
  if (!value) return ''
  const found = cityCases.find((item) => item.name === value || item.nominative === value)
  return found?.prepositional || ''
}
