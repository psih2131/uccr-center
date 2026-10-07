<template>
  <div class="catalog-category-nav">
    <div v-if="popular.length" class="catalog-nav">
      <div class="catalog-nav__head">
        <h3 class="catalog-nav__title">
          Популярные направления <span>({{ popular.length }})</span>
        </h3>
        <img class="catalog-nav__plus" src="@/assets/icons/catalog-nav-plus.svg" alt="" width="21" height="21">
      </div>
      <div class="catalog-nav__list">
        <button
          v-for="item in popular"
          :key="`popular-${item.id}`"
          type="button"
          class="catalog-nav__item"
          :class="{ 'catalog-nav__item--active': selectedId === item.id }"
          @click="$emit('select', item.id)"
        >
          <span class="catalog-nav__radio"></span>
          <span class="catalog-nav__name">{{ item.name }}</span>
          <span class="catalog-nav__count">{{ item.count }} программы</span>
        </button>
      </div>
    </div>

    <div v-if="others.length" class="catalog-nav">
      <div class="catalog-nav__head">
        <h3 class="catalog-nav__title">
          Другие направления <span>({{ others.length }})</span>
        </h3>
        <img class="catalog-nav__plus" src="@/assets/icons/catalog-nav-plus.svg" alt="" width="21" height="21">
      </div>
      <div class="catalog-nav__list">
        <button
          v-for="item in others"
          :key="`other-${item.id}`"
          type="button"
          class="catalog-nav__item"
          :class="{ 'catalog-nav__item--active': selectedId === item.id }"
          @click="$emit('select', item.id)"
        >
          <span class="catalog-nav__radio"></span>
          <span class="catalog-nav__name">{{ item.name }}</span>
          <span class="catalog-nav__count">{{ item.count }} программы</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  popular: {
    type: Array,
    default: () => [],
  },
  others: {
    type: Array,
    default: () => [],
  },
  selectedId: {
    type: String,
    default: null,
  },
})

defineEmits(['select'])
</script>
