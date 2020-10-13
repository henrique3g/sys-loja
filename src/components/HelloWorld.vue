<template>
  <v-container>
    <v-row class="text-start">
      <v-col>
      <h1>Cadastro de Produto</h1>
      <v-form>
        <v-text-field
          label="Descrição"
          v-model="product.description"
        />
        <v-btn
          @click="cadastrar"
          color="primary"
        >Cadastrar</v-btn>

      </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { IpcRenderer } from 'electron'
const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

export default Vue.extend({
  name: 'HelloWorld',

  data () {
    return ({
      product: {
        description: ''
      }
    })
  },

  methods: {
    cadastrar () {
      console.log('Cadastrando')
      console.log(this.product.description)
      ipcRenderer.invoke('create-product', this.product).then(console.log)
    }
  }
})
</script>
