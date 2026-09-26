<template>
  <section class="course-program">
    <div class="container">
      <h2 class="section-title">Что вас ждет на курсе?</h2>

      <div class="course-program__grid">
        <article
          v-for="item in blocks"
          :key="item.num"
          class="course-block"
        >
          <span class="course-block__num">№{{ item.num }}</span>
          <p class="course-block__time">
            <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
            20-30 часов
          </p>
          <h3 class="course-block__title">{{ item.title }}</h3>
          <p class="course-block__text">{{ item.text }}</p>
        </article>

        <article class="course-block course-block--cta">
          <h3 class="course-block__title">Оставьте заявку и получите консультацию</h3>
          <p class="course-block__text">Наши специалисты свяжутся с вами в течении 5 минут и расскажут вам все подробности и детали</p>
          <ButtonsBtnPill class="btn-pill--light" type="modal" title="Получить консультацию" @click="openConsult" />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const store = useCounterStore()

const blocks = [
  {
    num: '01',
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

const openConsult = () => {
  store.openModal('consult')
}
</script>
