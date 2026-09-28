<template>
  <article class="article-card">
    <div class="article-card__body">
      <span class="article-card__tag">{{ item.tag }}</span>
      <h3 class="article-card__title">{{ item.title }}</h3>
      <p class="article-card__text">{{ item.text }}</p>
      <NuxtLink :to="`/blog/${item.slug}`" class="article-card__more" aria-label="Читать полностью">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 7C8 6.44772 8.44772 6 9 6L17 6C17.5523 6 18 6.44772 18 7V15C18 15.5523 17.5523 16 17 16C16.4477 16 16 15.5523 16 15V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8L9 8C8.44772 8 8 7.55228 8 7Z" fill="white"/>
        </svg>
      </NuxtLink>
    </div>
    <div class="article-card__media">
      <img class="article-card__image" :src="item.image" :alt="item.title">
      <span
        v-for="(bar, index) in bars"
        :key="index"
        class="article-card__bar"
        :style="{ left: `${bar.left}px`, width: `${bar.width}px` }"
      ></span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const bars = [
  { left: 362, width: 1 },
  { left: 366, width: 1 },
  { left: 370, width: 1 },
  { left: 374, width: 1 },
  { left: 385, width: 2 },
  { left: 397, width: 2 },
  { left: 409, width: 4 },
  { left: 427, width: 4 },
  { left: 445, width: 4 },
]
</script>
