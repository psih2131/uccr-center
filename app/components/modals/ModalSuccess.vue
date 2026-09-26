<template>
  <div class="modal modal-success">
    <div class="modal__close" aria-label="Закрыть" @click="closeModal">
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8.41992" y="10.2959" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-45 8.41992 10.2959)" fill="#145771"/>
        <rect x="10.291" y="29.0068" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-135 10.291 29.0068)" fill="#145771"/>
      </svg>
    </div>

    <img class="modal-success__icon" :src="successIcon" alt="" width="128" height="128">
    <h2 class="modal-success__title">Ваша заявка успешно отправленна</h2>
    <p class="modal-success__text">Скоро наши специалисты проконсультируют вас</p>
  </div>
</template>

<script setup>
import successIcon from '@/assets/icons/modal-ic-1.png'

const store = useCounterStore()

function closeModal() {
  store.activeModal = ''
}
</script>
