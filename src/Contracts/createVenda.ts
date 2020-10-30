import { Cliente } from '@/models/Cliente'

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
  parcelas: number;
}
