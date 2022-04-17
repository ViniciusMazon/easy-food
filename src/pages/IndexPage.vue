<template>
  <q-page class="column items-start">
    <Banner title="Pedidos" />
  </q-page>
</template>

<script lang="ts">
import { Meta } from 'components/models'
import { defineComponent, ref } from 'vue'
import Banner from 'components/Banner.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    Banner
  },
  setup () {
    const meta = ref<Meta>({
      totalCount: 1200
    })
    return { meta }
  }
})
</script>
