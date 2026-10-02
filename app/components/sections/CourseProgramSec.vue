<template>
  <section v-if="programItems.length" class="course-program">
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

            <p v-if="slot.time" class="course-block__time">
              <img src="@/assets/icons/program-clock.svg" alt="" width="20" height="20">
              {{ slot.time }}
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
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const store = useCounterStore()

const programItems = computed(() =>
  (props.items || []).map((item, index) => ({
    num: String(index + 1).padStart(2, '0'),
    accent: index === 0,
    title: item.title || '',
    text: item.text || '',
    time: item.time || '',
  })),
)

const cta = { isCta: true }

// 5:
// [01] [  ] [02] [03]
// [  ] [04] [05] [CTA]
// 6:
// [01] [  ] [02] [03]
// [04] [05] [06] [CTA]
// 7+:
// [01] [02] [03] [04]
// [05] [06] [07] [CTA]
// 8+ — обычным рядом после сетки
const SLOTS_UP_TO_5 = [0, 2, 3, 5, 6]
const SLOTS_FROM_6 = [0, 2, 3, 4, 5, 6]
const SLOTS_FROM_7 = [0, 1, 2, 3, 4, 5, 6]
const CTA_SLOT = 7

const slots = computed(() => {
  const cards = programItems.value
  const count = cards.length
  const grid = Array.from({ length: 8 }, () => null)
  grid[CTA_SLOT] = cta

  if (count <= 5) {
    cards.forEach((card, i) => {
      grid[SLOTS_UP_TO_5[i]] = card
    })
    return grid
  }

  if (count === 6) {
    cards.forEach((card, i) => {
      grid[SLOTS_FROM_6[i]] = card
    })
    return grid
  }

  cards.slice(0, 7).forEach((card, i) => {
    grid[SLOTS_FROM_7[i]] = card
  })

  return [...grid, ...cards.slice(7)]
})

const openConsult = () => {
  store.openModal('consult')
}
</script>
