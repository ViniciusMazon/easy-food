<template>
  <q-item
    clickable
    :to="link"
    :disable="!isAvailable"
  >
    <q-tooltip v-if="!isAvailable">
      Disponível em breve
    </q-tooltip>

    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label color="blue-grey-10">{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    isAvailable: {
      type: Boolean,
      default: false
    }
  }
})
</script>
