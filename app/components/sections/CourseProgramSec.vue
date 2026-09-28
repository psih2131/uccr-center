<template>
  <section class="course-program">
    <div class="container">
      <h2 class="section-title course-program__title">Что вас ждет на курсе?</h2>

      <div class="course-program__grid">
        <template v-for="(slot, index) in slots" :key="index">
          <div v-if="!slot" class="course-program__empty"></div>

          <article
            v-else-if="!slot.isCta"
            class="course-block"
            :class="{ 'course-block--accent': slot.accent }"
          >
            <span class="course-block__num">№{{ slot.num }}</span>

            <svg
              class="course-block__plus course-block__plus--top"
              width="17"
              height="17"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 2V13M2 7.5H13"
                :stroke="slot.accent ? 'rgba(255,255,255,0.45)' : '#99AAC9'"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
            <svg
              class="course-block__plus course-block__plus--bottom"
              width="17"
              height="17"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 2V13M2 7.5H13"
                :stroke="slot.accent ? 'rgba(255,255,255,0.45)' : '#99AAC9'"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>

            <h3 class="course-block__title">{{ slot.title }}</h3>
            <p class="course-block__text">{{ slot.text }}</p>

            <p class="course-block__time">
              <img src="@/assets/icons/program-clock.svg" alt="" width="20" height="20">
              20-30 часов
            </p>
          </article>

          <article v-else class="course-block course-block--cta">
            <span class="course-block__line course-block__line--h1" aria-hidden="true"></span>
            <span class="course-block__line course-block__line--h2" aria-hidden="true"></span>
            <span class="course-block__line course-block__line--v1" aria-hidden="true"></span>
            <span class="course-block__line course-block__line--v2" aria-hidden="true"></span>

            <h3 class="course-block__title">Оставьте заявку и получите консультацию</h3>
            <p class="course-block__text">Наши специалисты свяжутся с вами в течении 5 минут и расскажут вам все подробности и детали</p>
            <ButtonsBtnPill
              class="btn-pill--light"
              type="modal"
              title="Получить консультацию"
              @click="openConsult"
            />
          </article>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
const store = useCounterStore()

const items = [
  {
    num: '01',
    accent: true,
    title: 'Блок 1. Основы химии',
    text: 'Основные понятия и законы химии. Неорганические вещества и растворы. Электролитическая диссоциация, электролиз и гидролиз.',
  },
  {
    num: '02',
    title: 'Блок 2. Охрана труда и электробезопасность',
    text: 'Требования охраны труда. Основы трудового законодательства. Организация безопасного выполнения работ. Средства защиты. Пожарная безопасность. Оказание первой помощи. Электробезопасность.',
  },
  {
    num: '03',
    title: 'Блок 3. Материаловедение',
    text: 'Металлы и сплавы. Коррозия и способы защиты материалов.',
  },
  {
    num: '04',
    title: 'Блок 4. Процессы и оборудование электролиза',
    text: 'Основы гидростатики и гидродинамики. Гидравлические машины. Основы электротехники. Устройство и виды электролизеров.',
  },
  {
    num: '05',
    title: 'Блок 5. Практика на предприятии',
    text: 'Эксплуатация и техническое обслуживание электролизных установок. Правила устройства электроустановок. Эксплуатация оборудования в соответствии с технологическими инструкциями.',
  },
]

const cta = { isCta: true }

// Макет: row1 = 01 | empty | 02 | 03 ; row2 = empty | 04 | 05 | cta
const emptySlots = new Set([1, 4])

const slots = (() => {
  const list = [...items, cta]
  const result = Array.from({ length: 8 }, () => null)
  let i = 0

  for (let s = 0; s < 8 && i < list.length; s++) {
    if (emptySlots.has(s)) continue
    result[s] = list[i++]
  }

  return result
})()

const openConsult = () => {
  store.openModal('consult')
}
</script>
