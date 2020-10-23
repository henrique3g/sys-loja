import { CreateVenda } from '@/Contracts/createVenda'
import { ProductVenda } from '@/models/ProductVenda'
import { Venda } from '@/models/Venda'

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
