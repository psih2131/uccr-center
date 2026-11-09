<template>
  <section v-if="section?.title_section" class="course-tariffs">
    <div class="container">
      <h2 class="section-title">{{ section.title_section }}</h2>

      <div class="course-tariffs__list">
        <article v-for="(item, index) in tariffs" :key="item.id || index" class="course-tariff">
          <div class="course-tariff__person">
            <img :src="avatar" alt="">
            <div class="course-tariff__info">
              <div class="course-tariff__title-row">
                <h3 class="course-tariff__title">{{ tariffTitle(item.title) }}</h3>
                <button
                  v-if="isTariffTitleLong(item.title)"
                  type="button"
                  class="course-tariff__hint"
                  aria-label="Полное название"
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" />
                    <path d="M10 9.1v5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <circle cx="10" cy="6.15" r="0.9" fill="currentColor" />
                  </svg>
                  <span class="course-tariff__hint-pop">{{ tariffTitleText(item.title) }}</span>
                </button>
              </div>
              <p v-if="item.subtitle">{{ item.subtitle }}</p>
            </div>
          </div>

          <div class="course-tariff__term" >
            <span class="course-tariff__label">
              <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
              Срок обучения
            </span>
            <b v-if="item.hour != null">{{ item.hour }} </b>
            <b v-else>-</b>
          </div>

          <div class="course-tariff__format">
            <span class="course-tariff__label">
              <img src="@/assets/icons/program-book.svg" alt="" width="18" height="18">
              Формат обучения
            </span>
            <b>{{ item.type || 'Дистанционно' }}</b>
          </div>

          <div v-if="item.current_price != null" class="course-tariff__price">
            <strong>{{ item.current_price }}р</strong>
            <span v-if="item.old_price != null" class="course-tariff__old">
              <s>{{ item.old_price }}р</s>
              <em>-{{ Math.abs(item.old_price - item.current_price) }}р</em>
            </span>
          </div>

          <ButtonsBtnPill
            class="course-tariff__btn"
            type="modal"
            title="Получить консультацию"
            @click="openConsult"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import avatar from '~/assets/images/course/course-tariff-avatar.png'

const props = defineProps({
  section: {
    type: Object,
    default: null,
  },
})

const store = useCounterStore()

const tariffs = computed(() => props.section?.price_list || [])

const TARIFF_TITLE_LIMIT = 70

const tariffTitleText = (title) => String(title || '').trim()

const isTariffTitleLong = (title) => tariffTitleText(title).length > TARIFF_TITLE_LIMIT

const tariffTitle = (title) => {
  const text = tariffTitleText(title)
  if (text.length <= TARIFF_TITLE_LIMIT) return text
  return `${text.slice(0, TARIFF_TITLE_LIMIT).trimEnd()}...`
}

const openConsult = () => {
  store.openModal('consult')
}
</script>
