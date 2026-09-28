<template>
  <Teleport to="body">
    <Transition name="app-preloader">
      <div
        v-if="isLoading"
        class="app-preloader"
        role="status"
        aria-live="polite"
        aria-label="Загрузка"
      >
        <div class="app-preloader__spinner" aria-hidden="true">
          <span class="app-preloader__ring"></span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const isLoading = ref(false)
const nuxtApp = useNuxtApp()
const router = useRouter()

let hideTimer = null
let ready = false

onMounted(() => {
  ready = true
})

onBeforeUnmount(() => {
  clearTimeout(hideTimer)
})

function show() {
  if (!ready) return
  clearTimeout(hideTimer)
  isLoading.value = true
  // страховка, если page:finish не сработает
  hideTimer = setTimeout(() => {
    isLoading.value = false
  }, 8000)
}

function hide() {
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    isLoading.value = false
  }, 280)
}

nuxtApp.hook('page:start', show)
nuxtApp.hook('page:finish', hide)
nuxtApp.hook('page:loading:start', show)
nuxtApp.hook('page:loading:end', hide)

router.beforeEach((to, from) => {
  if (!ready) return
  if (to.fullPath === from.fullPath) return
  show()
})
</script>
