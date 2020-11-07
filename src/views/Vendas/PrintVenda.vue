<template>
<v-container class="pagina">
  <v-row no-gutters class="d-print-none mt-2">
    <v-btn color="primary" @click="imprimir">Imprimir</v-btn>
  </v-row>
  <v-row no-gutters class="">
    <v-col>
      Cliente:
      <strong class="text-h5">
        {{ clienteName }}
      </strong>
    </v-col>
    <v-col cols="2">
      <v-row class="justify-end">
        Venda N°: <strong>{{ vendaId }}</strong>
      </v-row>
    </v-col>
    <v-col cols="3">
      <v-row class="justify-end">
        Date: <strong v-if="venda">{{formatDate(venda.date)}}</strong>
      </v-row>
    </v-col>
  </v-row>
  <v-row no-gutters>
    Forma de pagamento:<strong class="ml-1">{{ formOfPayment }}</strong>
  </v-row>
  <v-row no-gutters v-if="totalParcela">
    Parcelas:<strong class="ml-1">{{ totalParcela }}</strong>
  </v-row>

  <div>
    <div class="parcela" v-for="parcela in parcelas" :key="parcela.id">
      <div>N°: {{ parcela.number }}</div>
      <div>
        Vencimento: {{ formatDate(parcela.dueDate) }}
      </div>
      <div>Valor: {{ parcela.value | currency }}</div>
    </div>
  </div>

  <v-data-table
    :items="getProducts"
    :headers="headers"
    disable-filtering
    disable-pagination
    disable-sort
    hide-default-footer
    class="table"
  >

    <template v-slot:[`item.price`]="{ item }">
      {{ item.price | currency }}
    </template>

    <template v-slot:[`item.total`]="{ item }">
      {{ (item.amount * item.price) | currency }}
    </template>
  </v-data-table>

  <v-row no-gutters class="text-h4 mt-2 justify-end">
    Total: {{ total | currency }}
  </v-row>

</v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { DataTableHeader } from 'vuetify'
import { Venda } from '@/models/Venda'
import { VendaService } from '@/services/VendaService'
import { format } from 'date-fns'
import { remote } from 'electron'

@Component
export default class PrintVenda extends Vue {
  venda: Venda|null = null
  async mounted () {
    this.venda = await VendaService.getVenda(+this.$route.params.vendaId)
    console.log(this.venda)
  }

  formatDate (date: Date) {
    return format(date, 'dd/MM/Y')
  }

  async imprimir () {
    try {
      await remote.webContents.getAllWebContents()[0].print({}, (success, error) => {
        if (error) {
          console.log('erro...x')
          console.log(error)
        }
        console.log(success)
      })
    } catch (error) {
    }
  }

  get totalParcela () {
    return this.venda?.contaAReceber?.parcelas.length
  }

  get parcelas () {
    return this.venda?.contaAReceber?.parcelas ?? []
  }

  get formOfPayment () {
    return this.venda?.cliente ? 'A Prazo' : 'A Vista'
  }

  get total () {
    return this.venda?.productVenda.reduce((prev, curr) => prev + curr.price * curr.amount, 0)
  }

  get getProducts () {
    return this.venda?.productVenda
  }

  get clienteName () {
    return this.venda?.cliente?.name ?? 'Venda a Vista'
  }

  get vendaId () {
    return this.venda?.id
  }

  get headers (): DataTableHeader[] {
    return [
      {
        text: 'Descrição',
        value: 'product.description'
      },
      {
        text: 'Preço',
        value: 'price',
        width: 100
      },
      {
        text: 'Quantidade',
        value: 'amount',
        width: 100,
        align: 'center'
      },
      {
        text: 'Total',
        value: 'total',
        width: 100
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
  .parcela {
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    margin-right: 1%;
    margin-bottom: 1%;
  }
  .pagina {
  }
  .table {
    border: 1px solid #ddd;
  }
</style>
