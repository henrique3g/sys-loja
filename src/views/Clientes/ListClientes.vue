<template>
<v-container>
  <h1 class="mb-4">Clientes</h1>
  <v-btn color="primary" to="/clientes/new">Novo</v-btn>
  <v-data-table :items="clientes" :headers="headers">
    <template v-slot:[`item.actions`]="{ item }">
      <v-row no-gutters class="flex-nowrap">
        <v-btn small class="mr-1" color="success" @click="editCliente(item.id)" >
          <v-icon color="white">mdi-pencil-circle-outline</v-icon>
        </v-btn>
        <v-btn small color="red" @click="openConfirmationDialog(item.id)" >
          <v-icon color="white">mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-table>
  <v-dialog width="300" v-model="confirmationDialog.show">
    <v-card>
      <v-card-title>Confirmação</v-card-title>
      <v-card-text>Deseja realmente exluir esse cliente?</v-card-text>
      <v-card-actions class="justify-space-around">
        <v-btn @click="confirmationDialog.show = false" color="primary">Não</v-btn>
        <v-btn @click="removeCliente" color="error">Sim</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog width="300" v-model="errorDialog.show">
    <v-card class="text-center">
      <v-card-title class="justify-center">Ops!</v-card-title>
      <v-card-text>{{ errorDialog.message }}</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="errorDialog.show = false" color="primary">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { DataTableHeader } from 'vuetify'
import { Cliente } from '@/models/Cliente'
import { ClienteService } from '@/services/ClienteService'

export default Vue.extend({
  data () {
    return {
      clientes: [] as Cliente[],
      confirmationDialog: {
        show: false,
        clienteId: 0
      },
      errorDialog: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    async removeCliente () {
      const id = this.confirmationDialog.clienteId
      console.log('Remove: ' + id)
      this.confirmationDialog.show = false
      try {
        await ClienteService.removeCliente(id)
        this.clientes = await ClienteService.findAll()
      } catch (error) {
        console.log(error)
        this.errorDialog.show = true
        this.errorDialog.message = 'Esse cliente não pode ser excluido!'
      }
    },
    async openConfirmationDialog (clienteId: number) {
      this.confirmationDialog.clienteId = clienteId
      this.confirmationDialog.show = true
    },
    async editCliente (clienteId: number) {
      console.log('editando: ' + clienteId)
    }
  },
  async mounted () {
    this.clientes = await ClienteService.findAll()
  },
  computed: {
    headers (): DataTableHeader<Cliente>[] {
      return [
        {
          text: 'Nº',
          value: 'id'
        },
        {
          text: 'Nome',
          value: 'name'
        },
        {
          text: 'Apelido',
          value: 'shortName'
        },
        {
          text: 'CPF',
          value: 'cpf'
        },
        {
          text: 'Endereço',
          value: 'address'
        },
        {
          text: 'Telefone',
          value: 'phone'
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
