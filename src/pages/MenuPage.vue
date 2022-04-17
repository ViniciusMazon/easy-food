<template>
  <q-page class="row items-start justify-evenly">
    <MenuCategory :categories="categories" />
  </q-page>
</template>

<script lang="ts">
import { MenuCategoryModel } from 'components/models'
import MenuCategory from 'components/MenuCategory.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MenuPage',
  components: {
    MenuCategory
  },
  setup () {
    const categories = ref<MenuCategoryModel[]>([
      {
        id: 1,
        title: 'Pizza',
        items: [
          {
            id: 1,
            title: 'Pizza 3 sabores',
            description: 'Uma deliciosa pizza de 3 sabores, quentinha, no forno a lenha',
            price: 'R$ 35,00',
            categoryId: 1,
            link: 'teste',
            image: 'https://cdn.quasar.dev/img/chicken-salad.jpg',
            isAvailable: false
          },
          {
            id: 2,
            title: 'Pizza 3 sabores',
            description: 'Uma deliciosa pizza de 3 sabores, quentinha, no forno a lenha',
            price: 'R$ 35,00',
            categoryId: 1,
            link: 'teste',
            image: 'https://cdn.quasar.dev/img/chicken-salad.jpg',
            isAvailable: false
          },
          {
            id: 3,
            title: 'Pizza 3 sabores',
            description: 'Uma deliciosa pizza de 3 sabores, quentinha, no forno a lenha',
            price: 'R$ 35,00',
            categoryId: 1,
            link: 'teste',
            image: 'https://cdn.quasar.dev/img/chicken-salad.jpg',
            isAvailable: false
          },
          {
            id: 4,
            title: 'Pizza 3 sabores',
            description: 'Uma deliciosa pizza de 3 sabores, quentinha, no forno a lenha',
            price: 'R$ 35,00',
            categoryId: 1,
            link: 'teste',
            image: 'https://cdn.quasar.dev/img/chicken-salad.jpg',
            isAvailable: false
          }
        ]
      },
      {
        id: 2,
        title: 'Bebidas',
        items: []
      }
    ])

    return { categories }
  }
})
</script>
