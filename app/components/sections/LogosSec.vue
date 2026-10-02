<template>
  <section v-if="group.length" class="logos" aria-label="Компании-партнёры">
    <div class="logos__viewport">
      <div class="logos__track">
        <div class="logos__group" v-for="copy in 2" :key="copy" :aria-hidden="copy > 1">
          <div class="logos__item" v-for="(logo, index) in group" :key="`${copy}-${index}`">
            <a
              v-if="logo.href"
              :href="logo.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="logo.src" alt="">
            </a>
            <img v-else :src="logo.src" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import logo1 from '~/assets/images/logos/logo-1.png'
import logo2 from '~/assets/images/logos/logo-2.png'
import logo3 from '~/assets/images/logos/logo-3.png'
import logo4 from '~/assets/images/logos/logo-4.png'
import logo5 from '~/assets/images/logos/logo-5.png'
import logo6 from '~/assets/images/logos/logo-6.png'
import logo7 from '~/assets/images/logos/logo-7.png'

const props = defineProps({
  items: {
    type: Array,
    default: null,
  },
})

const config = useRuntimeConfig()

const fallbackLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7].map((src) => ({
  src,
  href: '',
}))

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}

const logos = computed(() => {
  if (!props.items) {
    return fallbackLogos
  }

  return props.items
    .map((item) => ({
      src: mediaUrl(item.logo),
      href: item.url || '',
    }))
    .filter((item) => item.src)
})

const group = computed(() => {
  if (!logos.value.length) return []
  return [...logos.value, ...logos.value]
})
</script>
