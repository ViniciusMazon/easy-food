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
        v-model="text"
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
import { defineComponent, ref } from 'vue'
import useModal from '../hooks/useModal'

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
    const modal = useModal()
    const isPriceLocked = ref<boolean>(true)
    const isAvailableIcon = ref<string>(props.isAvailable ? 'pause' : 'play_arrow')

    function toggleAvailability () {
      isAvailableIcon.value = isAvailableIcon.value === 'pause' ? 'play_arrow' : 'pause'
    }

    function toggleLockPrice () {
      isPriceLocked.value = !isPriceLocked.value
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
      handleOpenEditProductModal
    }
  }
})
</script>
