<template>
  <section class="course-docs">
    <div class="container">
      <h2 class="section-title">Какие документы нужны?</h2>

      <div class="course-docs__grid">
        <article v-for="item in docs" :key="item.title" class="course-docs__card">
          <span class="course-docs__icon">
            <img :src="item.icon" alt="" width="60" height="60">
          </span>
          <h3>{{ item.title }}</h3>
          <ul>
            <li v-for="line in item.lines" :key="line">{{ line }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import iconCert from '~/assets/images/course/course-doc-cert.png'
import iconPassport from '~/assets/images/course/course-doc-passport.png'
import iconPhoto from '~/assets/images/course/course-doc-photo.png'
import iconAddress from '~/assets/images/course/course-doc-address.png'

const docs = [
  {
    title: 'Заявка на обучение',
    icon: iconCert,
    lines: ['ФИО', 'Специальность', 'Разряд'],
  },
  {
    title: 'Паспорт',
    icon: iconPassport,
    lines: ['Паспортные данные для заключения договора (фото / скан / текст)'],
  },
  {
    title: 'Фото на светлом фоне',
    icon: iconPhoto,
    lines: ['Для оформления удостоверения'],
  },
  {
    title: 'Адрес',
    icon: iconAddress,
    lines: ['Для доставки оригиналов документов'],
  },
]
</script>
