<template>
  <v-container>
  <h1>Seja bem vindo</h1>
  <v-card width="250" color="primary" elevation="10" dark>
    <v-card-title>Vendas do dia</v-card-title>
    <v-card-text>
      <h2 class="mb-3">A Vista: {{ aVista | currency }}</h2>
      <h2>A Prazo: {{ aPrazo | currency }}</h2>
    </v-card-text>
  </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { ElectronService } from '@/app/services/ElectronService'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  aVista = null
  aPrazo = null
  async mounted () {
    const { aVista, aPrazo } = await ElectronService().ipcRenderer.invoke('caixa-saldo')
    this.aVista = aVista
    this.aPrazo = aPrazo
  }
}
</script>
