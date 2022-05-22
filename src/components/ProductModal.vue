<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="text-gray-1" style="width: 900px">
      <q-card-section>
        <div v-if="isEditing" class="text-h6">Editar produto</div>
        <div v-else class="text-h6">Novo produto</div>
      </q-card-section>

      <q-stepper v-model="step" vertical color="primary" animated>
        <q-step
          :name="1"
          title="Nome e descrição do produto"
          icon="settings"
          :done="step > 1"
        >
          <q-input outlined v-model="product.title" label="Nome do produto" />
          <q-input
            outlined
            v-model="product.description"
            label="Descrição do produto"
          />
          <q-stepper-navigation>
            <q-btn @click="step = 2" color="primary" label="Próximo" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="2" title="Preço" icon="credit_card" :done="step > 2">
          <q-input outlined v-model="product.price" label="Preço em Reais" />
          <q-stepper-navigation>
            <q-btn @click="step = 3" color="primary" label="Próximo" />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Anterior"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="3" title="Categoria" icon="list" :done="step > 3">
          <q-select
            outlined
            v-model="selectedCategoryTitle"
            :options="categoriesTitle"
            label="Selecione uma categoria"
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                icon="backspace"
                @click="clearSelectedCategory"
              />
            </template>
          </q-select>
          <q-input
            outlined
            v-model="newCategoryTitle"
            label="Criar nova categoria"
            v-if="isCreateCategoryAvailable"
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                icon="add_circle"
                @click="createCategory"
              />
            </template>
          </q-input>
          <q-stepper-navigation>
            <q-btn @click="step = 4" color="primary" label="Próximo" />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Anterior"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="4" title="Fotos" icon="image" :done="step > 4">
          <q-uploader
            multiple
            batch
            style="max-width: 300px"
            accept=".jpg, image/*"
            max-files="3"
            @rejected="onRejected"
          />
          <q-stepper-navigation>
            <q-btn @click="handleSubmit" color="primary" label="Salvar" />
            <q-btn
              flat
              @click="step = 3"
              color="primary"
              label="Anterior"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>

      <q-card-actions horizontal align="right">
        <q-btn flat @click="closeModal" color="primary" label="Cancelar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { MenuItemModel, MenuCategoryModel } from 'components/models'
import useModal from '../hooks/useModal'
import { useQuasar } from 'quasar'
import { httpClient } from '../services/httpClient'

export default defineComponent({
  name: 'ProductModal',
  props: {
    productId: {
      type: Number,
      required: false
    }
  },
  setup (props) {
    const modal = useModal()
    const $q = useQuasar()
    const product = ref<MenuItemModel>({
      title: '',
      description: '',
      price: '',
      image: '',
      category: {
        id: 0,
        title: ''
      },
      isAvailable: true
    })

    const categories = ref<MenuCategoryModel[]>([])

    const selectedCategoryTitle = ref<string>('')
    const newCategoryTitle = ref<string>('')

    const categoriesTitle = computed(() =>
      categories.value.map((category) => category.title)
    )
    const isCreateCategoryAvailable = computed(
      () => selectedCategoryTitle.value === ''
    )
    const isEditing = computed(() => !!props.productId)

    onMounted(() => {
      getCategoriesList()
      isEditing.value && getProduct()
    })

    async function getCategoriesList () {
      try {
        $q.loading.show()
        const { data: response, status } = await httpClient.get('categories')
        if (status !== 200) {
          throw new Error()
        }
        categories.value = response.data.attributes.categories
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao carregar o produto. Tente novamente mais tarde.'
        })
        console.error(error)
      } finally {
        $q.loading.hide()
      }
    }

    async function getProduct () {
      try {
        $q.loading.show()
        const { data: response, status } = await httpClient.get(
          `products/${props.productId}`
        )
        if (status !== 200) {
          throw new Error()
        }
        product.value = response.data.attributes.product
        selectedCategoryTitle.value = response.data.attributes.product.category.title
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro. Tente novamente mais tarde.'
        })
        console.error(error)
      } finally {
        $q.loading.hide()
      }
    }

    function getCategoryObjectByTitle () {
      if (newCategoryTitle.value !== '') {
        return {
          id: 0,
          title: newCategoryTitle.value
        }
      }

      const category = categories.value.filter(category => category.title === selectedCategoryTitle.value)[0]
      return category
    }

    async function handleCreateProduct () {
      try {
        $q.loading.show()
        const categoryObject = getCategoryObjectByTitle()

        const productPayload = {
          title: product.value.title,
          description: product.value.description,
          price: product.value.price,
          image: product.value.image,
          category: categoryObject,
          isAvailable: true
        }
        await httpClient.post('products', productPayload)
        closeModal()
        $q.notify({
          type: 'positive',
          message: 'Produto criado com sucesso'
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao criar o produto. Tente novamente mais tarde.'
        })
        console.error(error)
      } finally {
        $q.loading.hide()
      }
    }

    async function handleEditProduct () {
      try {
        $q.loading.show()

        const categoryObject = getCategoryObjectByTitle()

        const productPayload = {
          title: product.value.title,
          description: product.value.description,
          price: product.value.price,
          image: product.value.image,
          category: categoryObject,
          isAvailable: true
        }
        const { data: response } = await httpClient.put(`products/${props.productId}`, productPayload)
        closeModal()
        $q.notify({
          type: 'positive',
          message: 'Produto editado com sucesso'
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao editar o produto. Tente novamente mais tarde'
        })
        console.error(error)
      } finally {
        $q.loading.hide()
      }
    }

    function handleSubmit () {
      isEditing.value ? handleEditProduct() : handleCreateProduct()
    }

    function clearSelectedCategory () {
      selectedCategoryTitle.value = ''
    }

    function createCategory () {
      console.log(newCategoryTitle)
    }

    function closeModal () {
      modal.close()
    }

    function onRejected (rejectedEntries: []) {
      $q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    }

    return {
      step: ref(1),
      persistent: ref(true),
      closeModal,
      product,
      categoriesTitle,
      selectedCategoryTitle,
      onRejected,
      newCategoryTitle,
      createCategory,
      isCreateCategoryAvailable,
      clearSelectedCategory,
      isEditing,
      handleSubmit
    }
  }
})
</script>
