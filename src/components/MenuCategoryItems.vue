<template>
   <div class="row">
    <MenuItem
      class="col-2 q-mx-md q-my-md"
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :description="item.description"
      :price="item.price"
      :categoryId="item.categoryId"
      :link="item.link"
      :image="item.image"
    />
  </div>
</template>

<script lang="ts">
import MenuItem from 'components/MenuItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuCategoryItems',
  components: {
    MenuItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
})
</script>
