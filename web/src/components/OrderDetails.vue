<template>
  <div>
    <q-card class="q-px-md q-py-md">
      <div class="row justify-between q-mb-lg">
        <strong class="text-h4">#{{ order.id }}</strong>
        <span class="text-h5">{{ order.client.name }}</span>
      </div>

      <div class="row justify-between">
        <p class="text-grey text-subtitle1">
          {{ order.address.street }}, nº {{ order.address.number }},
          {{ order.address.district }}. {{ order.address.city }} /
          {{ order.address.uf }}
        </p>
        <div v-if="isInProgress">
          <q-btn
            class="q-px-xl"
            color="grey"
            text-color="white"
            label="Imprimir"
            @click="handleDeliveryOrder"
          />
        </div>

        <div v-if="isNewOrder">
          <q-btn
            class="q-px-xl q-mr-sm"
            color="green"
            text-color="white"
            label="Aceitar"
            @click="handleAcceptOrder"
          />
          <q-btn
            class="q-px-xl"
            color="red"
            text-color="white"
            label="Recusar"
            @click="handleCancelOrder"
          />
        </div>
      </div>
    </q-card>

    <q-card class="q-my-lg q-px-md q-py-md">
      <q-table
        title="Pedido"
        :rows="order.cart"
        :columns="columns"
        row-key="order.cart.id"
        virtual-scroll
        hide-bottom
      />
    </q-card>

    <q-card class="q-my-lg row justify-between q-px-md q-py-md">
      <div>
        <strong class="text">Observações:</strong>
        <p>{{ order.observations }}</p>
      </div>

      <div>
        <div class="row justify-between">
          <strong class="q-pr-sm text-grey">Subtotal:</strong>
          <span>{{ Number(subtotal).toFixed(2) }}</span>
        </div>
        <div class="row justify-between">
          <strong class="q-pr-sm text-grey">Taxa de entrega:</strong>
          <span>{{ order.deliveryTax.toFixed(2) }}</span>
        </div>
        <div class="row justify-between">
          <strong class="q-pr-sm text-grey">Desconto:</strong>
          <span>{{ order.discount.toFixed(2) }}</span>
        </div>
        <div class="row justify-between">
          <strong class="q-pr-sm text-grey">Total:</strong>
          <span>{{ Number(total).toFixed(2) }}</span>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { ItemModel } from 'components/models'
import useStatus from '../hooks/useStatus'

export default defineComponent({
  name: 'OrderDetails',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const status = useStatus()
    const columns = [
      {
        name: 'qtd',
        align: 'left',
        required: true,
        label: 'QTD',
        field: 'qtd'
      },
      {
        name: 'product',
        align: 'left',
        required: true,
        label: 'Produto',
        field: 'title'
      },
      {
        name: 'total',
        align: 'left',
        required: true,
        label: 'Total',
        field: (row: ItemModel) => Number(row.priceUnity) * Number(row.qtd)
      }
    ]
    const subtotal = ref<number>(
      props.order.cart.reduce((acc: number, cur: ItemModel) => {
        return Number(cur.priceUnity) * Number(cur.qtd) + acc
      }, 0)
    )

    const total = computed(
      (): number =>
        subtotal.value + props.order.deliveryTax - props.order.discount
    )

    const isNewOrder = computed(() => props.order.status === 'new')
    const isInProgress = computed(() => props.order.status === 'inProgress')

    function handleAcceptOrder () {
      const payload = {
        id: props.order.id,
        status: 'inProgress'
      }
      status.change(payload)
    }

    function handleDeliveryOrder () {
      const payload = {
        id: props.order.id,
        status: 'delivered'
      }
      status.change(payload)
    }

    function handleCancelOrder () {
      const payload = {
        id: props.order.id,
        status: 'canceled'
      }
      status.change(payload)
    }

    return {
      columns,
      subtotal,
      total,
      isNewOrder,
      isInProgress,
      handleAcceptOrder,
      handleDeliveryOrder,
      handleCancelOrder
    }
  }
})
</script>
