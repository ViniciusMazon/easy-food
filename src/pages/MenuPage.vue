<template>
  <q-page class="column items-start">
    <ModalFactory />
    <Banner title="Cardápio" btnTitle="Adicionar produto" :action="addProduct"/>
    <MenuCategory :categories="categories" />
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { MenuCategoryModel } from 'components/models'
import MenuCategory from 'components/MenuCategory.vue'
import Banner from 'components/Banner.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { httpClient } from '../services/httpClient'
import ModalFactory from 'components/ModalFactory.vue'
import useModal from '../hooks/useModal'

export default defineComponent({
  name: 'MenuPage',
  components: {
    Banner,
    MenuCategory,
    ModalFactory
  },
  setup () {
    const $q = useQuasar()
    const categories = ref<MenuCategoryModel[]>([])
    const modal = useModal()

    onMounted(() => getProducts())

    async function getProducts () {
      try {
        $q.loading.show()
        const { data: response } = await httpClient.get('products')
        if (!response.data) throw new Error('Não foi possível carregar os produtos. Tente novamente mais tarde.')
        categories.value = response.data
      } catch (error) {
        console.error(error)
      } finally {
        $q.loading.hide()
      }
    }

    function addProduct () {
      modal.open({
        component: 'AddProductModal'
      })
    }

    return {
      categories,
      addProduct
    }
  }
})
</script>
