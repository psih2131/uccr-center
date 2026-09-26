<template>
  <Transition name="modals" :duration="400" @after-leave="onAfterLeave">
    <div v-if="store.activeModal" class="modals">
      <div class="modals__backdrop" @click="closeModal"></div>
      <ModalConsult v-if="visibleModal === 'consult'" />
      <ModalSuccess v-if="visibleModal === 'success'" />
    </div>
  </Transition>
</template>

<script setup>
import ModalConsult from '@/components/modals/ModalConsult.vue'
import ModalSuccess from '@/components/modals/ModalSuccess.vue'

const store = useCounterStore()
const visibleModal = ref('')

function closeModal() {
  store.activeModal = ''
}

function unlockScroll() {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
}

function onAfterLeave() {
  visibleModal.value = ''
  unlockScroll()
}

watch(() => store.activeModal, (name) => {
  if (name) {
    visibleModal.value = name
    if (import.meta.client) {
      document.body.style.overflow = 'hidden'
    }
  }
})

onUnmounted(() => {
  unlockScroll()
})
</script>
