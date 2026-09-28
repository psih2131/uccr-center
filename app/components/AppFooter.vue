<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__card footer__card--brand">
          <NuxtLink to="/" class="footer__logo">
            <img src="@/assets/images/logo.png" alt="УЦЦР">
          </NuxtLink>
          <p class="footer__about">
            Многопрофильный учебный центр дополнительного профессионального образования
          </p>
          <span class="footer__rule"></span>
          <div class="footer__socials">
            <a class="footer__social" href="#" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15.7 3.2 2.9 8.2c-.9.36-.88 1.02-.16 1.28l3.28 1.02 1.2 3.68c.16.5.29.7.62.7.4 0 .58-.18.8-.4l1.62-1.58 3.38 2.5c.62.34 1.06.16 1.22-.58l2.2-10.38c.22-1.02-.4-1.46-1.36-1.08Z" fill="white"/>
              </svg>
            </a>
            <a class="footer__social" href="#" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.6A7.4 7.4 0 0 0 2.4 12.3L1.6 16.4l4.2-.8A7.4 7.4 0 1 0 9 1.6Zm4.1 10.4c-.17.48-.98.9-1.37.96-.35.05-.8.08-1.29-.08-.3-.1-.68-.22-1.18-.43-2.07-.9-3.42-2.98-3.52-3.12-.1-.14-.84-1.12-.84-2.14 0-1.02.53-1.52.72-1.73.19-.2.41-.26.55-.26h.4c.13 0 .3-.05.47.36.17.42.59 1.45.64 1.56.05.1.09.23.02.38-.07.14-.1.23-.2.36-.1.12-.21.27-.3.36-.1.1-.2.2-.09.4.12.19.52.86 1.12 1.4.77.68 1.42.9 1.62 1 .2.1.32.08.44-.05.12-.13.5-.58.64-.78.13-.2.27-.16.45-.1.19.07 1.18.56 1.38.66.2.1.33.15.38.23.05.08.05.47-.12.95Z" fill="white"/>
              </svg>
            </a>
            <a class="footer__social" href="#" aria-label="VK">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9.7 13.2h.7s.2-.02.3-.14c.1-.1.1-.3.1-.3s0-1 .45-1.15c.44-.14 1 .9 1.62 1.3.46.3.81.24.81.24l1.64-.02s.86-.05.45-.73c-.03-.06-.24-.5-1.23-1.42-.99-.96-.86-.8.33-2.46.73-1 1.02-1.62.93-1.88-.09-.26-.64-.19-.64-.19h-1.85s-.14-.02-.24.04c-.1.06-.16.2-.16.2s-.3.8-.7 1.48c-.84 1.42-1.18 1.5-1.32 1.4-.32-.2-.24-.82-.24-1.26 0-1.37.21-1.94-.4-2.09-.2-.05-.35-.08-.87-.09-.66 0-1.22 0-1.54.16-.21.1-.38.35-.14.36.3.02.61.16.66.52.07.47.07 1.42-.17 1.6-.33.24-.79-.25-1.77-1.44-.5-.61-.88-1.36-.88-1.36s-.07-.17-.2-.26c-.15-.1-.36-.14-.36-.14H3.5s-.32 0-.44.15c-.1.13 0 .4 0 .4s1.4 3.28 3 4.93c1.46 1.52 3.12 1.42 3.12 1.42Z" fill="white"/>
              </svg>
            </a>
            <a class="footer__social" href="#" aria-label="MAX">
              <img src="@/assets/icons/form-max.png" alt="">
            </a>
          </div>
          <span class="footer__rule"></span>
          <p class="footer__hot">Горячая линия</p>
          <div class="footer__phones">
            <a href="tel:+79189942241">+7(918) 994-22-41</a>
            <a href="tel:+79189942241">+7(918) 994-22-41</a>
          </div>
          <a class="footer__mail" href="mailto:info@uccr.ru">info@uccr.ru</a>
        </div>

        <div class="footer__card footer__card--services">
          <h3 class="footer__title">Услуги и программы</h3>
          <span class="footer__rule"></span>
          <ul class="footer__list">
            <li><NuxtLink to="/sro">СРО</NuxtLink></li>
            <li><NuxtLink to="/nrs">НРС</NuxtLink></li>
            <li><NuxtLink to="/obuchenie">Обучение</NuxtLink></li>
            <li><NuxtLink to="/rabochie-professii" class="footer__link--active">Обучение рабочим специальностям</NuxtLink></li>
            <li><NuxtLink to="/perepodgotovka">Профессиональная переподготовка</NuxtLink></li>
            <li><NuxtLink to="/akkreditaciya">Аккредитация медперсонала</NuxtLink></li>
            <li><NuxtLink to="/akkreditaciya-vrachej">Аккредитация врачей</NuxtLink></li>
            <li><NuxtLink to="/akkreditaciya-srednego">Аккредитация среднего медперсонала</NuxtLink></li>
            <li><NuxtLink to="/ohrana-truda">Охрана труда</NuxtLink></li>
          </ul>
        </div>

        <div class="footer__card footer__card--nav">
          <h3 class="footer__title">Навигация по сайту</h3>
          <span class="footer__rule"></span>
          <ul class="footer__list">
            <li><NuxtLink to="/">Главная</NuxtLink></li>
            <li><NuxtLink to="/o-kompanii">О компании</NuxtLink></li>
            <li><NuxtLink to="/licenzii">Лицензии</NuxtLink></li>
            <li><NuxtLink to="/kontakty" class="footer__link--active">Контакты</NuxtLink></li>
            <li><NuxtLink to="/blog">Блог</NuxtLink></li>
            <li><NuxtLink to="/napravleniya">Все направления</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">© 2012–2026, ООО «Центр Развития»</p>
        <div class="footer__legal">
          <NuxtLink to="/docs/obrabotka-cookie" class="footer__cookie">Обработка куки</NuxtLink>
          <NuxtLink to="/docs/politika-konfidencialnosti" class="footer__policy">Политика конфиденциальности</NuxtLink>
        </div>
      </div>

      <div class="footer__credit">
        Разработка дизайна:
        <a href="https://kuzmich-agency.com/" target="_blank" rel="noopener">Kuzmich agency</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
