<template>
  <q-list bordered class="rounded-borders full-width">
    <q-expansion-item
      v-for="category in categories"
      :key="category.id"
      :label="category.title"
      :caption="category.items.length"
      class="col-12"
      >
      <span v-if="category.items.length === 0">
        Esta categoria não tem produtos
      </span>
      <MenuCategoryItems v-else :items="category.items" class="row" />
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import { MenuCategoryModel } from 'components/models'
import MenuCategoryItems from 'components/MenuCategoryItems.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuCategory',
  components: {
    MenuCategoryItems
  },
  props: {
    categories: {
      type: Array[MenuCategoryModel],
      required: true
    }
  }
})
</script>
