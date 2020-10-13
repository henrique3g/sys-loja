import { Cliente } from '@/app/models/Cliente'
import { Product } from '@/app/models/Product'
import { ProductVenda } from '@/app/models/ProductVenda'
import { Venda } from '@/app/models/Venda'
import { createConnection } from 'typeorm'
import ormconfig from '../../ormconfig.json'

createConnection({
  type: 'sqlite',
  database: ormconfig.database,
  entities: [
    Product,
    Cliente,
    Venda,
    ProductVenda
  ]
})
