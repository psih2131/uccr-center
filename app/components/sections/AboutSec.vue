<template>
  <section v-if="aboutSection?.data" class="about">
    <div class="container">
      <div class="about__stats">
        <article v-for="item in aboutSection.data.info_items" :key="item.id" class="about-stat">
          <div class="about-stat__value">
            <span>{{ item.title }}</span>
            <svg class="about-stat__arrow" v-if="item.add_plus_icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" width="2" height="20" rx="1" fill="#D82136"/>
            <rect y="11" width="2" height="20" rx="1" transform="rotate(-90 0 11)" fill="#D82136"/>
            </svg>

          </div>
          <p class="about-stat__text">{{ item.subtitle }}</p>
        </article>
      </div>

      <div class="about__content">
        <p class="about__label">О компании</p>
        <p v-if="aboutSection.data.about_text" class="about__lead">{{ aboutSection.data.about_text }}</p>
        <ButtonsBtnPill
          v-if="aboutSection.data.button_text"
          :title="aboutSection.data.button_text"
          type="link"
          to="/o-kompanii"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig()
console.log(config.public.strapiUrl)
const { data: aboutSection } = await useFetch(`${config.public.strapiUrl}/api/about-section`, {
  key: 'about-section',
  query: { populate: 'info_items' },
})

console.log(aboutSection)
</script>
