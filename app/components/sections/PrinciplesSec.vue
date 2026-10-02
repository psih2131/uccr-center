<template>
  <section v-if="items.length" class="principles">
    <div class="container">
      <h2 class="section-title principles__title">{{ sectionTitle }}</h2>

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
            <ButtonsBtnPill class="btn-pill--light" title="Получить консультацию" type="modal" @click="openConsult" />
          </article>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig()
const store = useCounterStore()

const openConsult = () => {
  store.openModal('consult')
}

const { data: principlesResponse } = await useFetch(`${config.public.strapiUrl}/api/princips-sec`, {
  key: 'princips-sec',
  query: {
    'populate[princips_items]': true,
  },
})

const sectionTitle = computed(
  () => principlesResponse.value?.data?.title_section || 'Принципы работы компании',
)

const items = computed(() => {
  const list = principlesResponse.value?.data?.princips_items || []
  return list
    .filter((item) => item?.title || item?.text)
    .map((item, index) => ({
      num: String(index + 1).padStart(2, '0'),
      title: item.title || '',
      text: item.text || '',
      accent: index === 0,
    }))
})

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

const slots = computed(() => buildSlots(items.value))
</script>
