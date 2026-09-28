<template>
  <section class="direction-specs">
    <div class="container">
      <div class="direction-specs__bar">
        <h2 class="direction-specs__title">Рабочие специальности</h2>
        <p class="direction-specs__meta">
          Количество специализаций: <b>24</b>
        </p>
        <AlphabeticalIndex />
      </div>

      <div class="direction-specs__grid">
        <NuxtLink
          v-for="card in cards"
          :key="card.to"
          :to="card.to"
          class="spec-card"
        >
          <div class="spec-card__top">
            <span class="spec-card__num">№{{ card.num }}</span>
            <span v-if="card.isNew" class="spec-card__new">Новое</span>
            <svg class="spec-card__plus" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M7.5 2V13M2 7.5H13" stroke="#99AAC9" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="spec-card__title">{{ card.title }}</h3>
          <p class="spec-card__count"><b>{{ card.professions }}</b> профессий</p>
          <img class="spec-card__image" :src="card.image" :alt="card.title">
          <span class="spec-card__more">
            <span class="spec-card__icon">
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>
            Подробнее
          </span>
        </NuxtLink>
      </div>

      <div class="direction-specs__more">
        <ButtonsBtnPill title="Смотреть все специальности" type="link" :to="resolvedCatalogTo" />
      </div>
    </div>
  </section>
</template>

<script setup>
import tm1 from '~/assets/images/team/tm1.jpg'
import tm2 from '~/assets/images/team/tm2.jpg'
import tm3 from '~/assets/images/team/tm3.jpg'
import tm4 from '~/assets/images/team/tm4.jpg'
import tm5 from '~/assets/images/team/tm5.jpg'

const photos = [tm1, tm2, tm3, tm4, tm5]

const props = defineProps({
  catalogTo: {
    type: String,
    default: '',
  },
})

const { catalogUrl } = useCity()

const resolvedCatalogTo = computed(
  () => props.catalogTo || catalogUrl('rabochie-professii'),
)

const cards = computed(() => [
  { num: '01', title: 'Бурильщик', professions: 15, isNew: true, slug: 'burilshchik' },
  { num: '02', title: 'Каменщик', professions: 12, isNew: true, slug: 'kamenshchik' },
  { num: '03', title: 'Слесарь', professions: 12, isNew: true, slug: 'slesar' },
  { num: '04', title: 'Сварщик', professions: 12, isNew: true, slug: 'svarshchik' },
  { num: '05', title: 'Маляр', professions: 12, isNew: true, slug: 'malyar' },
  { num: '01', title: 'Сварщик', professions: 12, isNew: true, slug: 'svarshchik-2' },
  { num: '02', title: 'Маляр', professions: 12, isNew: true, slug: 'malyar-2' },
  { num: '03', title: 'Каменщик', professions: 12, isNew: true, slug: 'kamenshchik-2' },
  { num: '04', title: 'Слесарь', professions: 12, isNew: true, slug: 'slesar-2' },
  { num: '05', title: 'Бурильщик', professions: 15, isNew: true, slug: 'burilshchik-2' },
].map((card, index) => ({
  ...card,
  to: `${resolvedCatalogTo.value}/${card.slug}`,
  image: photos[index % photos.length],
})))
</script>
