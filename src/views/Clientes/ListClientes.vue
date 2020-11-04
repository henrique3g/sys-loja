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
        <v-btn small color="red" @click="removeCliente(item.id)" >
          <v-icon color="white">mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-table>
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
      clientes: [] as Cliente[]
    }
  },
  methods: {
    async removeCliente (clienteId: number) {
      console.log('Remove: ' + clienteId)
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
