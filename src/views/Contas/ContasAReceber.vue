<template>
  <v-container>
    <h1>Contas a receber</h1>
    <v-autocomplete
      ref="input"
      label="Cliente"
      :items="clientes"
      item-text="name"
      item-value="id"
      v-model="selectedCliente"
      :clearable="true"
    />
    <v-data-table
      :disable-sort="true"
      :headers="tableHeaders"
      :items="contas"
      :disable-pagination="true"
      :hide-default-footer="true"
    >
      <template v-slot:[`item.dueDate`]="{ item }">
        <div :class="vencida(item.dueDate) ? 'red--text' : ''">
          {{ formatDate(item.dueDate) }}
        </div>
      </template>
      <template v-slot:[`item.contaAReceber.date`]="{ item }">
          {{ formatDate(item.contaAReceber.date) }}
      </template>
      <template v-slot:[`item.value`]="{ item }">
          {{ item.value | currency }}
      </template>
      <template v-slot:[`item.valueReceived`]="{ item }">
        <div v-if="item.valueReceived">
          {{ item.valueReceived | currency}}
        </div>
        <div v-if="!item.valueReceived">
          -
        </div>
      </template>
      <template v-slot:[`item.restante`]="{ item }">
          {{ item.value - item.valueReceived | currency }}
      </template>
    </v-data-table>
    <v-row justify="end">

     <h1 >Total: {{total}}</h1>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { format, compareAsc, isPast, isBefore } from 'date-fns'
import { Cliente } from '@/models/Cliente'
import { ClienteService } from '@/services/ClienteService'
import { DataTableHeader } from 'vuetify'
import { Parcela } from '@/models/Parcela'

export default Vue.extend({
  data: () => ({
    clientes: [] as Cliente[],
    contas: [] as Parcela[],
    selectedCliente: null as Cliente | null
  }),
  async mounted () {
    this.clientes = await ClienteService.findAll()
  },
  methods: {
    formatDate (date: Date) {
      return format(date, 'dd/MM/y')
    },
    vencida (date: Date) {
      return isBefore(new Date(format(date, 'MM-dd-y')), new Date(format(new Date(), 'MM-dd-y')))
    }
  },
  watch: {
    selectedCliente: async function (clienteId: number) {
      console.log('buscando...')
      if (!clienteId) return
      const contas = await ClienteService.getContas(clienteId)
      this.contas = contas.sort((item1, item2) => compareAsc(item1.dueDate, item2.dueDate))
    }
  },
  computed: {
    total () {
      return this.contas.reduce((prev, curr) => prev + curr.value - curr.valueReceived, 0)
    },
    tableHeaders: (): DataTableHeader[] => [
      {
        text: 'Venda N°',
        value: 'contaAReceber.venda.id',
        width: 83
      },
      {
        text: 'Parcela',
        value: 'number',
        width: 10
      },
      {
        text: 'Data Compra',
        value: 'contaAReceber.date'
      },
      {
        text: 'Vencimento',
        value: 'dueDate'
      },
      {
        text: 'Valor Pago',
        value: 'valueReceived'
      },
      {
        text: 'Valor Total',
        value: 'value'
      },
      {
        text: 'Restante',
        value: 'restante'
      }

    ]
  }
})
</script>
