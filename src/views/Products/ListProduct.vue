<template>
  <v-container>
    <h1 class="mb-4">Produtos</h1>
    <v-btn color="primary" @click="toCreateProduct">Novo</v-btn>
    <v-data-table
      :items="products"
      :headers="headers"
      disable-sort
      fixed-header
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="mr-2" color="red" @click="deleteProduct(item.id)" >
          <v-icon color="white">mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-btn color="success" @click="updateProduct(item.id)" >
          <v-icon color="white">mdi-pencil-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { ElectronService } from '@/app/services/ElectronService'
import { DataTableHeader } from 'vuetify'
import { Product } from '@/app/models/Product'
export default Vue.extend({

  data () {
    return ({
      products: [] as Product[]
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
          text: 'Descrição',
          value: 'description'
        },
        {
          text: 'Preço',
          value: 'price'
        },
        {
          text: 'Estoque',
          value: 'stock'
        },
        {
          text: 'Ações',
          value: 'actions',
          width: 200
        }
      ]
    }
  },
  mounted () {
    this.getAllProducts()
  },
  methods: {
    async getAllProducts () {
      this.products = await ElectronService().ipcRenderer.invoke('get-all-products') as Product[]
    },
    toCreateProduct () {
      this.$router.push('/products/new')
    },
    async deleteProduct (id: number) {
      console.log('delete: ' + id)
    },

    async updateProduct (id: number) {
      console.log('open update: ' + id)
    }
  }
})
</script>

<style>

</style>
