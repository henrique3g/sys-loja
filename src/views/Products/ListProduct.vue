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
        <v-row no-gutters class="flex-nowrap">
          <v-btn small color="success" @click="updateProduct(item.id)" >
            <v-icon color="white">mdi-pencil-circle-outline</v-icon>
          </v-btn>
          <v-btn small class="ml-1" color="red" @click="openConfirmation(item.id)" >
            <v-icon color="white">mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>

    <v-dialog width="300" v-model="confirmationDialog.show">
      <v-card>
        <v-card-title>Confirmação</v-card-title>
        <v-card-text>Desejá realmente excluir esse produto?</v-card-text>
        <v-card-actions class="justify-space-around">
          <v-btn color="primary" @click="confirmationDialog.show = false">Não</v-btn>
          <v-btn color="error" @click="deleteProduct">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="300" v-model="errorDialog.show">
      <v-card class="text-center">
        <v-card-title class="justify-center">Ops!</v-card-title>
        <v-card-text>
          Este produto não pode ser excluido
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="errorDialog.show = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DataTableHeader } from 'vuetify'
import { Product } from '@/models/Product'
import { deleteProduct, findAllProducts } from '@/services/ProductService'
export default Vue.extend({

  data () {
    return ({
      products: [] as Product[],
      confirmationDialog: {
        show: false,
        productId: 0
      },
      errorDialog: {
        show: false,
        message: '',
        title: 'Error'
      }
    })
  },
  mounted () {
    this.getAllProducts()
  },
  methods: {
    async getAllProducts () {
      this.products = await findAllProducts()
    },

    async deleteProduct () {
      const id = this.confirmationDialog.productId
      this.confirmationDialog.show = false
      console.log('delete: ' + id)
      try {
        await deleteProduct(id)
        await this.getAllProducts()
      } catch (error) {
        console.log(error)
        this.errorDialog.message = error
        this.errorDialog.show = true
      }
    },

    async openConfirmation (productId: number) {
      this.confirmationDialog.show = true
      this.confirmationDialog.productId = productId
    },

    async updateProduct (id: number) {
      console.log('open update: ' + id)
    }
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
          width: 30
        }
      ]
    }
  }
})
</script>

<style>

</style>
