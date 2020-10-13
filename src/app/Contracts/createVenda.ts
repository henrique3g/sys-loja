import { Cliente } from '../models/Cliente'
import { Product } from '../models/Product'

export interface ProductVenda {
  id: number;
  amount: number;
  price: number;
}

export interface CreateVenda {
  products: ProductVenda[];
  cliente: Cliente;
  date: Date;
  total: number;
  input: number;
  discount: number;
}
