import { getConnection } from 'typeorm'
import { Parcela } from '@/models/Parcela'
import { Recebimento } from '@/models/Recebimento'
import { isToday } from 'date-fns'

class SingletonContaService {
  async getContas (clienteId: number) {
    return Parcela.createQueryBuilder('parcela')
      .innerJoinAndSelect('parcela.contaAReceber', 'conta')
      .innerJoinAndSelect('conta.venda', 'venda')
      .innerJoinAndSelect('venda.cliente', 'cliente')
      .where('cliente.id = :id', { id: clienteId })
      .andWhere('parcela.valueReceived < parcela.value')
      .getMany()
  }

  async getRecebimentos (clienteId: number) {
    return Recebimento.createQueryBuilder('recebimento')
      .innerJoinAndSelect('recebimento.parcela', 'parcela')
      .innerJoinAndSelect('parcela.contaAReceber', 'conta')
      .innerJoinAndSelect('conta.venda', 'venda')
      .innerJoinAndSelect('venda.cliente', 'cliente')
      .where('cliente.id = :id', { id: clienteId })
      .getMany()
  }

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

  async estornarRecebimento (recebimentos: Recebimento[]) {
    console.log(recebimentos)
    const recebimentosPast = recebimentos.filter(recebimento => !isToday(recebimento.paymentDate))
    if (recebimentosPast.length) throw new Error('Recebimento de datas anteriores não podem ser baixados')

    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    const manager = queryRunner.manager
    const recebimentoRepo = manager.getRepository(Recebimento)
    const parcelaRepo = manager.getRepository(Parcela)

    await queryRunner.startTransaction()
    try {
      for (const recebimento of recebimentos) {
        const parcela = await parcelaRepo.findOneOrFail(recebimento.parcela.id)
        parcela.valueReceived -= recebimento.value
        await parcelaRepo.save(parcela)
      }
      await recebimentoRepo.delete(recebimentos.map(recebimento => recebimento.id))

      await queryRunner.commitTransaction()
    } catch (error) {
      console.log('ouve um erro...X')
      console.log(error)
      await queryRunner.rollbackTransaction()
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
