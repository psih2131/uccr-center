<template>
  <section class="logos" aria-label="Компании-партнёры">
    <div class="logos__viewport">
      <div class="logos__track">
        <div class="logos__group" v-for="copy in 2" :key="copy" :aria-hidden="copy > 1">
          <div class="logos__item" v-for="(logo, index) in group" :key="`${copy}-${index}`">
            <img :src="logo" alt="" >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import logo1 from '~/assets/images/logos/logo-1.png'
import logo2 from '~/assets/images/logos/logo-2.png'
import logo3 from '~/assets/images/logos/logo-3.png'
import logo4 from '~/assets/images/logos/logo-4.png'
import logo5 from '~/assets/images/logos/logo-5.png'
import logo6 from '~/assets/images/logos/logo-6.png'
import logo7 from '~/assets/images/logos/logo-7.png'

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7]
const group = [...logos, ...logos]
</script>
