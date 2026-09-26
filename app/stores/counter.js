import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const activeModal = ref('')

  function openModal(name) {
    activeModal.value = name
  }

  function closeModal() {
    activeModal.value = ''
  }

  return {
    activeModal,
    openModal,
    closeModal,
  }
})
