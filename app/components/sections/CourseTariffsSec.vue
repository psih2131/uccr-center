<template>
  <section class="course-tariffs">
    <div class="container">
      <h2 class="section-title">Стоимость обучения и тарифы</h2>

      <div class="course-tariffs__list">
        <article v-for="item in tariffs" :key="item.rank" class="course-tariff">
          <div class="course-tariff__person">
            <img :src="avatar" alt="">
            <div class="course-tariff__info">
              <h3>Авиационный механик</h3>
              <p>{{ item.rank }} разряд</p>
            </div>
          </div>

          <div class="course-tariff__term">
            <span class="course-tariff__label">
              <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
              Срок обучения
            </span>
            <b>{{ item.hours }} часов</b>
          </div>

          <div class="course-tariff__format">
            <span class="course-tariff__label">
              <img src="@/assets/icons/program-book.svg" alt="" width="18" height="18">
              Формат обучения
            </span>
            <b>Дистанционно</b>
          </div>

          <div class="course-tariff__price">
            <strong>{{ item.price }}р</strong>
            <span class="course-tariff__old">
              <s>4200р</s>
              <em>-800р</em>
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

const store = useCounterStore()

const tariffs = [
  { rank: 1, hours: 20, price: 3600 },
  { rank: 2, hours: 40, price: 4600 },
  { rank: 3, hours: 60, price: 5600 },
  { rank: 4, hours: 80, price: 6600 },
  { rank: 5, hours: 100, price: 7600 },
]

const openConsult = () => {
  store.openModal('consult')
}
</script>
