<template>
  <NuxtLink :to="to" class="spec-card">
    <div class="spec-card__top">
      <span class="spec-card__num" >№{{ index + 1 }}</span>
      <span v-if="statusNew" class="spec-card__new">Новое</span>
      <svg class="spec-card__plus" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M7.5 2V13M2 7.5H13" stroke="#99AAC9" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    </div>
    <h3 class="spec-card__title">{{ course.title }}</h3>
    <p v-if="metaLine" class="spec-card__count">{{ metaLine }}</p>
    <img class="spec-card__image" :src="mediaUrl(course.preview)" :alt="course.preview?.alternativeText || course.title">
    <span class="spec-card__more">
      <span class="spec-card__icon">
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
          <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </span>
      Подробнее
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
  },
  to: {
    type: String,
    required: true,
  },
})

const config = useRuntimeConfig()
const statusNew = ref(false)

const metaLine = computed(() => {
  const price = props.course.default_price
    ? `${props.course.default_price} руб.`
    : ''
  const time = props.course.time
    ? `${props.course.time} час.`
    : ''

  return [price, props.course.form_learning, time]
    .filter(Boolean)
    .join(' / ')
})

function checkStatusNew(createdAt) {
  if (!createdAt) {
    statusNew.value = false
    return
  }

  const createdDate = new Date(createdAt)
  if (Number.isNaN(createdDate.getTime())) {
    statusNew.value = false
    return
  }

  const diffMs = Date.now() - createdDate.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  statusNew.value = diffDays < 30
}

checkStatusNew(props.course.createdAt)

function mediaUrl(file) {
  if (!file?.url) return ''
  if (file.url.startsWith('http')) return file.url
  return `${config.public.strapiUrl}${file.url}`
}
</script>
