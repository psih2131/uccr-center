<template>
  <section v-if="items.length" class="articles">
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
import { mapBlogCard } from '~/utils/mapBlog'

const props = defineProps({
  title: {
    type: String,
    default: 'Читайте интересные статьи',
  },
  showLink: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: null,
  },
})

const config = useRuntimeConfig()

const items = computed(() => {
  if (props.items == null) {
    return posts.slice(0, 3)
  }

  return props.items
    .map((item) => mapBlogCard(item, config.public.strapiUrl))
    .filter(Boolean)
})
</script>
