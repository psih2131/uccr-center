<template>
  <section class="principles">
    <div class="container">
      <h2 class="section-title principles__title">Принципы работы компании</h2>

      <div class="principles__grid">
        <template v-for="(slot, index) in slots" :key="index">
          <div v-if="!slot" class="principles__empty"></div>

          <article
            v-else-if="!slot.isCta"
            class="principle-card"
            :class="{ 'principle-card--accent': slot.accent }"
          >
            <span class="principle-card__num">№{{ slot.num }}</span>
            <svg class="principle-card__plus" width="20" height="20" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M7.5 2V13M2 7.5H13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            <h3 class="principle-card__title">{{ slot.title }}</h3>
            <p class="principle-card__text">{{ slot.text }}</p>
          </article>

          <article v-else class="principle-card principle-card--cta">
            <span class="principle-card__line principle-card__line--h principle-card__line--h1"></span>
            <span class="principle-card__line principle-card__line--h principle-card__line--h2"></span>
            <span class="principle-card__line principle-card__line--v principle-card__line--v1"></span>
            <span class="principle-card__line principle-card__line--v principle-card__line--v2"></span>
            <h3 class="principle-card__cta-title">Оставьте заявку и получите консультацию</h3>
            <p class="principle-card__text">Наши специалисты свяжутся с вами в течении 5 минут и раскажут вам все подробности и детали</p>
            <BtnPill class="btn-pill--light" title="Получить консультацию" type="modal" />
          </article>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const items = [
  {
    num: '01',
    title: 'Уверенность',
    accent: true,
    text: 'Мы уверены в собственных силах и готовы к преодолению любых препятствий для решения самых сложных задач наших клиентов',
  },
  {
    num: '02',
    title: 'Ответственность',
    text: 'Мы не боимся брать на себя серьезные обязательства и нести ответственность за результат.',
  },
  {
    num: '03',
    title: 'Принципиальность',
    text: 'Мы выполняем свои обязательства, руководствуясь принципами и нормами профессиональной этики.',
  },
  {
    num: '04',
    title: 'Иследыватели',
    text: 'Мы следим за изменениями в мире бизнеса и находимся в постоянном поиске новых возможностей для решения задач наших клиентов.',
  },
  {
    num: '05',
    title: 'Создаем пользу',
    text: 'Мы создаем решения, которые приносят нашим клиентам и обществу реальную пользу.',
  },
]

const cta = { isCta: true }

const buildSlots = (cards) => {
  const list = [...cards, cta]
  const empty = new Set([1, 4])
  const slots = Array.from({ length: 8 }, () => null)
  let i = 0

  for (let s = 0; s < 8 && i < list.length; s++) {
    if (empty.has(s)) continue
    slots[s] = list[i++]
  }

  return slots
}

const slots = computed(() => buildSlots(items))
</script>
