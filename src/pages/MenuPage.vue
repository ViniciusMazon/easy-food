<template>
  <q-page class="row items-center justify-evenly">
    <MenuItem
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :description="item.description"
      :price="item.price"
      :categoryId="item.categoryId"
      :link="item.link"
      :image="item.image"
    />
  </q-page>
</template>

<script lang="ts">
import { MenuItemModel } from 'components/models'
import MenuItem from 'components/MenuItem.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MenuPage',
  components: {
    MenuItem
  },
  setup () {
    const items = ref<MenuItemModel[]>([
      {
        id: 1,
        title: 'Pizza 3 sabores',
        description: 'Uma deliciosa pizza de 3 sabores, quentinha, no forno a lenha',
        price: 'R$ 35,00',
        categoryId: 1,
        link: 'teste',
        image: 'https://cdn.quasar.dev/img/chicken-salad.jpg',
        isAvailable: false
      }
    ])

    return { items }
  }
})
</script>
