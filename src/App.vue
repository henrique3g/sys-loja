<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <h1>Home</h1>
    </v-app-bar>
    <v-navigation-drawer width="200" app permanent>
      <v-list>
        <v-list-item to="/">
          <v-icon color="primary" class="mr-1">mdi-home</v-icon>
          Home
        </v-list-item>
        <v-list-item to="/products">
          <v-icon color="primary" class="mr-1">mdi-tshirt-crew</v-icon>
          Produtos
        </v-list-item>
        <v-list-item to="/clientes">
          <v-icon color="primary" class="mr-1">mdi-account</v-icon>
          Clientes
        </v-list-item>
        <v-list-item to="/vendas/do">
          <v-icon color="primary" class="mr-1">mdi-cart</v-icon>
          Fazer Venda
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
    toProducts () {
      this.$router.push('products')
    }
  },
  data () {
    return ({
    })
  }
})
</script>
