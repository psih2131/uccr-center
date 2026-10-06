<template>
  <section class="faq">
    <div class="container">
      <div class="faq__head">
        <h2 class="section-title faq__title">Часто-задаваемые вопросы</h2>
        <div class="faq__head-action">
          <ButtonsBtnPill title="Задать свой вопрос" type="modal" @click="openConsult" />
        </div>
      </div>

      <div class="faq__cols">
        <div class="faq__col">
          <article
            v-for="item in leftItems"
            :key="item.q"
            class="faq-item"
            :class="{ 'faq-item--open': openIndex === item.i }"
          >
            <button class="faq-item__btn" type="button" @click="toggle(item.i)">
              <span>{{ item.q }}</span>
              <span class="faq-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="openIndex === item.i">
              <p class="faq-item__answer">{{ item.a }}</p>
            </Collapse>
          </article>
        </div>

        <div class="faq__col">
          <article
            v-for="item in rightItems"
            :key="item.q"
            class="faq-item"
            :class="{ 'faq-item--open': openIndex === item.i }"
          >
            <button class="faq-item__btn" type="button" @click="toggle(item.i)">
              <span>{{ item.q }}</span>
              <span class="faq-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="openIndex === item.i">
              <p class="faq-item__answer">{{ item.a }}</p>
            </Collapse>
          </article>
        </div>
      </div>

      <div class="faq__foot">
        <ButtonsBtnPill title="Задать свой вопрос" type="modal" @click="openConsult" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Collapse } from 'vue-collapsed'

const store = useCounterStore()

const openConsult = () => {
  store.openModal('consult')
}

const props = defineProps({
  items: {
    type: Array,
    default: null,
  },
})

const defaultQuestions = [
  {
    q: 'Как проходит обучение?',
    a: 'Обучение проходит дистанционно: вы изучаете материалы в личном кабинете и сдаёте итоговый тест в удобное время.',
  },
  {
    q: 'Какие документы я получу после окончания?',
    a: 'После окончания курса вы получаете официальные документы установленного образца — те же, что и при очном обучении.',
  },
  {
    q: 'Можно ли пройти обучение онлайн?',
    a: 'Да, дистанционная форма полностью официальная. Вы проходите программу онлайн и получаете те же документы, что и при очном обучении.',
  },
  {
    q: 'Сколько длится обучение?',
    a: 'Срок зависит от программы: от нескольких дней до нескольких месяцев. Точные часы указаны в карточке курса.',
  },
  {
    q: 'Нужен ли для обучения опыт работы или профильное образование?',
    a: 'Для большинства программ опыт не обязателен. Если для курса есть требования, они указаны на странице направления.',
  },
  {
    q: 'Как быстро я получу документы после завершения курса?',
    a: 'Скан-копии направляем на почту в день окончания курса, оригиналы доставляем Почтой России бесплатно.',
  },
  {
    q: 'Как записаться на обучение?',
    a: 'Оставьте заявку на сайте — специалист свяжется с вами, подберёт программу и оформит документы.',
  },
]

const questions = computed(() => {
  if (!props.items) return defaultQuestions
  return props.items
    .filter((item) => item?.questions)
    .map((item) => ({ q: item.questions, a: item.answer || '' }))
})

const openIndex = ref(-1)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}

const leftItems = computed(() => questions.value.map((item, i) => ({ ...item, i })).filter((_, i) => i % 2 === 0))
const rightItems = computed(() => questions.value.map((item, i) => ({ ...item, i })).filter((_, i) => i % 2 === 1))
</script>
