import { fetchCities } from '~/utils/fetchCities'

export function useCities() {
  return useAsyncData('cities', () => fetchCities(), {
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  })
}
