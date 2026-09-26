<template>
  <div v-if="isVisible" class="cookie-bar">
    <p class="cookie-bar__text">
      Мы используем cookie, чтобы сайт работал стабильно и вам было удобнее им пользоваться. Продолжая работу с сайтом, вы соглашаетесь с этим.
    </p>
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

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = !sessionStorage.getItem(STORAGE_KEY)
})

function hideBar(answer) {
  sessionStorage.setItem(STORAGE_KEY, answer)
  isVisible.value = false
}
</script>
