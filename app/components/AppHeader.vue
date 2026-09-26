<template>
  <header class="header">
    <div class="header__top">
      <div class="container">
        <div class="header__top-left">
          <nav class="header__extra">
            <ul class="header__extra-list">
              <li class="header__extra-item">
                <NuxtLink to="/o-kompanii" class="header__extra-link " :class="{ 'header__extra-link--active': $route.path === '/o-kompanii' }">
                  О компании
                </NuxtLink>
              </li>
              <li class="header__extra-item">
                <NuxtLink to="/licenzii" class="header__extra-link" :class="{ 'header__extra-link--active': $route.path === '/licenzii' }">
                  Лицензии
                </NuxtLink>
              </li>
              <li class="header__extra-item">
                <NuxtLink to="/kontakty" class="header__extra-link" :class="{ 'header__extra-link--active': $route.path === '/kontakty' }">
                  Контакты
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="header__tools">

            <HeaderAlphabeticalIndex />

            <HeaderSearch />
            
          </div>

        </div>

          <div class="header__contacts">
            <button class="header__city" type="button">
              <span class="header__city-name">Москва</span>
              <svg class="header__city-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 5L7 9L11 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <a class="header__contact header__phone" href="tel:+79189942241">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.39611 2.5H5.20232L6.10683 4.76127L4.65378 5.72997C4.47991 5.84588 4.37547 6.04103 4.37547 6.25C4.37706 6.30852 4.37547 6.25063 4.37547 6.25063L4.37547 6.25128L4.37547 6.25268L4.37549 6.25583L4.37559 6.26354C4.37568 6.2693 4.37583 6.2763 4.3761 6.28449C4.37663 6.30088 4.37758 6.32206 4.3793 6.34773C4.38272 6.39904 4.38916 6.4684 4.40128 6.55323C4.4255 6.72279 4.47252 6.95507 4.56379 7.22889C4.74706 7.77871 5.10718 8.49059 5.80853 9.19194C6.50988 9.89329 7.22176 10.2534 7.77158 10.4367C8.0454 10.528 8.27768 10.575 8.44724 10.5992C8.53207 10.6113 8.60143 10.6178 8.65274 10.6212C8.67841 10.6229 8.69959 10.6238 8.71597 10.6244C8.72417 10.6246 8.73116 10.6248 8.73692 10.6249L8.74464 10.625L8.74779 10.625L8.74919 10.625H8.74984C8.74984 10.625 8.81962 10.6212 8.75047 10.625C8.9872 10.625 9.20362 10.4912 9.30949 10.2795L9.72805 9.44238L12.5005 9.90445V12.6044C11.181 12.7952 7.6176 12.9832 4.81741 10.1831C2.01722 7.38287 2.20529 3.81944 2.39611 2.5ZM5.6715 6.5538L6.80021 5.80133C7.29204 5.47344 7.48696 4.84586 7.26743 4.29703L6.36292 2.03576C6.17309 1.56119 5.71345 1.25 5.20232 1.25H2.36345C1.79564 1.25 1.26115 1.64448 1.16793 2.26056C0.955865 3.66219 0.66721 7.80062 3.93353 11.0669C7.19985 14.3333 11.3383 14.0446 12.7399 13.8325C13.356 13.7393 13.7505 13.2048 13.7505 12.637V9.90445C13.7505 9.29341 13.3087 8.77192 12.706 8.67146L9.93355 8.20939C9.39226 8.11918 8.85542 8.39254 8.61001 8.88337L8.39345 9.31648C8.32539 9.29978 8.2494 9.27834 8.16686 9.25082C7.77918 9.12159 7.24106 8.85671 6.69241 8.30806C6.14376 7.75941 5.87887 7.22129 5.74965 6.83361C5.71473 6.72885 5.68959 6.63466 5.6715 6.5538Z" fill="#99AAC9"/>
              </svg>

              <span class="header__phone-text">+7(918) 994-22-41</span>
            </a>

            <a class="header__contact header__mail" href="mailto:info@uccr.ru">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.25 3.75C1.25 3.05964 1.80964 2.5 2.5 2.5H12.5C13.1904 2.5 13.75 3.05964 13.75 3.75V11.25C13.75 11.9404 13.1904 12.5 12.5 12.5H2.5C1.80964 12.5 1.25 11.9404 1.25 11.25V3.75ZM3.44912 3.75L7.5 7.29452L11.5509 3.75H3.44912ZM12.5 4.58048L7.91157 8.59536C7.67592 8.80155 7.32408 8.80155 7.08843 8.59536L2.5 4.58048V11.25H12.5V4.58048Z" fill="#99AAC9"/>
              </svg>

              <span class="header__mail-text">info@uccr.ru</span>
            </a>
          </div>
        
      </div>
    </div>

    <div class="header__bottom">
      <div class="container">
     
          <NuxtLink to="/" class="header__logo">
            <img src="@/assets/images/logo.png" alt="logo" class="header__logo-img">
          </NuxtLink>

          <nav class="header__nav">
            <ul class="header__nav-list">
              <li class="header__nav-item">
                <NuxtLink to="/rabochie-professii" class="header__nav-link header__nav-link--active">
                  Рабочие профессии
                </NuxtLink>
              </li>
              <li class="header__nav-item">
                <NuxtLink to="/perepodgotovka" class="header__nav-link">
                  Переподготовка
                </NuxtLink>
              </li>
              <li class="header__nav-item">
                <NuxtLink to="/povyshenie-kvalifikacii" class="header__nav-link">
                  Повышение квалификации
                </NuxtLink>
              </li>
              <li class="header__nav-item">
                <NuxtLink to="/attestaciya" class="header__nav-link">
                  Аттестация
                </NuxtLink>
              </li>
              <li class="header__nav-item">
                <NuxtLink to="/ohrana-truda" class="header__nav-link">
                  Охрана труда
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <button class="header__consult" type="button" @click="openConsultModal">
            <span class="header__consult-text">Получить консультацию</span>
            <span class="header__consult-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 7C8 6.44772 8.44772 6 9 6L17 6C17.5523 6 18 6.44772 18 7V15C18 15.5523 17.5523 16 17 16C16.4477 16 16 15.5523 16 15V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8L9 8C8.44772 8 8 7.55228 8 7Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
       
      </div>
    </div>
  </header>
</template>

<script setup>
import HeaderAlphabeticalIndex from '@/components/HeaderAlphabeticalIndex.vue'
import HeaderSearch from '@/components/HeaderSearch.vue'

const store = useCounterStore()

function openConsultModal() {
  store.activeModal = 'consult'
}
</script>
