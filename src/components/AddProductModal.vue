<template>
   <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
     <q-card class="text-gray-1" style="width: 900px">
      <q-card-section>
        <div class="text-h6">Novo produto</div>
      </q-card-section>

      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        >
        <q-step
          :name="1"
          title="Nome e descrição do produto"
          icon="settings"
          :done="step > 1"
        >
          <q-input outlined v-model="product.title" label="Nome do produto" />
          <q-input outlined v-model="product.description" label="Descrição do produto" />
          <q-stepper-navigation>
            <q-btn @click="step = 2" color="primary" label="Próximo" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Preço"
          icon="credit_card"
          :done="step > 2"
        >
          <q-input outlined v-model="product.price" label="Preço em Reais" />
          <q-stepper-navigation>
            <q-btn @click="step = 3" color="primary" label="Próximo" />
            <q-btn flat @click="step = 1" color="primary" label="Anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Categoria"
          icon="list"
          :done="step > 3"
          >
          <q-select outlined v-model="selectedCategoryTitle" :options="categoriesTitle" label="Selecione uma categoria">
            <template v-slot:after>
              <q-btn round dense flat icon="backspace" @click="clearSelectedCategory"/>
            </template>
          </q-select>
          <q-input outlined v-model="newCategoryTitle" label="Criar nova categoria" v-if="isCreateCategoryAvailable">
            <template v-slot:after>
              <q-btn round dense flat icon="add_circle" @click="createCategory"/>
            </template>
          </q-input>
          <q-stepper-navigation>
            <q-btn @click="step = 4" color="primary" label="Próximo" />
            <q-btn flat @click="step = 2" color="primary" label="Anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="4"
          title="Fotos"
          icon="image"
          :done="step > 4"
          >
           <q-uploader
             multiple
             batch
             style="max-width: 300px"
             accept=".jpg, image/*"
             max-files="3"
             @rejected="onRejected"
          />
          <q-stepper-navigation>
            <q-btn @click="closeModal" color="primary" label="Finalizar" />
            <q-btn flat @click="step = 3" color="primary" label="Anterior" class="q-ml-sm" />
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
import { defineComponent, ref, computed } from 'vue'
import { MenuItemModel, MenuCategoryModel } from 'components/models'
import useModal from '../hooks/useModal'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'AddProductModal',
  setup () {
    const modal = useModal()
    const $q = useQuasar()
    const product = ref<MenuItemModel>({
      title: '',
      description: '',
      price: '',
      image: '',
      categoryId: 0,
      isAvailable: true
    })

    const categories = ref<MenuCategoryModel[]>([
      {
        id: 1,
        title: 'Pizza'
      },
      {
        id: 2,
        title: 'Bebidas'
      }
    ])

    const selectedCategoryTitle = ref<string>('')
    const newCategoryTitle = ref<string>('')

    const categoriesTitle = computed(() => categories.value.map(category => category.title))
    const isCreateCategoryAvailable = computed(() => selectedCategoryTitle.value === '')

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
      clearSelectedCategory
    }
  }
})
</script>
