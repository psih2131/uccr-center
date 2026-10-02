<template>
  <YandexMap v-if="resolvedCoordinates" width="100%" height="100%" :settings="mapSettings">
    <YandexMapDefaultSchemeLayer :settings="schemeSettings" />
    <YandexMapDefaultFeaturesLayer />
    <YandexMapMarker :settings="{ coordinates: resolvedCoordinates }" position="left-center top">
      <img class="contacts-map__marker" :src="markerIcon" alt="" width="107" height="107">
    </YandexMapMarker>
  </YandexMap>
</template>

<script setup>
import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker } from 'vue-yandex-maps'
import mapPin from '@/assets/icons/contacts-pin.svg'

const props = defineProps({
  coordinates: {
    type: Array,
    default: null,
  },
  icon: {
    type: String,
    default: '',
  },
})

const DEFAULT_COORDINATES = [37.5753, 55.7586]

const resolvedCoordinates = computed(() => {
  if (Array.isArray(props.coordinates) && props.coordinates.length >= 2) {
    return props.coordinates
  }
  return DEFAULT_COORDINATES
})

const markerIcon = computed(() => props.icon || mapPin)

const mapSettings = computed(() => ({
  location: {
    center: resolvedCoordinates.value,
    zoom: 16,
  },
}))

const schemeSettings = {
  customization: [
    {
      stylers: {
        saturation: -1,
        lightness: 0.08,
      },
    },
  ],
}
</script>
