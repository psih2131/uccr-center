<template>
  <section class="articles">
    <div class="container">
      <div class="articles__head">
        <h2 class="section-title articles__title">{{ title }}</h2>
        <ButtonsBtnPill v-if="showLink" title="Смотреть все статьи" type="link" to="/blog" />
      </div>

      <div class="articles__grid">
        <ArticleCard v-for="item in items" :key="item.slug" :item="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { posts } from '~/data/posts'

defineProps({
  title: {
    type: String,
    default: 'Читайте интересные статьи',
  },
  showLink: {
    type: Boolean,
    default: true,
  },
})

const items = posts.slice(0, 3)
</script>
