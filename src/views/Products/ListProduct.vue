<template>
  <v-container>
    <v-btn color="primary" @click="toCreateProduct">Novo</v-btn>
    <v-data-table
      :items="products"
      :headers="headers"
      disable-sort
      fixed-header
    >
    </v-data-table>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { ElectronService } from '@/app/services/ElectronService'
import { DataTableHeader } from 'vuetify'
export default Vue.extend({

  data () {
    return ({
      products: []
    })
  },
  computed: {
    headers (): DataTableHeader[] {
      return [
        {
          text: 'Nº',
          value: 'id'
        },
        {
          text: 'Desc',
          value: 'description'
        }
      ]
    }
  },
  mounted () {
    this.getAllProducts()
  },
  methods: {
    async getAllProducts () {
      const products = await ElectronService().ipcRenderer.invoke('get-all-products')
      console.log(products)
      this.products = products
    },
    toCreateProduct () {
      this.$router.push('/products/new')
    }
  }
})
</script>

<style>

</style>
