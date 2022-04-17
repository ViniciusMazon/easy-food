<template>
  <q-list bordered class="rounded-borders full-width">
    <q-expansion-item
      v-for="category in categories"
      :key="category.id"
      :label="category.title"
      :caption="`${category.items.length} produtos`"
      default-opened
      class="col-12"
      >
      <div
        v-if="category.items.length === 0"
        class="text-blue-grey q-my-lg text-center"
      >
        Esta categoria não tem produtos
      </div>
      <MenuCategoryItems v-else :items="category.items" class="row" />
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import MenuCategoryItems from 'components/MenuCategoryItems.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuCategory',
  components: {
    MenuCategoryItems
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
})
</script>
