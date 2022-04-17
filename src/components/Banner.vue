<template>
  <div class="bg-banner full-width">
    <h1 class="text-grey-1 q-ml-lg">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BannerComponent',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.bg-banner {
  background: url(../assets/banner.png) no-repeat;
  background-size: cover;
}
</style>
