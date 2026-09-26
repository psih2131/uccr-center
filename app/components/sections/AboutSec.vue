<template>
  <section class="about">
    <div class="container">
      <div class="about__stats">
        <article v-for="item in stats" :key="item.value" class="about-stat">
          <div class="about-stat__value">
            <span>{{ item.value }}</span>
            <svg class="about-stat__arrow" v-if="item.arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" width="2" height="20" rx="1" fill="#D82136"/>
            <rect y="11" width="2" height="20" rx="1" transform="rotate(-90 0 11)" fill="#D82136"/>
            </svg>

          </div>
          <p class="about-stat__text">{{ item.text }}</p>
        </article>
      </div>

      <div class="about__content">
        <p class="about__label">О компании</p>
        <p class="about__lead">
          «Центр развития» — удостоверяющий центр для компаний, ИП и специалистов. Профессиональное обучение и поддержка на всех этапах работы.
        </p>
        <BtnPill title="Подробнее о компании" type="link" to="/o-kompanii" />
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '12', arrow: true, text: 'Лет опыта в области професионального образования' },
  { value: '100', arrow: true, text: 'Компаний партнеров которые с нами сотрудничают' },
  { value: 'Топ-3', arrow: false, text: 'Крупнейший удостоверяющий центр' },
  { value: '30', arrow: true, text: 'Офисов на реритории Росийской Федирации' },
]
</script>
