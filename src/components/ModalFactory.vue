<template>
  <teleport to="body">
    <component v-if="state.isActive" :is="state.component" v-bind="state.props"/>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, defineAsyncComponent, onBeforeUnmount, onMounted } from 'vue'
import useModal from '../hooks/useModal'
const AddProductModal = defineAsyncComponent(() => import('components/AddProductModal.vue'))

export interface IModalFactoryPayload {
  isActive?: boolean;
  status?: boolean;
  component?: object;
  props?: object;
}

export default defineComponent({
  name: 'ModalFactory',
  components: {
    AddProductModal
  },
  setup () {
    const modal = useModal()
    const state = reactive<IModalFactoryPayload>({
      isActive: false,
      component: {},
      props: {}
    })

    onMounted(() => {
      modal.listen(handleModalToggle)
    })

    onBeforeUnmount(() => {
      modal.off(handleModalToggle)
    })

    function handleModalToggle (payload: IModalFactoryPayload) {
      console.log('Payload', payload.status)
      if (payload) {
        state.component = payload.component
        state.props = payload.props
      } else {
        state.component = {}
        state.props = {}
      }

      state.isActive = payload.status
    }

    return {
      state,
      handleModalToggle
    }
  }
})
</script>
