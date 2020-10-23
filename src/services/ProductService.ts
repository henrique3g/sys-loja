import { Product } from '@/models/Product'

export const createProduct = async (product: Partial<Product>) => {
  await Product.save(Product.create(product))
  return 'ok'
}

export const findAllProducts = async (): Promise<Product[]> => {
  return await Product.find()
}
