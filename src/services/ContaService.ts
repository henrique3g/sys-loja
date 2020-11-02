import { getConnection, In } from 'typeorm'
import { Parcela } from '@/models/Parcela'
import { Recebimento } from '@/models/Recebimento'

class SingletonContaService {
  async baixarConta (contas: Parcela[]) {
    console.log(contas)
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    const manager = queryRunner.manager
    const RecebimentoRepo = manager.getRepository(Recebimento)
    const ParcelaRepo = manager.getRepository(Parcela)

    try {
      const recebimentos = contas.map(conta => Recebimento.create({
        parcela: {
          id: conta.id
        },
        paymentDate: new Date(),
        value: conta.value
      }))
      await RecebimentoRepo.save(recebimentos)
      const parcelas = await ParcelaRepo.find({ where: { id: In(contas.map(c => c.id)) } })
      await ParcelaRepo.save(parcelas.map(parcela => ({ ...parcela, valueReceived: parcela.valueReceived + parcela.value })))
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      console.log('ouve algum erro...')
      console.log(error)
    } finally {
      await queryRunner.release()
    }
  }
}

let instance

if (!instance) {
  instance = new SingletonContaService()
}

export const ContaService = instance
