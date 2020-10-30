import { CreateVenda } from '@/Contracts/createVenda'
import { ContaAReceber } from '@/models/ContaAReceber'
import { Parcela } from '@/models/Parcela'
import { ProductVenda } from '@/models/ProductVenda'
import { Venda } from '@/models/Venda'
import { addMonths } from 'date-fns'

class VendaServiceClass {
  async createVenda (venda: CreateVenda) {
    try {
      console.log(venda)
      const vendaCreated = await Venda.save(Venda.create({
        cliente: { id: parseInt(venda.cliente + '') },
        date: venda.date,
        discount: venda.discount,
        input: venda.input,
        total: venda.total
      }))
      await ProductVenda.save(venda.products.map(prod => ProductVenda.create({
        venda: vendaCreated,
        amount: prod.amount,
        price: prod.price,
        product: { id: prod.id }
      })))

      if (!venda.cliente) return 'ok'
      console.log(vendaCreated)

      const contaAReceber = await ContaAReceber.save(ContaAReceber.create({ date: vendaCreated.date, venda: vendaCreated, value: vendaCreated.total - vendaCreated.input }))

      const parcelas = []

      for (let i = 0; i < venda.parcelas; i++) {
        parcelas.push(Parcela.create({
          contaAReceber: contaAReceber,
          dueDate: addMonths(contaAReceber.date, i + 1),
          number: i + 1,
          value: contaAReceber.value / venda.parcelas
        }))
      }

      await Parcela.save(parcelas)

      return 'ok'
    } catch (error) {
      console.log(error)
      return 'error'
    }
  }
}

let instance

if (!instance) instance = new VendaServiceClass()

export const VendaService = instance
