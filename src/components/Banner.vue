<template>
  <div class="bg-banner full-width">
    <h2 class="text-grey q-my-sm q-py-md q-px-md full-width">
      {{ title }}
    </h2>
    <div v-if="btnTitle" class="row justify-end q-my-md q-mx-md">
    <q-btn
      color="primary"
      text-color="white"
      :label="btnTitle"
      @click="action"
      />
    </div>
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
    },
    btnTitle: {
      type: String,
      required: false
    },
    action: {
      type: Function,
      required: false
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
