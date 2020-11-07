import { remote } from 'electron'
import path from 'path'
import { createConnection } from 'typeorm'
import { Cliente } from '@/models/Cliente'
import { ContaAReceber } from '@/models/ContaAReceber'
import { Parcela } from '@/models/Parcela'
import { Product } from '@/models/Product'
import { ProductVenda } from '@/models/ProductVenda'
import { Recebimento } from '@/models/Recebimento'
import { Venda } from '@/models/Venda'
import ormConfig from '../../ormconfig.json'

const isProd = process.env.NODE_ENV === 'production'
const databasePath = isProd ? path.join(remote.app.getPath('userData'), 'database.sqlite') : ormConfig.database

let singletonConnection
function create () {
  return createConnection({
    type: 'sqlite',
    database: databasePath,
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
