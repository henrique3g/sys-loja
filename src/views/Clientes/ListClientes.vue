<template>
<v-container>
  <v-btn color="primary" to="/clientes/new">Novo</v-btn>
  <v-data-table :items="clientes" :headers="headers" />
</v-container>
</template>

<script lang="ts">
import { ElectronService } from '@/app/services/ElectronService'
import Vue from 'vue'
import { DataTableHeader } from 'vuetify'
export default Vue.extend({
  data () {
    return {
      clientes: []
    }
  },
  methods: {
    getClientes () {
      console.log('asd')
    }
  },
  async mounted () {
    this.clientes = await ElectronService().ipcRenderer.invoke('list-all-clientes', {
      name: 'jaoo henrique'
    })
  },
  computed: {
    headers (): DataTableHeader[] {
      return [
        {
          text: 'Nº',
          value: 'id'
        },
        {
          text: 'Nome',
          value: 'name'
        }
      ]
    }
  }
})
</script>
