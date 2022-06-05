<template>
  <q-page class="column items-start">
    <Banner title="Dashboard" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from 'components/Banner.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    Banner
  }
})
</script>
