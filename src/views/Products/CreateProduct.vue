<template>
<v-container fluid>
    <v-row class="text-start">
      <v-col>
      <h1>Cadastro de Produto</h1>
      <v-form >
        <v-text-field
          label="Descrição"
          v-model="product.description"
        />
        <v-text-field
          label="Preço"
          type="number"
          v-model="product.price"
        />
      </v-form>
      </v-col>
    </v-row>
      <v-row justify="space-around">

        <v-btn
          @click="cadastrar"
          color="primary"
        >Cadastrar</v-btn>
        <v-btn to="/products">Cancelar</v-btn>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElectronService } from '@/app/services/ElectronService'
import { Product } from '@/app/models/Product'

@Component
export default class Home extends Vue {
  product: Partial<Product> = {
    description: '',
    price: 0,
    stock: 0
  }

  cadastrar () {
    console.log('Cadastrando')
    console.log(this.product)
    ElectronService().ipcRenderer.invoke('create-product', this.product).then(console.log)
  }
}
</script>
