<template>
   <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Persistent</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click/Tap on the backdrop.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup @click="closeModal"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useModal from '../hooks/useModal'

export default defineComponent({
  name: 'AddProductModal',
  setup () {
    const modal = useModal()

    function closeModal () {
      modal.close()
    }
    return {
      persistent: ref(true),
      closeModal
    }
  }
})
</script>
