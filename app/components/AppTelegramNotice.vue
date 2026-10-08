<template>
  <div v-show="isOpen" class="telegram-notice" role="dialog" aria-modal="true">
      <div class="telegram-notice__panel">
        <button
          class="telegram-notice__close"
          type="button"
          aria-label="Закрыть"
          @click="isOpen = false"
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8.41992" y="10.2959" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-45 8.41992 10.2959)" fill="#145771" />
            <rect x="10.291" y="29.0068" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-135 10.291 29.0068)" fill="#145771" />
          </svg>
        </button>
        <p class="telegram-notice__text">
          Для более адекватной связи по проекту предлагаю перейти в Telegram.
        </p>
        <p class="telegram-notice__subtext">
          На Kwork не могу скинуть свои контактные данные — сразу прилетает бан.
        </p>
        <a
          class="telegram-notice__link"
          href="https://t.me/roman_dev_space"
          target="_blank"
          rel="noopener noreferrer"
        >
          @roman_dev_space
        </a>
      </div>
    </div>
</template>

<script setup>
const isOpen = ref(true)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars';

.telegram-notice {
  position: fixed;
  inset: 0;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
  box-sizing: border-box;
}

.telegram-notice__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(920px, 92vw);
  min-height: min(520px, 78vh);
  max-height: 88vh;
  padding: 48px 56px 56px;
  border-radius: 15px;
  background: $white;
  text-align: center;
  box-sizing: border-box;
}

.telegram-notice__close {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.telegram-notice__text {
  max-width: 640px;
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  color: $darkBlue;
}

.telegram-notice__subtext {
  max-width: 640px;
  margin: 16px 0 0;
  font-size: 16px;
  line-height: 1.5;
  color: $darkBlueSoft;
}

.telegram-notice__link {
  display: inline-block;
  margin-top: 24px;
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 500;
  color: $white;
  background: $darkBlue;
  text-decoration: none;
  transition: opacity 0.2s ease;

  @media (hover: hover) {
    &:hover {
      opacity: 0.88;
    }
  }
}
</style>
