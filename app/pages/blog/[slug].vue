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
          <p v-if="post.date" class="blog-post__date">{{ post.date }}</p>
          <h1 class="blog-post__title">{{ post.postTitle }}</h1>
          <p v-if="post.lead" class="blog-post__lead"><strong>{{ post.lead }}</strong></p>
        </div>

        <img
          v-if="post.heroImage"
          class="blog-post__hero"
          :src="post.heroImage"
          :alt="post.postTitle"
        >

        <div
          v-if="contentHtml"
          class="text-content blog-post__content"
          v-html="contentHtml"
        ></div>

        <div v-if="post.tags.length" class="blog-post__tags">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag.slug"
            :to="`/blog/category/${tag.slug}`"
            class="blog-post__tag"
          >
            {{ tag.title }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="blog-similar">
      <div class="container">
        <div class="blog-similar__head">
          <h2 class="section-title blog-similar__title">Похожие посты</h2>
          <div class="blog-similar__head-action">
            <ButtonsBtnPill title="Смотреть все статьи" type="link" to="/blog" />
          </div>
        </div>
        <div class="blog-similar__grid">
          <ArticleCard v-for="item in related" :key="item.slug" :item="item" />
        </div>
        <div class="blog-similar__foot">
          <ButtonsBtnPill title="Смотреть все статьи" type="link" to="/blog" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { marked } from 'marked'
import { mapBlogCard, mapBlogPost } from '~/utils/mapBlog'

const route = useRoute()
const config = useRuntimeConfig()
const slug = computed(() => String(route.params.slug || ''))

marked.setOptions({
  breaks: true,
  gfm: true,
})

const { data: blogResponse } = await useFetch(`${config.public.strapiUrl}/api/blogs`, {
  key: () => `blog-post-${slug.value}`,
  query: computed(() => ({
    'filters[slug][$eq]': slug.value,
    'populate[image]': true,
    'populate[blog_categories]': true,
    'populate[recommended_posts][populate][image]': true,
    'populate[recommended_posts][populate][blog_categories]': true,
    'pagination[pageSize]': 1,
  })),
})

const rawPost = computed(() => blogResponse.value?.data?.[0] || null)

const post = computed(() => mapBlogPost(rawPost.value, config.public.strapiUrl))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Статья не найдена' })
}

const contentHtml = computed(() => {
  if (!post.value?.post_text) return ''
  return marked.parse(String(post.value.post_text))
})

const related = computed(() =>
  (rawPost.value?.recommended_posts || [])
    .map((item) => mapBlogCard(item, config.public.strapiUrl))
    .filter(Boolean),
)

useSeoMeta({
  title: () => post.value?.postTitle || 'Статья',
})
</script>
