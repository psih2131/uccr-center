<template>
  <main class="blog-post-page">
    <section class="blog-post">
      <div class="container">
        <p class="blog-post__crumbs">
          <NuxtLink to="/">Главная</NuxtLink>
          <span> - </span>
          <NuxtLink to="/blog" class="blog-post__crumbs-current">Блог</NuxtLink>
        </p>

        <div class="blog-post__intro">
          <p class="blog-post__date">{{ post.date }}</p>
          <h1 class="blog-post__title">{{ post.postTitle }}</h1>
          <p class="blog-post__lead"><strong>{{ post.lead }}</strong></p>
        </div>

        <img class="blog-post__hero" :src="post.heroImage" :alt="post.postTitle">

        <div class="text-content blog-post__content" v-html="post.html"></div>

        <div class="blog-post__tags">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag.id"
            :to="`/blog?category=${tag.id}`"
            class="blog-post__tag"
          >
            {{ tag.label }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="blog-similar">
      <div class="container">
        <div class="blog-similar__head">
          <h2 class="section-title blog-similar__title">Похожие посты</h2>
          <ButtonsBtnPill title="Смотреть все статьи" type="link" to="/blog" />
        </div>
        <div class="blog-similar__grid">
          <ArticleCard v-for="item in related" :key="item.slug" :item="item" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { getPostBySlug, getRelatedPosts } from '~/data/posts'

const route = useRoute()
const post = computed(() => getPostBySlug(route.params.slug))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Статья не найдена' })
}

const related = computed(() => getRelatedPosts(route.params.slug, 3))

useSeoMeta({
  title: () => post.value?.postTitle,
})
</script>
