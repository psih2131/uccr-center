<template>
  <YandexMap width="100%" height="100%" :settings="mapSettings">
    <YandexMapDefaultSchemeLayer :settings="schemeSettings" />
    <YandexMapDefaultFeaturesLayer />
    <YandexMapMarker :settings="{ coordinates: COORDINATES }" position="left-center top">
      <img class="contacts-map__marker" :src="mapPin" alt="" width="107" height="107">
    </YandexMapMarker>
  </YandexMap>
</template>

<script setup>
import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker } from 'vue-yandex-maps'
import mapPin from '@/assets/icons/contacts-pin.svg'

const COORDINATES = [37.5753, 55.7586]

const mapSettings = {
  location: {
    center: COORDINATES,
    zoom: 16,
  },
}

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
