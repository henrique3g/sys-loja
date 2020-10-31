<template>
  <v-container>
    <h1 class="mb-4">Produtos</h1>
    <v-btn color="primary" to="/products/new">Novo</v-btn>
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
import { DataTableHeader } from 'vuetify'
import { Product } from '@/models/Product'
import { findAllProducts } from '@/services/ProductService'
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
          value: 'id',
          width: 50
        },
        {
          text: 'Ref',
          value: 'reference',
          width: 90
        },
        {
          text: 'Descrição',
          value: 'description',
          width: 300
        },
        {
          text: 'Preço',
          value: 'price',
          width: 100
        },
        {
          text: 'Estoque',
          value: 'stock',
          width: 100
        },
        {
          text: 'Ações',
          value: 'actions',
          width: 150
        }
      ]
    }
  },
  mounted () {
    this.getAllProducts()
  },
  methods: {
    async getAllProducts () {
      this.products = await findAllProducts()
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
