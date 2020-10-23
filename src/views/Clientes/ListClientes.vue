<template>
<v-container>
  <h1 class="mb-4">Clientes</h1>
  <v-btn color="primary" to="/clientes/new">Novo</v-btn>
  <v-data-table :items="clientes" :headers="headers" />
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
    getClientes () {
      console.log('asd')
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
        }
      ]
    }
  }
})
</script>
