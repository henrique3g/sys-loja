<template>
<v-container>
  <h1>Cadastro de Clientes</h1>
  <v-form>
    <v-text-field label="Nome" v-model="cliente.name"/>
    <v-text-field label="Apelido" v-model="cliente.shortName" />
    <v-text-field label="CPF" v-model="cliente.cpf" />
    <v-text-field label="Endereço" v-model="cliente.address" />
    <v-text-field label="Telefone" v-model="cliente.phone" />

    <v-row justify="space-around">
      <v-btn color="primary" @click="cadastrar">Salvar</v-btn>
      <v-btn to="/clientes">Cancelar</v-btn>
    </v-row>
  </v-form>
  <v-dialog
    v-model="showMessage"
    max-width="300"

  >
    <v-card height="170">
      <v-card-title>Sucesso</v-card-title>
      <v-card-text>Cliente Cadastrado com sucesso</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="showMessage = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script lang="ts">
import { Cliente } from '@/app/models/Cliente'
import { ElectronService } from '@/app/services/ElectronService'
import Vue from 'vue'
export default Vue.extend({
  data () {
    return ({
      cliente: {
        name: '',
        shortName: '',
        cpf: '',
        address: '',
        phone: ''
      } as Partial<Cliente>,
      showMessage: false
    })
  },
  methods: {
    async cadastrar () {
      await ElectronService().ipcRenderer.invoke('create-cliente', this.cliente)
      this.showMessage = true
    }
  }
})
</script>
