import { Cliente } from '@/models/Cliente'
import { Product } from '@/models/Product'
import { ProductVenda } from '@/models/ProductVenda'
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
      ProductVenda
    ]
  })
}

if (!singletonConnection) singletonConnection = create()

export const connection = singletonConnection
