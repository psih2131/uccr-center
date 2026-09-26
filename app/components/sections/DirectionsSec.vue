<template>
  <section class="directions">
    <div class="container">
      <div class="directions__head">
        <h2 class="section-title directions__title">Актуальные направления</h2>
        <NuxtLink to="/alfavitnyj-ukazatel" class="directions__index">
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5.833 2.335a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-4.666 3.5a4.667 4.667 0 1 1 8.353 2.862l3.142 3.142a.583.583 0 1 1-.825.825L8.695 9.521A4.667 4.667 0 0 1 1.167 5.835Z" fill="currentColor"/>
          </svg>
          Алфавитный указатель
        </NuxtLink>
      </div>

      <div class="directions__list">
        <article
          v-for="(item, index) in items"
          :key="item.title"
          class="directions__item"
          :class="{ 'directions__item--open': isOpen(index) }"
        >
          <button class="directions__trigger" type="button" @click="toggle(index)">
            <span class="directions__name">{{ item.title }}</span>
            <span class="directions__meta">
              Количество специализаций: <b>{{ item.count }}</b>
            </span>
            <span class="directions__bars" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span class="directions__toggle" aria-hidden="true">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M6 9.5L12.5 16L19 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
            </span>
          </button>

          <Collapse :when="isOpen(index)" class="directions__collapse">
            <div class="directions__grid">
              <NuxtLink
                v-for="card in item.cards"
                :key="card.title"
                :to="card.to"
                class="dir-card"
              >
                <div class="dir-card__top">
                  <span class="dir-card__num">№{{ card.num }}</span>
                  <span v-if="card.isNew" class="dir-card__new">Новое</span>
                  <svg class="dir-card__plus" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M7.5 2V13M2 7.5H13" stroke="#99AAC9" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3 class="dir-card__title">{{ card.title }}</h3>
                <p class="dir-card__count"><b>{{ card.professions }}</b> профессий</p>
                <span class="dir-card__more">
                  <span class="dir-card__icon">
                    <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </span>
                  Подробнее
                </span>
              </NuxtLink>

              <NuxtLink to="/directions/rabochie-professii/catalog" class="dir-card dir-card--cta">
                <span class="dir-card__line dir-card__line--h dir-card__line--h1"></span>
                <span class="dir-card__line dir-card__line--h dir-card__line--h2"></span>
                <span class="dir-card__line dir-card__line--v dir-card__line--v1"></span>
                <span class="dir-card__line dir-card__line--v dir-card__line--v2"></span>
                <span class="dir-card__line dir-card__line--v dir-card__line--v3"></span>
                <img src="@/assets/icons/dir-1.png" alt="" class="dir-card__cta-img" aria-hidden="true">
                <p class="dir-card__cta-title">Смотреть список всех курсов и програм</p>
                
                <div class="dir-card__cta-count-wrapper">
                  <p class="dir-card__cta-count">Количество курсов: <b>235</b></p>
                  <span class="dir-card__icon dir-card__icon--light">
                    <svg width="24" height="24" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </span>
                </div>
                
              </NuxtLink>
            </div>
          </Collapse>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Collapse } from 'vue-collapsed'

const professionCards = [
  { num: '01', title: 'Бурильщик', professions: 15, isNew: true, to: '/directions/rabochie-professii/catalog/burilshchik' },
  { num: '02', title: 'Водитель погрузчика', professions: 15, isNew: true, to: '/directions/rabochie-professii/catalog/voditel-pogruzchika' },
  { num: '03', title: 'Кассир', professions: 15, isNew: true, to: '/directions/rabochie-professii/catalog/kassir' },
  { num: '04', title: 'Машинист', professions: 15, isNew: true, to: '/directions/rabochie-professii/catalog/mashinist' },
  { num: '05', title: 'Младший медперсонал', professions: 15, isNew: true, to: '/directions/rabochie-professii/catalog/medpersonal' },
  { num: '01', title: 'Монтажник', professions: 15, isNew: true, to: '/directions/rabochie-professii/catalog/montazhnik' },
  { num: '02', title: 'Оператор', professions: 15, isNew: true, to: '/directions/rabochie-professii/catalog/operator' },
  { num: '03', title: 'Сварщик', professions: 15, isNew: true, to: '/directions/rabochie-professii/catalog/svarshchik' },
]

const items = [
  { title: 'Рабочие профессии', count: 24, cards: professionCards },
  { title: 'Курсы повышения квалификации', count: 24, cards: professionCards },
  { title: 'Переподготовка', count: 12, cards: professionCards },
  { title: 'Аттестация', count: 40, cards: professionCards },
  { title: 'Охрана труда', count: 43, cards: professionCards },
]

const openIndexes = ref([0])

const isOpen = (index) => openIndexes.value.includes(index)

const toggle = (index) => {
  if (isOpen(index)) {
    openIndexes.value = openIndexes.value.filter((i) => i !== index)
    return
  }

  openIndexes.value = [...openIndexes.value, index]
}
</script>
