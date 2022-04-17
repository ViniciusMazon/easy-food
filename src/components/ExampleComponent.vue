<template>
  <div>
    <p>{{ title }}</p>
   <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref
} from 'vue'
import { Meta } from './models'

function useClickCount () {
  const clickCount = ref(0)
  function increment () {
    clickCount.value += 1
    return clickCount.value
  }

  return { clickCount, increment }
}

export default defineComponent({
  name: 'ExampleComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup () {
    return { ...useClickCount() }
  }
})
</script>
