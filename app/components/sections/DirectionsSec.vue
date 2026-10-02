<template>
  <section class="directions">
    <div class="container">
      <div class="directions__head">
        <h2 class="section-title directions__title">Актуальные направления</h2>
        <AlphabeticalIndex />
      </div>

      <div class="directions__list">
        <article
          v-for="(item, index) in items"
          :key="item.slug"
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
              <CardsCategoryDirectionCard
                v-for="(card, cardIndex) in item.cards"
                :key="card.slug"
                :title="card.title"
                :to="card.to"
                :professions="card.professions"
                :index="cardIndex"
                :created-at="card.createdAt"
              />

              <NuxtLink :to="item.catalogTo" class="dir-card dir-card--cta">
                <span class="dir-card__line dir-card__line--h dir-card__line--h1"></span>
                <span class="dir-card__line dir-card__line--h dir-card__line--h2"></span>
                <span class="dir-card__line dir-card__line--v dir-card__line--v1"></span>
                <span class="dir-card__line dir-card__line--v dir-card__line--v2"></span>
                <span class="dir-card__line dir-card__line--v dir-card__line--v3"></span>
                <img src="@/assets/icons/dir-1.png" alt="" class="dir-card__cta-img" aria-hidden="true">
                <p class="dir-card__cta-title">Смотреть список всех курсов и програм</p>

                <div class="dir-card__cta-count-wrapper">
                  <p class="dir-card__cta-count">Количество курсов: <b>{{ item.coursesCount }}</b></p>
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
import { Collapse } from 'vue-collapsed'

const config = useRuntimeConfig()
const { catalogUrl } = useCity()

const { data: directionsResponse } = await useFetch(`${config.public.strapiUrl}/api/directions`, {
  key: 'directions-sec',
  query: {
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'populate[courses][count]': true,
    'populate[category_directions][fields][0]': 'title',
    'populate[category_directions][fields][1]': 'slug',
    'populate[category_directions][fields][2]': 'createdAt',
    'populate[category_directions][populate][courses][count]': true,
    'pagination[pageSize]': 100,
    sort: 'updatedAt:asc',
  },
})

function relationCount(value) {
  if (typeof value?.count === 'number') return value.count
  if (Array.isArray(value)) return value.length
  return 0
}

const items = computed(() =>
  (directionsResponse.value?.data || [])
    .filter((item) => item?.slug && item?.title)
    .map((direction) => {
      const coursesCount = relationCount(direction.courses)

      const cards = (direction.category_directions || [])
        .filter((category) => category?.slug && category?.title)
        .map((category) => ({
          title: category.title,
          slug: category.slug,
          createdAt: category.createdAt || '',
          professions: relationCount(category.courses),
          to: catalogUrl(direction.slug),
        }))
        .sort((a, b) => b.professions - a.professions)
        .slice(0, 8)

      return {
        title: direction.title,
        slug: direction.slug,
        count: coursesCount,
        coursesCount,
        catalogTo: catalogUrl(direction.slug),
        cards,
      }
    }),
)

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
