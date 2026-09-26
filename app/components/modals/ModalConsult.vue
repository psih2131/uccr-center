<template>
  <div class="modal modal-consult">
    <div class="modal__close" type="button" aria-label="Закрыть" @click="closeModal">
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8.41992" y="10.2959" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-45 8.41992 10.2959)" fill="#145771"/>
      <rect x="10.291" y="29.0068" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-135 10.291 29.0068)" fill="#145771"/>
      </svg>

    </div>

    <h2 class="modal-consult__title">Хотите задать вопрос?</h2>
    <p class="modal-consult__text">Оставьте заявку, наши специалисты проконсультируют вас</p>

    <div class="modal-consult__fields">
      <input class="modal-consult__input" type="text" name="name" placeholder="Ваше имя">
      <input class="modal-consult__input" type="tel" name="phone" placeholder="Номер телефона">
      <BtnPill class="btn-pill--light modal-consult__submit" type="modal" title="Отправить заявку" @click="openSuccessModal" />
    </div>

    <div class="modal-consult__policy">
      <span class="modal-consult__check" aria-hidden="true"></span>
      <p class="modal-consult__policy-text">
        Отправляя форму, я соглашаюсь с
        <NuxtLink to="/soglashenie">Пользовательским соглашением</NuxtLink>
        и даю согласие на обработку персональных данных в соответствии с
        <NuxtLink to="/politika">Политикой конфиденциальности</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const store = useCounterStore()

function closeModal() {
  store.activeModal = ''
}

function openSuccessModal() {
  store.activeModal = 'success'
}
</script>
