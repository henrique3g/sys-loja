import { getConnection } from 'typeorm'
import { addMonths, isToday } from 'date-fns'
import { CreateVenda } from '@/Contracts/createVenda'
import { ContaAReceber } from '@/models/ContaAReceber'
import { Parcela } from '@/models/Parcela'
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

      if (!venda.cliente) return vendaCreated.id
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

      return vendaCreated.id
    } catch (error) {
      console.log(error)
      return 'error'
    }
  }

  async getVendas () {
    const vendas = await Venda.find({ relations: ['cliente', 'productVenda'] })

    return vendas.filter((venda) => isToday(venda.date))
  }

  async getVenda (vendaId: number) {
    return await Venda.findOneOrFail(vendaId, {
      relations: [
        'cliente',
        'productVenda',
        'productVenda.product',
        'contaAReceber',
        'contaAReceber.parcelas'
      ]
    })
  }

  async deleteVenda (vendaId: number) {
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const manager = queryRunner.manager

    const vendaRepo = manager.getRepository(Venda)
    const parcelaRepo = manager.getRepository(Parcela)
    const contaRepo = manager.getRepository(ContaAReceber)
    const productVendaRepo = manager.getRepository(ProductVenda)

    try {
      const venda = await vendaRepo.findOneOrFail({ where: { id: vendaId }, relations: ['cliente'] })
      if (venda.cliente) {
        const parcelas = await parcelaRepo.createQueryBuilder('parcela')
          .leftJoin('parcela.contaAReceber', 'conta')
          .leftJoin('conta.venda', 'venda')
          .where('venda.id = :id', { id: vendaId })
          .getMany()
        await parcelaRepo.delete(parcelas.map(parc => parc.id))
        await contaRepo.delete({ venda: { id: vendaId } })
        await productVendaRepo.delete({ venda: { id: vendaId } })
        await vendaRepo.delete({ id: vendaId })
      } else {
        await productVendaRepo.delete({ venda: { id: vendaId } })
        await vendaRepo.delete(venda.id)
      }

      await queryRunner.commitTransaction()
    } catch (error) {
      console.log('ouve um erro...')
      console.log(error)
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
}

let instance

if (!instance) instance = new VendaServiceClass()

export const VendaService = instance
