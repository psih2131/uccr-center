<template>
  <NuxtLink :to="to" class="dir-card">
    <div class="dir-card__top">
      <span class="dir-card__num">№{{ num }}</span>
      <span v-if="isNew" class="dir-card__new">Новое</span>
      <svg class="dir-card__plus" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M7.5 2V13M2 7.5H13" stroke="#99AAC9" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    </div>
    <h3 class="dir-card__title">{{ title }}</h3>
    <p class="dir-card__count"><b>{{ professions }}</b> профессий</p>
    <span class="dir-card__more">
      <span class="dir-card__icon">
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
  title: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  professions: {
    type: Number,
    default: 0,
  },
  index: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: '',
  },
})

const num = computed(() => String(props.index + 1).padStart(2, '0'))

const isNew = computed(() => {
  if (!props.createdAt) return false

  const createdDate = new Date(props.createdAt)
  if (Number.isNaN(createdDate.getTime())) return false

  const diffDays = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays < 30
})
</script>
