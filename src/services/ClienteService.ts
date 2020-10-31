import { Cliente } from '@/models/Cliente'
import { Parcela } from '@/models/Parcela'

class ClienteServiceClass {
  async findAll () {
    return await Cliente.find()
  }

  async create (cliente: Partial<Cliente>) {
    try {
      await Cliente.save(Cliente.create(cliente))
      return 'ok'
    } catch (error) {
      return 'error'
    }
  }

  async getContas (clienteId: number) {
    return Parcela.createQueryBuilder('parcela')
      .innerJoinAndSelect('parcela.contaAReceber', 'conta')
      .innerJoinAndSelect('conta.venda', 'venda')
      .innerJoinAndSelect('venda.cliente', 'cliente')
      .where('cliente.id = :id', { id: clienteId })
      .getMany()
  }
}

let instance

if (!instance) instance = new ClienteServiceClass()

export const ClienteService = instance
