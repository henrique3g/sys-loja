<template>
  <v-container fluid>
    <h1>Venda</h1>
    <v-form>
      <v-row class="mx-1" align="center">
        <v-autocomplete
          :items="clientes"
          item-text="name"
          v-model="selectedClient"
          auto-select-first
          clearable
          class="mr-2"
          label="Cliente"
        />
      </v-row>
      <v-divider/>
      <h3>Produtos</h3>
      <v-row>
        <v-autocomplete
          ref="input_produto"
          label="Produto"
          :items="produtos"
          item-text="description"
          return-object
          v-model="selectedProduct"
          @select="select"
        />
        <v-text-field ref="quantidad" v-model="amount" type="number" label="Quantidade" />
        <v-text-field type="number" label="Preço" />

      </v-row>
        <v-btn color="primary" @click="addToCart">Adicionar</v-btn>
    </v-form>
        <v-data-table :headers="headers" :items="selectedsProducts"></v-data-table>
        <v-row justify="end">
          <v-btn color="success">Finalizar Venda (F10)</v-btn>
        </v-row>
  </v-container>
</template>

<script lang="ts">
import { ElectronService } from '@/app/services/ElectronService'
import Vue from 'vue'
import { DataTableHeader } from 'vuetify'
export default Vue.extend({
  data () {
    return ({
      clientes: [],
      produtos: [],
      selectedClient: {},
      selectedProduct: {},
      selectedsProducts: [],
      amount: null
    })
  },
  methods: {
    addToCart () {
      console.log(this.selectedProduct)
      this.selectedsProducts.push({ ...this.selectedProduct, amount: this.amount })
      this.selectedProduct = null
      setTimeout(() => {
        this.$refs.input_produto.focus()
      }, 100)
    },
    select (e) {
      console.log('select')
      console.log(e)
    }
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
          text: 'Quantidade',
          value: 'amount'
        },
        {
          text: 'Preço',
          value: 'price'
        },
        {
          text: 'Total',
          value: 'total'
        }
      ]
    }
  },
  async mounted () {
    this.clientes = await ElectronService().ipcRenderer.invoke('list-all-clientes')
    this.produtos = await ElectronService().ipcRenderer.invoke('get-all-products')
  }
})
</script>
