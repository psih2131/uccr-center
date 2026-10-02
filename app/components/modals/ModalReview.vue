<template>
  <Teleport to="body">
    <Transition name="review-modal">
      <div
        v-if="open && review"
        class="review-modal"
        @click.self="close"
      >
        <div class="review-modal__panel" role="dialog" aria-modal="true">
          <button class="review-modal__close" type="button" aria-label="Закрыть" @click="close">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8.41992" y="10.2959" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-45 8.41992 10.2959)" fill="#145771"/>
              <rect x="10.291" y="29.0068" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-135 10.291 29.0068)" fill="#145771"/>
            </svg>
          </button>

          <div class="review-modal__top">
            <span class="review-modal__num">№{{ review.num }}</span>
            <span class="review-modal__tag">{{ review.tag }}</span>
          </div>

          <img
            v-if="review.logo"
            class="review-modal__logo"
            :src="review.logo"
            :alt="review.company"
          >

          <h3 class="review-modal__company">{{ review.company }}</h3>
          <p class="review-modal__text">{{ review.text }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  review: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

function onKeydown(event) {
  if (event.key === 'Escape' && props.open) close()
}

watch(() => props.open, (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>
