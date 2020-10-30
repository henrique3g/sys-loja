import { Cliente } from '@/models/Cliente'
import { ContaAReceber } from '@/models/ContaAReceber'
import { Parcela } from '@/models/Parcela'
import { Product } from '@/models/Product'
import { ProductVenda } from '@/models/ProductVenda'
import { Recebimento } from '@/models/Recebimento'
import { Venda } from '@/models/Venda'
import { createConnection } from 'typeorm'
import ormconfig from '../../ormconfig.json'

let singletonConnection
function create () {
  return createConnection({
    type: 'sqlite',
    database: ormconfig.database,
    entities: [
      Product,
      Cliente,
      Venda,
      ProductVenda,
      ContaAReceber,
      Parcela,
      Recebimento
    ]
  })
}

if (!singletonConnection) singletonConnection = create()

export const connection = singletonConnection
