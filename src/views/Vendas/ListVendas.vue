<template>
<v-container>
  <h1 class="mb-2">Vendas do Dia</h1>
  <v-data-table
    :items="vendas"
    :headers="headers"
    no-data-text="Sem vendas"
  >
    <template v-slot:[`item.cliente.name`]="{ item }">
      {{ item.cliente ? item.cliente.name:'A Vista' }}
    </template>
    <template v-slot:[`item.total`]="{ item }">
      {{ item.total | currency }}
    </template>
    <template v-slot:[`item.input`]="{ item }">
      {{ item.input | currency }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn x-small color="error" @click="deleteVenda(item.id)">
        <v-icon small color="white">mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { DataTableHeader } from 'vuetify'
import { VendaService } from '@/services/VendaService'
import { Venda } from '@/models/Venda'

@Component
export default class ListVendas extends Vue {
  vendas: Venda[] = []

  async mounted () {
    const vendas = await VendaService.getVendas()
    console.log(vendas)
    this.vendas = vendas
  }

  async deleteVenda (vendaId: number) {
    await VendaService.deleteVenda(vendaId)
    this.vendas = await VendaService.getVendas()
  }

  get headers (): DataTableHeader[] {
    return [
      {
        text: 'N°',
        value: 'id'
      },
      {
        text: 'Cliente',
        value: 'cliente.name'
      },
      {
        text: 'Entrada',
        value: 'input'
      },
      {
        text: 'Total',
        value: 'total'
      },
      {
        text: 'Ações',
        value: 'actions',
        width: 30
      }
    ]
  }
}
</script>
