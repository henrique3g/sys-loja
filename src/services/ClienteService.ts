import { Cliente } from '@/models/Cliente'

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
}

let instance

if (!instance) instance = new ClienteServiceClass()

export const ClienteService = instance
