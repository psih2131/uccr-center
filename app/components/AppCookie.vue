<template>
  <div v-if="isVisible && cookieText" class="cookie-bar">
    <p class="cookie-bar__text">{{ cookieText }}</p>
    <div class="cookie-bar__actions">
      <button class="cookie-bar__btn cookie-bar__btn--accept" type="button" @click="hideBar('accept')">
        Принять
      </button>
      <button class="cookie-bar__btn cookie-bar__btn--decline" type="button" @click="hideBar('decline')">
        Отклонить
      </button>
    </div>
  </div>
</template>

<script setup>
const STORAGE_KEY = 'cookieBar'
const config = useRuntimeConfig()

const isVisible = ref(false)

const { data: cookieResponse } = await useFetch(`${config.public.strapiUrl}/api/cookie-component`, {
  key: 'cookie-component',
})

const cookieText = computed(() => cookieResponse.value?.data?.text || '')

onMounted(() => {
  isVisible.value = !sessionStorage.getItem(STORAGE_KEY)
})

function hideBar(answer) {
  sessionStorage.setItem(STORAGE_KEY, answer)
  isVisible.value = false
}
</script>
