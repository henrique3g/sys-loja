import { Venda } from '@/models/Venda'

class CaixaServiceClass {
  async getSaldo () {
    const sum = (prev: number, current: Venda) => parseFloat(current.total + '') + prev
    const allVendas = await Venda.find({ relations: ['cliente'] })
    const vendasAVista = allVendas.filter(venda => venda.date.toLocaleDateString() === new Date().toLocaleDateString() && !venda.cliente)
    const vendasAPrazo = allVendas.filter(venda => venda.date.toLocaleDateString() === new Date().toLocaleDateString() && venda.cliente)
    return {
      aVista: vendasAVista.reduce(sum, 0),
      aPrazo: vendasAPrazo.reduce(sum, 0)
    }
  }
}

let instance

if (!instance) instance = new CaixaServiceClass()

export const CaixaService = instance
