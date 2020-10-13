import { Cliente } from '@/app/models/Cliente'
import { Product } from '@/app/models/Product'
import { createConnection } from 'typeorm'
import ormconfig from '../../ormconfig.json'

createConnection({
  type: 'sqlite',
  database: ormconfig.database,
  entities: [
    Product,
    Cliente
  ]
})
