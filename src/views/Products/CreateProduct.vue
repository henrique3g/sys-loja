<template>
<v-container>
    <v-row class="text-start">
      <v-col>
      <h1>Cadastro de Produto</h1>
      <v-form >
        <v-text-field
          label="Descrição"
          v-model="product.description"
          tabindex="0"
          autofocus
        />
        <v-row no-gutters>
          <v-text-field
            label="Referência"
            type="text"
            v-model="product.reference"
            tabindex="1"
            class="mr-5"
          />
          <v-text-field
            label="Preço"
            type="number"
            tabindex="2"
            v-model="product.price"
          />
        </v-row>
      </v-form>
      </v-col>
    </v-row>
      <v-row justify="space-around">
        <v-btn tabindex="4" to="/products">Cancelar</v-btn>
        <v-btn tabindex="3" @click="cadastrar" color="primary">
          Cadastrar
        </v-btn>
      </v-row>
      <v-dialog v-model="successMessage" max-width="300">
        <v-card>
          <v-card-title class="justify-center">Sucesso</v-card-title>
          <v-card-text>Produto Cadastrado com sucesso</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              ref="btn-ok"
              @click="successMessage = false"
              color="primary"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Product } from '@/models/Product'
import { createProduct } from '@/services/ProductService'

@Component
export default class Home extends Vue {
  product: Partial<Product> = {
    description: '',
    price: 0,
    stock: 0,
    reference: ''
  }

  successMessage = false;

  cadastrar () {
    console.log('Cadastrando')
    console.log(this.product)
    createProduct(this.product).then(result => {
      this.successMessage = true
      setTimeout(() => {
        type BtnType = {$el: HTMLButtonElement}
        const btn = this.$refs['btn-ok'] as unknown as {$el: HTMLButtonElement}
        btn.$el.focus()
      }, 0)
      console.log(result)
      this.product.description = ''
      this.product.reference = ''
      this.product.price = 0
      this.product.stock = 0
    })
  }
}
</script>
