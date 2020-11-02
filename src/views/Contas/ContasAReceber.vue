<template>
  <v-container>
    <h1>Contas a receber</h1>
    <v-row no-gutters>
      <v-col>
        <v-autocomplete
          ref="input"
          label="Cliente"
          :items="clientes"
          item-text="name"
          item-value="id"
          v-model="selectedCliente"
          :clearable="true"
        />
      </v-col>
      <v-col class="ml-3" cols="3">
        <v-select
          :items="stateItems"
          item-text="text"
          item-value="value"
          v-model="stateContas"
        />
      </v-col>
    </v-row>
    <v-row class="mb-3 flex-nowrap" no-gutters>
      <v-card :disabled="!selectedCliente" width="27%" class="mr-3 white--text" color="primary">
        <v-card-title>Em aberto</v-card-title>
        <v-card-text class="white--text font-weight-bold">{{total | currency}}</v-card-text>
      </v-card>
      <v-card :disabled="!selectedCliente" width="27%" class="white--text" color="error">
        <v-card-title>Vencido</v-card-title>
        <v-card-text class="white--text font-weight-bold">{{totalVencido | currency}}</v-card-text>
      </v-card>
      <v-card :disabled="!selectedCliente" width="27%" class="ml-3 mr-3 white--text" color="success">
        <v-card-title>Selecionado</v-card-title>
        <v-card-text class="white--text font-weight-bold">{{totalSelecionado | currency}}</v-card-text>
      </v-card>
      <div class="ml-auto align-self-end">

        <v-btn v-if="this.stateContas === 'receber'" @click="baixarConta" :disabled="!selectedContas.length" x-large class="primary align-self-end">Baixar</v-btn>
        <v-btn v-if="this.stateContas === 'baixadas'" @click="estornarContas" :disabled="!selectedContas.length" x-large class="error align-self-end">Estornar</v-btn>
      </div>
    </v-row>
    <v-data-table
      :disable-sort="true"
      :headers="tableHeaders"
      :items="contas"
      :disable-pagination="true"
      :hide-default-footer="true"
      show-select
      v-model="selectedContas"
      no-data-text="Não possui contas"
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

    <v-dialog width="300" v-model="successModal">
      <v-card>
        <v-card-title>
          Baixado
        </v-card-title>
        <v-card-text>Contas Baixas com sucesso</v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="successModal = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { format, compareAsc, isBefore } from 'date-fns'
import { Cliente } from '@/models/Cliente'
import { ClienteService } from '@/services/ClienteService'
import { ContaService } from '@/services/ContaService'
import { DataTableHeader } from 'vuetify'
import { Parcela } from '@/models/Parcela'

@Component
export default class ContasAReceber extends Vue {
  clientes = [] as Cliente[];
  contas = [] as Parcela[];
  // selectedCliente = null as Cliente | null;
  selectedCliente = null as number | null;
  stateContas = this.stateItems[0].value
  selectedContas = [] as Parcela[]

  successModal = false;
  async mounted () {
    this.clientes = await ClienteService.findAll()
  }

  formatDate (date: Date) {
    return format(date, 'dd/MM/y')
  }

  vencida (date: Date): boolean {
    return isBefore(new Date(format(date, 'MM-dd-y')), new Date(format(new Date(), 'MM-dd-y')))
  }

  async baixarConta () {
    await ContaService.baixarConta(this.selectedContas)
    this.successModal = true
    if (this.selectedCliente) {
      this.getContas(this.selectedCliente)
    }
  }

  async estornarContas () {
    console.log('estornar')
  }

  async getContas (clienteId: number) {
    const contas = await ClienteService.getContas(clienteId, this.stateContas)
    this.contas = contas.sort((item1, item2) => compareAsc(item1.dueDate, item2.dueDate))
    this.selectedContas = []
  }

  @Watch('stateContas')
  async watchStateContas () {
    if (this.selectedCliente) {
      await this.getContas(this.selectedCliente)
    }
  }

  @Watch('selectedCliente')
  async watchselectedCliente (clienteId: number) {
    console.log('buscando...')
    if (!clienteId) {
      this.contas = []
      return
    }
    await this.getContas(clienteId)
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

  get stateItems () {
    return [
      {
        text: 'A Receber',
        value: 'receber' as 'receber'
      },
      {
        text: 'Baixadas',
        value: 'baixadas' as 'baixadas'
      }
    ]
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

<style scoped>
  .btn-baixar {
    min-height: 100px;
    position: relative;
    width: 11.5%;
  }
</style>
