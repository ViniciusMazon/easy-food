<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-blue-grey-10">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space ></q-space>
        <q-btn flat size="sm" @click="toggleIsOpen">
          <q-icon name="circle" size="xs" :color="isOpenStatusColor" class="q-mr-sm"></q-icon>
          {{ isOpenText }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
          class="row justify-center q-my-md"
        >
          <img
            src="../assets/logo.png"
            width="180"
          />
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-btn-dropdown flat menu-anchor="top start" padding="lg" color="grey" label="Nome do estabeleciomento aqui">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>
                <q-icon name="logout" color="grey" class="q-mr-sm"/>
                Sair
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </q-btn-dropdown>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Pedidos',
    caption: 'Seus pedidos em andamento',
    icon: 'notifications',
    link: '/',
    isAvailable: true
  },
  {
    title: 'Cardápio',
    caption: 'Seus produtos',
    icon: 'book',
    link: '/menu',
    isAvailable: true
  },
  {
    title: 'Chat',
    caption: 'Converse com seus clientes',
    icon: 'chat',
    link: '/chat',
    isAvailable: false
  },
  {
    title: 'Feedbacks',
    caption: 'Avaliações e feedbacks de clientes',
    icon: 'favorite',
    link: '/feedbacks',
    isAvailable: false
  },
  {
    title: 'Dashboard',
    caption: 'Acompanhe seus resultados',
    icon: 'dashboard',
    link: '/dashboard',
    isAvailable: false
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const isOpen = ref(false)

    const isOpenText = computed((): string => isOpen.value ? 'Aberto' : 'Fechado')
    const isOpenStatusColor = computed((): string => isOpen.value ? 'green' : 'primary')

    function toggleIsOpen () {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      isOpenText,
      isOpenStatusColor,
      toggleIsOpen,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
