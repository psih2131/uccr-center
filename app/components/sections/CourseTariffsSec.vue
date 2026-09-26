<template>
  <section class="course-tariffs">
    <div class="container">
      <h2 class="section-title">Стоимость обучения и тарифы</h2>

      <div class="course-tariffs__list">
        <article v-for="item in tariffs" :key="item.rank" class="course-tariff">
          <div class="course-tariff__person">
            <img :src="item.photo" alt="">
            <div>
              <h3>Авиационный механик</h3>
              <p>{{ item.rank }} разряд</p>
            </div>
          </div>

          <div class="course-tariff__meta">
            <div>
              <span>
                <img src="@/assets/icons/program-clock.svg" alt="" width="18" height="18">
                Срок обучения
              </span>
              <b>{{ item.hours }} часов</b>
            </div>
            <div>
              <span>
                <img src="@/assets/icons/program-book.svg" alt="" width="18" height="18">
                Формат обучения
              </span>
              <b>Дистанционно</b>
            </div>
          </div>

          <div class="course-tariff__price">
            <strong>{{ item.price }}р</strong>
            <span>
              <s>4200р</s>
              <em>-800р</em>
            </span>
          </div>

          <ButtonsBtnPill type="modal" title="Получить консультацию" @click="openConsult" />
        </article>
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

const store = useCounterStore()
const photos = [tm1, tm2, tm3, tm4, tm5]

const tariffs = [
  { rank: 1, hours: 20, price: 3600 },
  { rank: 2, hours: 40, price: 4600 },
  { rank: 3, hours: 60, price: 5600 },
  { rank: 4, hours: 80, price: 6600 },
  { rank: 5, hours: 100, price: 7600 },
].map((item, index) => ({
  ...item,
  photo: photos[index],
}))

const openConsult = () => {
  store.openModal('consult')
}
</script>
