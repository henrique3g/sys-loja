<template>
  <v-dialog width="300" v-model="show">
    <v-card >
      <v-card-title class="justify-center">Finalizar venda</v-card-title>
      <v-card-text>
        <v-text-field
          label="Parcelas"
          autofocus
          v-model="parcelas"
        />
        <h1>Total: </h1>

      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="success">Finalizar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return ({
      parcelas: 1
    })
  },
  methods: {
    finalize () {
      console.log('123')
    }
  }
})
</script>
