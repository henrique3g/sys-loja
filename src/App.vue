<template>
  <v-app>
    <v-navigation-drawer class="elevation-12 d-print-none" :width="drawerExpanded? 200 : 50"  color="primary" dark app permanent>
      <v-list>
        <v-list-item @click="expandDrawer">
          <v-icon  color="white" class="mr-3">mdi-arrow-expand-right</v-icon>
          <div class="text-body-2">Minimize</div>
        </v-list-item>
        <v-list-item to="/" >
          <v-icon color="white" class="mr-3">mdi-home-outline</v-icon>
          Home
        </v-list-item>
        <v-list-item to="/products">
          <v-icon color="white" class="mr-3">mdi-tshirt-crew-outline</v-icon>
          Produtos
        </v-list-item>
        <v-list-item to="/clientes">
          <v-icon color="white" class="mr-3">mdi-account-outline</v-icon>
          Clientes
        </v-list-item>
        <v-list-item class="text-no-wrap" to="/vendas/do">
          <v-icon color="white" class="mr-3">mdi-cart-plus</v-icon>
          Fazer Venda
        </v-list-item>
        <v-list-item class="text-no-wrap" exact to="/vendas">
          <v-icon color="white" class="mr-3">mdi-cart-outline</v-icon>
          Vendas do dia
        </v-list-item>
        <v-list-item class="text-no-wrap" to="/contas">
          <v-icon color="white" class="mr-3">mdi-account-cash-outline</v-icon>
            Recebimentos
        </v-list-item>
        <v-list-item to="*" class="settings-position">
            <v-icon color="white" class="mr-3">mdi-cog-outline</v-icon>
            Configurações
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  components: {
    // HelloWorld
  },
  methods: {
    expandDrawer () {
      this.drawerExpanded = !this.drawerExpanded
    }
  },
  data () {
    return ({
      drawerExpanded: false
    })
  }
})
</script>

<style lang="scss" scoped>
  .settings-position {
    bottom: 0;
    position: absolute;
    margin-bottom: 10px;
  }
</style>
