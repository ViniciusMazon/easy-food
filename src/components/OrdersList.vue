<template>
  <div class="cursor-pointer container row justify-between">
    <div class="q-px-sm q-py-sm">
      <div class="row">
        <strong class="text-h6 q-pr-md">#{{ order.id }}</strong>
        <p class="text-subtitle1">{{ order.client.name }}</p>
      </div>

      <div v-if="isCanceled">
        <p class="text-red text-bold">{{ timeWasCanceled }}</p>
      </div>

      <div v-else class="row">
        <p class="text-bold text-indigo">{{ timeWasAccept }}</p>
        <q-icon class="q-mx-sm" name="play_arrow" color="grey"/>
        <p class="text-bold text-green">{{ timeWasDelivered }}</p>
      </div>
    </div>
    <div
      class="status"
      :class="statusColor"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  name: 'OrdersList',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const timeWasAccept = ref<string>('--:--')
    const timeWasDelivered = ref<string>('--:--')
    const timeWasFinished = ref<string>('--:--')
    const timeWasCanceled = ref<string>('--:--')
    const statusColor = ref<string>('bg-grey')
    const isCanceled = computed(() => props.order.status === 'canceled')

    getStatus(props.order.status)

    watch(
      () => props.order.status,
      (status) => {
        getStatus(status)
      })

    function getCurrentTime () {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      return `${hours}:${minutes}`
    }

    function getStatus (status: string) {
      switch (status) {
        case 'new':
          statusColor.value = 'bg-grey'
          break
        case 'inProgress':
          timeWasAccept.value = getCurrentTime()
          statusColor.value = 'bg-indigo'
          break
        case 'delivered':
          timeWasDelivered.value = getCurrentTime()
          statusColor.value = 'bg-green'
          break
        case 'canceled':
          timeWasCanceled.value = getCurrentTime()
          statusColor.value = 'bg-red'
          break
        default:
          statusColor.value = 'bg-grey'
          break
      }
    }

    return {
      statusColor,
      isCanceled,
      timeWasAccept,
      timeWasDelivered,
      timeWasFinished,
      timeWasCanceled
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #ddd;
}

.status {
  min-height: 100%;
  width: 20px;
}
</style>
