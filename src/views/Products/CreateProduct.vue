<template>
<v-container>
    <v-row class="text-start">
      <v-col>
      <h1>Cadastro de Produto</h1>
      <v-form v-model="formValid">
        <v-text-field
          label="Descrição"
          v-model="description"
          tabindex="0"
          autofocus
          counter="100"
          :rules="descriptionRules"
        />
        <v-row no-gutters>
          <v-text-field
            label="Referência"
            type="text"
            v-model="reference"
            tabindex="1"
            class="mr-5"
          />
          <v-text-field
            label="Preço"
            type="number"
            tabindex="2"
            :rules="priceRules"
            v-model="price"
          />
        </v-row>
      </v-form>
      </v-col>
    </v-row>
      <v-row justify="space-around">
        <v-btn tabindex="4" to="/products">Cancelar</v-btn>
        <v-btn :disabled="!formValid" tabindex="3" @click="cadastrar" color="primary">
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
import { createProduct } from '@/services/ProductService'

@Component
export default class Home extends Vue {
  formValid = false
  successMessage = false;

  description = ''
  reference = ''
  stock = 0;
  price: number | null = null

  priceRules = [(v: number) => v > 0 || 'Preço não pode ser menor que 0']
  descriptionRules = [(desc: string) => desc.length > 0 || 'Descrição é obrigatório']

  cadastrar () {
    createProduct({
      description: this.description,
      reference: this.reference,
      price: this.price || 0,
      stock: this.stock
    }).then(result => {
      this.successMessage = true
      setTimeout(() => {
        type BtnType = {$el: HTMLButtonElement}
        const btn = this.$refs['btn-ok'] as unknown as {$el: HTMLButtonElement}
        btn.$el.focus()
      }, 0)
      console.log(result)
      this.description = ''
      this.reference = ''
      this.price = null
      this.stock = 0
    })
  }
}
</script>
