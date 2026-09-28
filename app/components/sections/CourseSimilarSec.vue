<template>
  <section class="course-similar">
    <div class="container">
      <div class="course-similar__head">
        <h2 class="section-title">Похожие программы</h2>
        <ButtonsBtnPill title="Смотреть все программы" type="link" :to="catalogTo" />
      </div>

      <div class="course-similar__grid">
        <article v-for="(item, index) in items" :key="index" class="program-card">
          <div class="program-card__top">
            <span class="program-card__icon" :style="{ background: item.color }">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M9.238 20.419c-.381 0-.697-.317-.697-.698v-1.926c0-.381.316-.697.697-.697s.698.316.698.697v1.926c0 .39-.317.698-.698.698Z" fill="white"/>
                <path d="M14 20.419c-.381 0-.698-.317-.698-.698v-3.86c0-.382.317-.698.698-.698s.698.316.698.698v3.86c0 .391-.317.698-.698.698Z" fill="white"/>
                <path d="M18.762 20.419c-.382 0-.698-.317-.698-.698v-5.786c0-.381.316-.698.698-.698s.697.317.697.698v5.786c0 .391-.307.698-.697.698Z" fill="white"/>
                <path d="M9.235 15.098c-.316 0-.595-.214-.679-.53-.093-.373.13-.754.512-.847 3.423-.856 6.437-2.726 8.735-5.396l.428-.502a.698.698 0 1 1 1.06.912l-.428.502c-2.484 2.902-5.758 4.921-9.46 5.842-.056.018-.112.018-.168.018Z" fill="white"/>
                <path d="M18.76 11.693c-.381 0-.697-.316-.697-.698V8.977h-2.028a.698.698 0 1 1 0-1.396h2.726c.381 0 .697.317.697.698v2.726c0 .381-.307.698-.698.698Z" fill="white"/>
                <path d="M16.791 24h-5.582C6.158 24 4 21.842 4 16.791v-5.582C4 6.158 6.158 4 11.209 4h5.582C21.842 4 24 6.158 24 11.209v5.582C24 21.842 21.842 24 16.791 24ZM11.209 5.395C6.921 5.395 5.395 6.921 5.395 11.21v5.581c0 4.289 1.526 5.814 5.814 5.814h5.582c4.288 0 5.814-1.525 5.814-5.814v-5.581c0-4.289-1.526-5.814-5.814-5.814h-5.582Z" fill="white"/>
              </svg>
            </span>
            <span class="program-card__cat" :style="{ color: item.color }">{{ item.category }}</span>
          </div>
          <div class="program-card__info">
            <h3 class="program-card__title">{{ item.title }}</h3>
            <p class="program-card__text">{{ item.text }}</p>
          </div>
          <span class="program-card__line"></span>
          <div class="program-card__meta">
            <div class="program-card__meta-col">
              <div class="program-card__meta-label">
                <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
                <span>Срок обучения</span>
              </div>
              <b>{{ item.hours }}</b>
            </div>
            <div class="program-card__meta-col">
              <div class="program-card__meta-label">
                <img src="@/assets/icons/program-book.svg" alt="" width="18" height="18">
                <span>Формат обучения</span>
              </div>
              <b>{{ item.format }}</b>
            </div>
          </div>
          <span class="program-card__line"></span>
          <div class="program-card__bottom">
            <strong class="program-card__price">{{ item.price }}</strong>
            <ButtonsBtnPill title="Подробнее" type="link" :to="item.to" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()
const { catalogUrl, courseUrl } = useCity()
const catalogTo = computed(() => catalogUrl(route.params.id || 'rabochie-professii'))
const courseTo = computed(() => courseUrl(route.params.id || 'rabochie-professii', 'ezhegodnoe-obuchenie-voditelej'))
const colors = ['#5DA0BA', '#66AF5E', '#966DC3']

const items = computed(() => Array.from({ length: 3 }, (_, index) => ({
  category: 'Повышение квалификации',
  title: 'Ежегодное обучение водителей',
  text: 'Обязательное ежегодное обучение для водителей автотранспортных средств.',
  hours: '20 часов',
  format: 'Дистанционно',
  price: '1000 ₽',
  color: colors[index],
  to: courseTo.value,
})))
</script>
