<template>
  <section class="hero">
    <div class="container">
      <div class="hero__top">
        <h1 class="hero__title">
          Учебный центр дополнительного
          <br>
          <span class="hero__title-decor" aria-hidden="true"></span>
          профессионального образования 
          <span class="hero__title-decor-2" aria-hidden="true">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11.6387" width="2.32143" height="25" rx="1.16071" fill="#D92139"/>
            <rect y="13.3633" width="2.32143" height="25" rx="1.16071" transform="rotate(-90 0 13.3633)" fill="#D92139"/>
            </svg>
          </span>
        </h1>
        <p class="hero__lead">
          <b>Учебный центр</b> реализует программы профессионального обучения, повышения квалификации и профессиональной переподготовки для специалистов транспортной, производственной и технической сфер.
        </p>
      </div>

      <div class="hero__work">
        <div class="hero__main">
          <div class="hero__tags">
            <div class="hero__tags-row">
              <template v-for="(item, index) in tagRows[0]" :key="item.slug">
                <span v-if="index" class="hero__dot"></span>
                <NuxtLink :to="`/directions/${item.slug}`" class="hero__tag">{{ item.menuTitle }}</NuxtLink>
              </template>
            </div>
            <div class="hero__tags-row">
              <template v-for="(item, index) in tagRows[1]" :key="item.slug">
                <span v-if="index" class="hero__dot"></span>
                <NuxtLink :to="`/directions/${item.slug}`" class="hero__tag">{{ item.menuTitle }}</NuxtLink>
              </template>
            </div>
          </div>
          <div class="hero__main-title-wrapper">
            <h2 class="hero__main-title">Направления работы центра</h2>
            <span class="hero__num">01</span>
          </div>
          
        </div>

        <NuxtLink to="/o-kompanii" class="hero__col hero__col--about">
          <span class="hero__col-line hero__col-line--h"></span>
          <span class="hero__col-line hero__col-line--v hero__col-line--left"></span>
          <span class="hero__col-line hero__col-line--v hero__col-line--right"></span>
          <span class="hero__col-dot hero__col-dot--red"></span>
          <span class="hero__col-title">О нашей компании</span>
          <span class="hero__num">02</span>
        </NuxtLink>

        <NuxtLink to="/licenzii" class="hero__col hero__col--licenses">
          <span class="hero__col-line hero__col-line--h"></span>
          <span class="hero__col-line hero__col-line--v hero__col-line--left"></span>
          <span class="hero__col-line hero__col-line--v hero__col-line--right"></span>
          <span class="hero__col-dot hero__col-dot--cyan"></span>
          <span class="hero__col-title">Наши лицензии</span>
          <span class="hero__num">03</span>
        </NuxtLink>

        <article class="hero__featured">
          <div class="hero__featured-panel">
            <span class="hero__num">04</span>
            <p class="hero__featured-title">
              Учебный центр
              <span>дополнтиельного</span>
              професиионального образования
            </p>
            <div class="hero__socials">
              <a class="hero__social" href="#" aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M15.7 3.2 2.9 8.2c-.9.36-.88 1.02-.16 1.28l3.28 1.02 1.2 3.68c.16.5.29.7.62.7.4 0 .58-.18.8-.4l1.62-1.58 3.38 2.5c.62.34 1.06.16 1.22-.58l2.2-10.38c.22-1.02-.4-1.46-1.36-1.08Z" fill="white"/>
                </svg>
              </a>
              <a class="hero__social" href="#" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.6A7.4 7.4 0 0 0 2.4 12.3L1.6 16.4l4.2-.8A7.4 7.4 0 1 0 9 1.6Zm4.1 10.4c-.17.48-.98.9-1.37.96-.35.05-.8.08-1.29-.08-.3-.1-.68-.22-1.18-.43-2.07-.9-3.42-2.98-3.52-3.12-.1-.14-.84-1.12-.84-2.14 0-1.02.53-1.52.72-1.73.19-.2.41-.26.55-.26h.4c.13 0 .3-.05.47.36.17.42.59 1.45.64 1.56.05.1.09.23.02.38-.07.14-.1.23-.2.36-.1.12-.21.27-.3.36-.1.1-.2.2-.09.4.12.19.52.86 1.12 1.4.77.68 1.42.9 1.62 1 .2.1.32.08.44-.05.12-.13.5-.58.64-.78.13-.2.27-.16.45-.1.19.07 1.18.56 1.38.66.2.1.33.15.38.23.05.08.05.47-.12.95Z" fill="white"/>
                </svg>
              </a>
              <a class="hero__social" href="#" aria-label="VK">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9.7 13.2h.7s.2-.02.3-.14c.1-.1.1-.3.1-.3s0-1 .45-1.15c.44-.14 1 .9 1.62 1.3.46.3.81.24.81.24l1.64-.02s.86-.05.45-.73c-.03-.06-.24-.5-1.23-1.42-.99-.96-.86-.8.33-2.46.73-1 1.02-1.62.93-1.88-.09-.26-.64-.19-.64-.19h-1.85s-.14-.02-.24.04c-.1.06-.16.2-.16.2s-.3.8-.7 1.48c-.84 1.42-1.18 1.5-1.32 1.4-.32-.2-.24-.82-.24-1.26 0-1.37.21-1.94-.4-2.09-.2-.05-.35-.08-.87-.09-.66 0-1.22 0-1.54.16-.21.1-.38.35-.14.36.3.02.61.16.66.52.07.47.07 1.42-.17 1.6-.33.24-.79-.25-1.77-1.44-.5-.61-.88-1.36-.88-1.36s-.07-.17-.2-.26c-.15-.1-.36-.14-.36-.14H3.5s-.32 0-.44.15c-.1.13 0 .4 0 .4s1.4 3.28 3 4.93c1.46 1.52 3.12 1.42 3.12 1.42Z" fill="white"/>
                </svg>
              </a>
              <a class="hero__social" href="#" aria-label="MAX">
                <span>M</span>
              </a>
            </div>
            <div class="hero__contacts">
              <p class="hero__hotline">Горячая линия</p>
              <a class="hero__phone" href="tel:+79189942241">+7(918) 994-22-41</a>
              <a class="hero__mail" href="mailto:info@uccr.ru">info@uccr.ru</a>
            </div>
            
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getDirectionBySlug } from '~/data/directions'

const tagRows = [
  ['rabochie-professii', 'ohrana-truda', 'perepodgotovka'],
  ['povyshenie-kvalifikacii', 'attestaciya'],
].map((row) => row.map((slug) => getDirectionBySlug(slug)).filter(Boolean))
</script>
