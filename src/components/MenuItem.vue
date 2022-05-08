<template>
  <q-card class="my-card">
    <q-img :src="image" />

    <q-card-section>
      <q-btn
        fab
        color="primary"
        :icon="isAvailableIcon"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
        @click="toggleAvailability"
      />

      <div class="col text-h6 ellipsis">
        {{ title }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-caption text-grey q-mb-md">
        {{ description }}
      </div>

      <q-input
        filled
        v-model="newPrice"
        :placeholder="price"
        :readonly="isPriceLocked"
      >
       <template v-slot:append>
         <q-icon v-if="isPriceLocked" name="lock" color="text-grey" @click="toggleLockPrice" />
         <q-icon v-else name="lock_open" color="text-grey" @click="toggleLockPrice" />
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-actions class="row justify-end">
      <q-btn flat color="grey" @click="handleOpenEditProductModal">
        Editar
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent, ref, watch } from 'vue'
import useModal from '../hooks/useModal'
import { httpClient } from '../services/httpClient'

export default defineComponent({
  name: 'MenuItem',
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    categoryId: {
      typeId: Number,
      default: 0
    },
    link: {
      type: String,
      default: '#'
    },
    image: {
      type: String,
      default: ''
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const $q = useQuasar()
    const modal = useModal()
    const isPriceLocked = ref<boolean>(true)
    const isAvailableIcon = ref<string>(props.isAvailable ? 'pause' : 'play_arrow')
    const newPrice = ref<string>('')

    watch(newPrice, () => isPriceValid())

    function toggleAvailability () {
      isAvailableIcon.value = isAvailableIcon.value === 'pause' ? 'play_arrow' : 'pause'
    }

    function toggleLockPrice () {
      isPriceLocked.value = !isPriceLocked.value
    }

    function isPriceValid () {
      console.log('Ocorrencia: ', newPrice.value)
      const regExp = /^[1-9]\d{0,2}(\.\d{3})*,\d{2}$/
      if (regExp.test(newPrice.value)) {
        editPrice()
      }
    }

    async function editPrice () {
      try {
        $q.loading.show()
        await httpClient.patch(`products/${props.id}`)
        $q.notify({
          type: 'positive',
          message: 'Preço editado com sucesso'
        })
        newPrice.value = ''
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao editar o preço do produto. Tente novamente mais tarde.'
        })
        console.error(error)
      } finally {
        $q.loading.hide()
      }
    }

    function handleOpenEditProductModal () {
      modal.open({
        component: 'ProductModal',
        props: {
          productId: props.id
        }
      })
    }

    return {
      isPriceLocked,
      isAvailableIcon,
      toggleLockPrice,
      toggleAvailability,
      newPrice,
      handleOpenEditProductModal,
      isPriceValid
    }
  }
})
</script>
