<template>
  <v-container fluid>
    <h1>Venda</h1>
    <v-form v-model="formValid" ref="form">
      <v-container>

        <v-row align="center">
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
            class="mr-2"
            ref="input_produto"
            label="Produto"
            :items="produtos"
            item-text="description"
            return-object
            v-model="selectedProduct"
            :rules="productRules"
          />
          <v-text-field
            :rules="quantityRules"
            v-model="amount"
            type="number"
            label="Quantidade"
          />
        </v-row>
        <v-row>
          <v-text-field
            class="mx-2"
            suffix="R$"
            disabled
            type="number"
            :value="selectedProduct.price"
            label="Preço Unit."
          />
          <v-text-field
            class="mr-2"
            suffix="R$"
            disabled
            type="number"
            :value="totalProduct"
            label="Total"
          />

          <v-btn class="align-self-center" color="primary" @click="addToCart" :disabled="!formValid">Adicionar</v-btn>
        </v-row>
      </v-container>
    </v-form>
    <v-data-table
      disable-sort
      hide-default-footer
      disable-pagination
      :headers="headers"
      :items="selectedsProducts"
    />
    <v-divider/>
    <v-container fluid>
      <v-row justify="end" class="mr-4">
        <h1>Total: {{totalVenda}}</h1>
      </v-row>
      <v-row justify="end">
        <v-btn color="success">Finalizar Venda (F10)</v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Product } from '@/app/models/Product'
import { ElectronService } from '@/app/services/ElectronService'
import Vue from 'vue'
import { DataTableHeader } from 'vuetify'

export default Vue.extend({
  data () {
    return ({
      clientes: [],
      produtos: [],
      selectedClient: {},
      selectedProduct: {} as Partial<Product>,
      selectedsProducts: [],
      amount: null,
      formValid: false
    })
  },
  methods: {
    addToCart () {
      // console.log(this.selectedProduct)
      this.selectedsProducts.push({
        ...this.selectedProduct,
        amount: this.amount,
        total: this.amount * this.selectedProduct.price
      })
      this.amount = null
      this.$refs.form.resetValidation()
      this.$refs.input_produto.focus()
    }
  },
  computed: {
    quantityRules () {
      const rules = []

      const minValue = (v) => v > 0 || 'Quantidade não pode ser negativa'
      rules.push(minValue)

      return rules
    },
    productRules () {
      const rules = []

      const required = (v) => !!v.description || 'Escolha um produto'
      rules.push(required)
      return rules
    },
    totalVenda () {
      const products: [any] = this.selectedsProducts
      if (products.length < 1) return 0
      return Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(products.reduce((prev, current) => current.total + prev, 0))
    },
    totalProduct () {
      const result = this.selectedProduct.price * this.amount
      return result || ''
    },
    headers (): DataTableHeader[] {
      return [
        {
          text: 'Cod.',
          value: 'id',
          width: 15
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
