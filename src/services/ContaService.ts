import { getConnection, In } from 'typeorm'
import { Parcela } from '@/models/Parcela'
import { Recebimento } from '@/models/Recebimento'

class SingletonContaService {
  async baixarConta (contas: Parcela[], valorPago: number) {
    console.log(contas)
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    const manager = queryRunner.manager
    const RecebimentoRepo = manager.getRepository(Recebimento)
    const ParcelaRepo = manager.getRepository(Parcela)

    let somaDoValorBaixado = 0
    try {
      const recebimentos = await Promise.all(contas.map(async conta => {
        const restante = conta.value - conta.valueReceived
        const valorABaixar = restante + somaDoValorBaixado <= valorPago ? restante : valorPago - somaDoValorBaixado
        somaDoValorBaixado += valorABaixar
        const parcela = await ParcelaRepo.findOneOrFail(conta.id)
        await ParcelaRepo.save({ ...parcela, valueReceived: parcela.valueReceived + valorABaixar })

        return Recebimento.create({
          parcela: {
            id: conta.id
          },
          paymentDate: new Date(),
          value: valorABaixar
        })
      }))

      await RecebimentoRepo.save(recebimentos)
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
