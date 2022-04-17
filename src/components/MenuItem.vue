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
        :readonly="{isPriceLoked}"
      >
       <template v-slot:append>
         <q-icon v-if="isPriceLocked" name="lock" color="text-grey" @click="toggleLockPrice" />
         <q-icon v-else name="lock_open" color="text-grey" @click="toggleLockPrice" />
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat color="primary">
        Editar
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
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
    const isPriceLocked = ref<boolean>(true)
    const isAvailableIcon = ref<string>(props.isAvailable ? 'pause' : 'play_arrow')

    function toggleAvailability () {
      isAvailableIcon.value = isAvailableIcon.value === 'pause' ? 'play_arrow' : 'pause'
    }

    function toggleLockPrice () {
      isPriceLocked.value = !isPriceLocked.value
    }

    return {
      isPriceLocked,
      isAvailableIcon,
      toggleLockPrice,
      toggleAvailability
    }
  }
})
</script>
