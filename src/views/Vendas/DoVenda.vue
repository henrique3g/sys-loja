<template>
  <v-container>
    <v-row justify="space-between" no-gutters>
      <h1>Venda</h1>
      <h1><v-icon @click="cancelarVenda">mdi-close</v-icon></h1>
    </v-row>
    <v-form v-model="formValid" ref="form">
      <v-container>
        <v-row align="center">
          <v-autocomplete
            :items="clientes"
            item-text="name"
            item-value="id"
            v-model="selectedClient"
            auto-select-first
            clearable
            label="Cliente"
          />
          <h1 class="ml-4 text-decoration-underline">
            {{ selectedClient ? "A prazo" : "A vista" }}
          </h1>
        </v-row>

        <v-row align="center" class="my-n4">
          <h3 class="mr-2">Desconto:</h3>
          <h2>{{ selectedClient ? 0 : 10 }}%</h2>
          <v-col cols="1" class="mx-2">
            <v-text-field
              label="Parcelas"
              :disabled="!selectedClient"
              v-model="parcelas"
              type="number"
            />
          </v-col>
          <v-col cols="1">
            <v-text-field
              label="Entrada"
              :disabled="!selectedClient"
              v-model="entrada"
              type="number"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-divider />
        </v-row>
        <v-row>
          <h3>Produtos</h3>
        </v-row>

        <v-row>
          <v-autocomplete
            class="mr-2"
            ref="input_produto"
            label="Produto"
            :items="produtos"
            item-text="description"
            return-object
            v-model="selectedProduct"
            :rules="productRules"
          />
          <v-text-field
            :rules="quantityRules"
            v-model="amount"
            type="number"
            label="Quantidade"
          />
        </v-row>
        <v-row>
          <v-text-field
            class="mr-2"
            suffix="R$"
            disabled
            type="number"
            :value="selectedProduct && selectedProduct.price"
            label="Preço Unit."
          />
          <v-text-field
            class="mr-2"
            suffix="R$"
            disabled
            type="number"
            :value="totalProduct"
            label="Total"
          />

          <v-btn
            class="align-self-center"
            color="primary"
            @click="addToCart"
            :disabled="!formValid"
            >Adicionar</v-btn
          >
        </v-row>
      </v-container>
    </v-form>
    <v-data-table
      disable-sort
      hide-default-footer
      disable-pagination
      :headers="headers"
      :items="selectedsProducts && selectedsProducts"
    />
    <v-divider />
    <v-row justify="end">
      <v-col cols="auto">
        <v-row justify="end" no-gutters>
          <h6 class="align-self-center mr-3">Total sem desconto:</h6>
          <h5 class="text-end">{{ totalVenda | currency }}</h5>
        </v-row>
        <v-row justify="end" no-gutters>
          <h6 class="align-self-center mr-3">Desconto:</h6>
          <h4 class="text-end">{{ descontoEmReais | currency }}</h4>
        </v-row>
        <v-row justify="end" no-gutters>
          <h3 class="align-self-center mr-3">Total:</h3>
          <h1 class="text-end">{{ totalComDesconto | currency }}</h1>
        </v-row>
        <v-btn color="success" @click="finalizeVenda" :disabled="validVenda"
          >Finalizar Venda (F10)</v-btn
        >
      </v-col>
    </v-row>
    <finalize-venda :show="finalizeModal" />
    <v-dialog width="300" v-model="successDialog">
      <v-card>
        <v-card-title>Finalizada</v-card-title>
        <v-card-text>Venda salva com sucesso</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn ref="btn-ok" color="primary" @click="successDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Ref, Component, Vue, Watch } from 'vue-property-decorator'
import { DataTableHeader } from 'vuetify'
import { Product } from '@/models/Product'
import { CreateVenda } from '@/Contracts/createVenda'
import FinalizeVenda from './FinalizeVenda.vue'
import { Cliente } from '@/models/Cliente'
import { ProdutoVenda } from './types'
import { VendaService } from '@/services/VendaService'
import { ClienteService } from '@/services/ClienteService'
import { findAllProducts } from '@/services/ProductService'

@Component({ components: { FinalizeVenda } })
export default class DoVenda extends Vue {
  @Ref('form') form!: HTMLFormElement;
  @Ref('input_produto') input_produto!: HTMLInputElement;
  @Ref('btn-ok') btnOk!: {$el: HTMLButtonElement};

  clientes: Cliente[] = [];
  produtos: Product[] = [];
  selectedClient: Cliente|null = null;
  selectedProduct: Product|null = null;
  selectedsProducts: ProdutoVenda[] = [];
  amount: number|null = null;
  formValid = false;
  quantityRules = [(v: number) => v > 0 || 'Quantidade não pode ser negativa'];

  productRules = [(v: Product) => (v && !!v.description) || 'Escolha um produto'];

  finalizeModal = false;
  successDialog = false;
  parcelas = 1;
  entrada = 0;

  @Watch('successDialog')
  onDialogChange (val: boolean) {
    if (val === true) {
      setTimeout(() => {
        this.btnOk.$el.focus()
      }, 100)
    }
  }

  addToCart () {
    if (this.selectedProduct) {
      this.selectedsProducts.push({
        id: this.selectedProduct.id,
        price: this.selectedProduct.price,
        description: this.selectedProduct.description,
        amount: this.amount || 0,
        total: (this.amount || 0) * this.selectedProduct.price
      })
      this.amount = null
      this.form.resetValidation()
      this.selectedProduct = null
      this.input_produto.focus()
    }
  }

  async finalizeVenda () {
    try {
      const result = await VendaService.createVenda({
        products: this.selectedsProducts,
        cliente: this.selectedClient,
        date: new Date(),
        total: this.totalVenda,
        input: this.entrada,
        discount: this.desconto,
        parcelas: this.parcelas
      } as CreateVenda)
      this.successDialog = true
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  cancelarVenda () {
    this.form.reset()
    this.selectedsProducts = []
  }

  get desconto () {
    return this.selectedClient ? 0 : 10
  }

  get descontoEmReais () {
    return this.totalVenda - this.totalComDesconto
  }

  get validVenda () {
    if (this.selectedsProducts.length) {
      return false
    }
    return true
  }

  get totalComDesconto () {
    return this.totalVenda - (this.desconto * this.totalVenda) / 100
  }

  get totalVenda () {
    const products = this.selectedsProducts
    if (products.length < 1) return 0
    const total = products.reduce((prev, current) => current.total + prev, 0)
    return total
  }

  get totalProduct () {
    if (this.selectedProduct) {
      const result =
        this.selectedProduct.price * (this.amount || 0)
      return result || ''
    }
  }

  get headers (): DataTableHeader[] {
    return [
      {
        text: 'Cod.',
        value: 'id',
        width: 15
      },
      {
        text: 'Descrição',
        value: 'description'
      },
      {
        text: 'Quantidade',
        value: 'amount'
      },
      {
        text: 'Preço',
        value: 'price'
      },
      {
        text: 'Total',
        value: 'total'
      }
    ]
  }

  async mounted () {
    this.clientes = await ClienteService.findAll()
    this.produtos = await findAllProducts()
  }
}
</script>
