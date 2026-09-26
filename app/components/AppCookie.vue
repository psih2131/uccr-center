<template>
  <div v-if="isVisible" class="cookie-bar">
    <p class="cookie-bar__text">
      Мы используем cookie, чтобы сайт работал стабильно и вам было удобнее им пользоваться. Продолжая работу с сайтом, вы соглашаетесь с этим.
    </p>
    <div class="cookie-bar__actions">
      <button class="cookie-bar__btn cookie-bar__btn--accept" type="button" @click="hideBar">
        Принять
      </button>
      <button class="cookie-bar__btn cookie-bar__btn--decline" type="button" @click="hideBar">
        Отклонить
      </button>
    </div>
  </div>
</template>

<script setup>
const isVisible = ref(true)

function hideBar() {
  isVisible.value = false
}
</script>
