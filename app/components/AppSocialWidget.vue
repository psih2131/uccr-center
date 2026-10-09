<template>
  <div class="social-widget" :class="{ 'social-widget--open': isOpen }">
    <TransitionGroup name="social-widget-item" tag="div" class="social-widget__list">
      <a
        v-for="item in visibleLinks"
        :key="item.id"
        class="social-widget__link"
        :href="item.href"
        :aria-label="item.label"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener noreferrer' : undefined"
        @click="onLinkClick"
      >
        <img
          v-if="item.id === 'telegram'"
          class="social-widget__brand-icon"
          :src="telegramIcon"
          alt=""
          width="32"
          height="32"
        >
        <img
          v-else-if="item.id === 'whatsapp'"
          class="social-widget__brand-icon"
          :src="whatsappIcon"
          alt=""
          width="32"
          height="32"
        >
        <img
          v-else-if="item.id === 'max'"
          class="social-widget__brand-icon"
          :src="maxIcon"
          alt=""
          width="32"
          height="32"
        >
        <img
          v-else-if="item.id === 'phone'"
          class="social-widget__brand-icon"
          :src="phoneIcon"
          alt=""
          width="32"
          height="32"
        >
        <img
          v-else-if="item.id === 'email'"
          class="social-widget__brand-icon"
          :src="mailIcon"
          alt=""
          width="32"
          height="32"
        >
      </a>
    </TransitionGroup>

    <button
      type="button"
      class="social-widget__toggle"
      :class="{ 'social-widget__toggle--pulse': !isOpen }"
      :aria-expanded="isOpen"
      aria-label="Связаться с нами"
      @click="toggle"
    >
      <span v-if="!isOpen" class="social-widget__toggle-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
            fill="currentColor"
          />
          <path d="M7 9H17V11H7V9ZM7 12H14V14H7V12Z" fill="currentColor" />
        </svg>
      </span>
      <span v-else class="social-widget__toggle-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 38 38" fill="none">
          <rect x="8.41992" y="10.2959" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-45 8.41992 10.2959)" fill="currentColor" />
          <rect x="10.291" y="29.0068" width="2.64654" height="26.4654" rx="1.32327" transform="rotate(-135 10.291 29.0068)" fill="currentColor" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
import maxIcon from '@/assets/icons/max-colored.png'
import telegramIcon from '@/assets/icons/telegram-colored.png'
import whatsappIcon from '@/assets/icons/whatsapp-colored.png'
import phoneIcon from '@/assets/icons/phone-colored.png'
import mailIcon from '@/assets/icons/mail-colored.png'

const isOpen = ref(false)

const links = [
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/roman_dev_space', external: true },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/78001234567', external: true },
  { id: 'max', label: 'MAX', href: 'https://max.ru/', external: true },
  { id: 'phone', label: 'Телефон', href: 'tel:+78001234567', external: false },
  { id: 'email', label: 'Email', href: 'mailto:info@uccr.ru', external: false },
]

const visibleLinks = computed(() => (isOpen.value ? [...links].reverse() : []))

function toggle() {
  isOpen.value = !isOpen.value
}

function onLinkClick() {
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars';

.social-widget {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  pointer-events: none;

  &--open {
    pointer-events: auto;
  }

  &:not(&--open) .social-widget__toggle {
    pointer-events: auto;
  }
}

.social-widget__list {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 12px;
}

.social-widget__brand-icon {
  display: block;
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.social-widget__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: $white;
  box-shadow: 0 4px 20px rgba(20, 87, 113, 0.22);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.06);
      box-shadow: 0 6px 24px rgba(20, 87, 113, 0.28);
    }
  }
}

.social-widget__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: $white;
  background: $darkBlue;
  box-shadow: 0 6px 24px rgba(20, 87, 113, 0.35);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  @media (hover: hover) {
    &:hover {
      background: $darkBlueSoft;
    }
  }

  &--pulse {
    animation: social-widget-pulse 2s ease-in-out infinite;
  }
}

.social-widget__toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-widget-item-enter-active,
.social-widget-item-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.social-widget-item-enter-from,
.social-widget-item-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.85);
}

.social-widget-item-move {
  transition: transform 0.28s ease;
}

@keyframes social-widget-pulse {
  0%,
  100% {
    box-shadow: 0 6px 24px rgba(20, 87, 113, 0.35);
    transform: scale(1);
  }

  50% {
    box-shadow: 0 6px 32px rgba(20, 87, 113, 0.55), 0 0 0 12px rgba(20, 87, 113, 0.12);
    transform: scale(1.04);
  }
}

</style>
