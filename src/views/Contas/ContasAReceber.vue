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
    <v-row class="mb-3" no-gutters>
      <v-card class="mr-3 white--text" color="primary">
        <v-card-title>Total em aberto</v-card-title>
        <v-card-text class="white--text font-weight-bold">{{total | currency}}</v-card-text>
      </v-card>
      <v-card class="white--text" color="error">
        <v-card-title>Total vencido</v-card-title>
        <v-card-text class="white--text font-weight-bold">{{totalVencido | currency}}</v-card-text>
      </v-card>
      <v-card class="ml-3 white--text" color="success">
        <v-card-title>Total selecionado</v-card-title>
        <v-card-text class="white--text font-weight-bold">{{totalSelecionado | currency}}</v-card-text>
      </v-card>
    </v-row>
    <v-data-table
      :disable-sort="true"
      :headers="tableHeaders"
      :items="contas"
      :disable-pagination="true"
      :hide-default-footer="true"
      show-select
      v-model="selectedContas"
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import { format, compareAsc, isBefore } from 'date-fns'
import { Cliente } from '@/models/Cliente'
import { ClienteService } from '@/services/ClienteService'
import { DataTableHeader } from 'vuetify'
import { Parcela } from '@/models/Parcela'

@Component
export default class ContasAReceber extends Vue {
  clientes = [] as Cliente[];
  contas = [] as Parcela[];
  selectedCliente = null as Cliente | null;
  selectedContas = [] as Parcela[]
  async mounted () {
    this.clientes = await ClienteService.findAll()
  }

  formatDate (date: Date) {
    return format(date, 'dd/MM/y')
  }

  vencida (date: Date): boolean {
    return isBefore(new Date(format(date, 'MM-dd-y')), new Date(format(new Date(), 'MM-dd-y')))
  }

  @Watch('selectedCliente')
  async watchselectedCliente (clienteId: number) {
    console.log('buscando...')
    if (!clienteId) return
    const contas = await ClienteService.getContas(clienteId)
    this.contas = contas.sort((item1, item2) => compareAsc(item1.dueDate, item2.dueDate))
  }

  get total () {
    return this.contas.reduce((prev, curr) => prev + curr.value - curr.valueReceived, 0)
  }

  get totalVencido () {
    return this.contas.reduce((prev, curr) => this.vencida(curr.dueDate) ? curr.value + prev : prev, 0)
  }

  get totalSelecionado () {
    return this.selectedContas.reduce((prev, curr) => prev + curr.value, 0)
  }

  get tableHeaders (): DataTableHeader[] {
    return [
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
}
</script>
