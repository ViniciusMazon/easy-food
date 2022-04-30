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
        <div>Fechar restaurante</div>
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
        >
          <img
            src="../assets/logo.png"
            class="full-width"
          />
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
