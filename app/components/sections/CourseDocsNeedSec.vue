<template>
  <section class="course-docs">
    <div class="container">
      <h2 class="section-title course-docs__title">Какие документы нужны?</h2>

      <div class="course-docs__grid">
        <article v-for="item in docs" :key="item.title" class="course-docs__card">
          <span class="course-docs__line course-docs__line--v1" aria-hidden="true"></span>
          <span class="course-docs__line course-docs__line--v2" aria-hidden="true"></span>

          <span class="course-docs__icon">
            <img :src="item.icon" alt="" width="60" height="60">
          </span>

          <h3>{{ item.title }}</h3>

          <ul v-if="item.lines">
            <li v-for="line in item.lines" :key="line">{{ line }}</li>
          </ul>
          <p v-else class="course-docs__text">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import icon1 from '~/assets/images/icons/doc1.png'
import icon2 from '~/assets/images/icons/doc2.png'
import icon3 from '~/assets/images/icons/doc3.png'
import icon4 from '~/assets/images/icons/doc4.png'

const docs = [
  {
    title: 'Заявка на обучение',
    icon: icon1,
    lines: ['ФИО', 'Специальность', 'Разряд'],
  },
  {
    title: 'Паспорт',
    icon: icon2,
    text: 'Паспортные данные для заключения договора (фото / скан / текст)',
  },
  {
    title: 'Фото на светлом фоне',
    icon: icon3,
    text: 'Для оформления удостоверения',
  },
  {
    title: 'Адрес',
    icon: icon4,
    text: 'Для доставки оригиналов документов',
  },
]
</script>
