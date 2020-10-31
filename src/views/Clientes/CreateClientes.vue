<template>
<v-container>
  <h1>Cadastro de Clientes</h1>
  <v-form ref="form">
    <v-text-field autofocus label="Nome" v-model="cliente.name"/>
    <v-text-field label="Apelido" v-model="cliente.shortName" />
    <v-text-field label="CPF" v-model="cliente.cpf" />
    <v-text-field label="Endereço" v-model="cliente.address" />
    <v-text-field label="Telefone" v-model="cliente.phone" />

    <v-row justify="space-around">
      <v-btn tabindex="6" to="/clientes">Cancelar</v-btn>
      <v-btn tabindex="5" color="primary" @click="cadastrar">Salvar</v-btn>
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
        <v-btn ref="btn_ok" color="primary" @click="showMessage = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Cliente } from '@/models/Cliente'
import { ClienteService } from '@/services/ClienteService'

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
      await ClienteService.create(this.cliente)
      const form = this.$refs.form as HTMLFormElement
      form.reset()
      this.showMessage = true
      setTimeout(() => {
        (this.$refs.btn_ok as unknown as {$el: HTMLButtonElement}).$el.focus()
      }, 0)
    }
  }
})
</script>
