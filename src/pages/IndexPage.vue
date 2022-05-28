<template>
  <q-page class="column items-start">
    <Banner title="Pedidos" />

    <q-splitter
      v-model="splitterModel"
      class="full-width"
      style="height: 80vh; width"
    >
      <template v-slot:before>
        <div class="full-height col justify-between">
          <q-input
            outlined
            bottom-slots
            v-model="filter"
            label="Filtrar por nº do pedido ou nome"
            class="q-mx-sm"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>

            <template v-slot:append>
              <q-icon
                v-if="filter !== ''"
                name="close"
                @click="filter = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <p class="text-right q-pr-md text-grey">
            Pedidos: {{ orders.length }}
          </p>

          <OrdersList
            v-for="order in orderFilters"
            :key="order.id"
            :order="order"
            @click="() => handleSelectOrder(order)"
          />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <OrderDetails
            v-if="selectedOrder"
            :order="selectedOrder"
            @change-status="changeStatus"
          />
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { Meta, OrderModel } from 'components/models'
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { httpClient } from '../services/httpClient'
import { IStatusPayload } from '../utils/bus'
import useStatus from '../hooks/useStatus'
import Banner from 'components/Banner.vue'
import OrdersList from 'components/OrdersList.vue'
import OrderDetails from 'components/OrderDetails.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    Banner,
    OrdersList,
    OrderDetails
  },
  setup () {
    const status = useStatus()
    const $q = useQuasar()
    const meta = ref<Meta>({
      totalCount: 1200
    })
    const filter = ref<string>('')
    const orders = ref<OrderModel[]>([])

    const orderFilters = computed(() => {
      if (!filter.value) {
        return orders.value
      }

      return orders.value.filter(
        (order) =>
          String(order.id) === filter.value ||
          order.client.name === filter.value
      )
    })
    const selectedOrder = ref<OrderModel>()

    onMounted(async () => await getOrders())
    onMounted(() => status.listen(changeStatus))
    watch(orders, () => {
      const newOrders = orders.value.filter(order => order.status === 'new')
      if (newOrders.length > 0) {
        showNewOrderConfirmationModal(newOrders[0])
      }
    })

    function orderOrdersByStatus (ordersList: OrderModel[]): OrderModel[] {
      const newOrder: OrderModel[] = []
      const inProgress: OrderModel[] = []
      const delivered: OrderModel[] = []
      const canceled: OrderModel[] = []

      ordersList.forEach(order => {
        switch (order.status) {
          case 'inProgress':
            inProgress.push(order)
            break
          case 'new':
            newOrder.push(order)
            break
          case 'delivered':
            delivered.push(order)
            break
          case 'canceled':
            canceled.push(order)
            break
        }
      })

      return [
        ...newOrder,
        ...inProgress,
        ...delivered,
        ...canceled
      ]
    }

    function setFirstOrderView (firstItem: OrderModel): void {
      selectedOrder.value = firstItem
    }

    async function getOrders (): Promise<void> {
      try {
        $q.loading.show()
        const { data: response } = await httpClient.get('orders')
        if (!response.data) {
          throw new Error()
        }
        orders.value = orderOrdersByStatus(response.data.attributes.orders)
        setFirstOrderView(orders.value[0])
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro ao tentar carregar os pedidos. Tente novamente mais tarde'
        })
        console.error(error)
      } finally {
        $q.loading.hide()
      }
    }

    function handleSelectOrder (order: OrderModel): void {
      selectedOrder.value = order
    }

    function changeStatus (payload: IStatusPayload): void {
      const orderId: number = payload.id
      const status: string = payload.status
      const newOrderArray = orders.value.map((order) => {
        if (order.id === orderId) {
          order.status = status
          return order
        }
        return order
      })
      orders.value = newOrderArray
    }

    function showNewOrderConfirmationModal (newOrder: OrderModel): void {
      const notificationSound = new Audio(require('../assets/notification.mp3'))
      notificationSound.play()
      $q.notify({
        group: 'newOrders',
        progress: true,
        timeout: 10000,
        message: `Novo pedido, #${newOrder.id} de ${newOrder.client.name}`,
        color: 'white',
        textColor: 'black',
        avatar: 'https://i.pinimg.com/originals/02/c5/a8/02c5a82909a225411008d772ee6b7d62.png',
        actions: [
          { label: 'Aceitar', color: 'green', handler: () => changeStatus({ id: newOrder.id, status: 'inProgress' }) },
          { label: 'Cancelar', color: 'red', handler: () => changeStatus({ id: newOrder.id, status: 'canceled' }) }
        ]
      })
    }

    return {
      meta,
      orderFilters,
      changeStatus,
      selectedOrder,
      orders,
      handleSelectOrder,
      filter,
      splitterModel: ref(25)
    }
  }
})
</script>
