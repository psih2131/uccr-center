<template>
  <section v-if="questions.length" class="faq">
    <div class="container">
      <div class="faq__head">
        <h2 class="section-title faq__title">Часто-задаваемые вопросы</h2>
        <ButtonsBtnPill title="Задать свой вопрос" type="modal" @click="openConsult" />
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
    </div>
  </section>
</template>

<script setup>
import { Collapse } from 'vue-collapsed'

const config = useRuntimeConfig()
const store = useCounterStore()

const openConsult = () => {
  store.openModal('consult')
}

const { data: faqSection } = await useFetch(`${config.public.strapiUrl}/api/course-faq-sec`, {
  key: 'course-faq-sec',
  query: {
    'populate[faq_items]': true,
  },
})

const questions = computed(() =>
  (faqSection.value?.data?.faq_items || [])
    .filter((item) => item?.questions)
    .map((item) => ({ q: item.questions, a: item.answer || '' })),
)

const openIndex = ref(-1)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}

const leftItems = computed(() =>
  questions.value.map((item, i) => ({ ...item, i })).filter((_, i) => i % 2 === 0),
)
const rightItems = computed(() =>
  questions.value.map((item, i) => ({ ...item, i })).filter((_, i) => i % 2 === 1),
)
</script>
