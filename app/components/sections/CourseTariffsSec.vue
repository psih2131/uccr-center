<template>
  <section v-if="section?.title_section" class="course-tariffs">
    <div class="container">
      <h2 class="section-title">{{ section.title_section }}</h2>

      <div class="course-tariffs__list">
        <article v-for="(item, index) in tariffs" :key="item.id || index" class="course-tariff">
          <div class="course-tariff__person">
            <img :src="avatar" alt="">
            <div class="course-tariff__info">
              <h3>{{ item.title }}</h3>
              <p v-if="item.subtitle">{{ item.subtitle }}</p>
            </div>
          </div>

          <div class="course-tariff__term">
            <span class="course-tariff__label">
              <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
              Срок обучения
            </span>
            <b>{{ item.hour }} часов</b>
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

const openConsult = () => {
  store.openModal('consult')
}
</script>
