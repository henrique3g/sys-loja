import { ipcMain } from 'electron'
import { Product } from '../models/Product'

ipcMain.handle('get-all-products', async () => {
  return await Product.find()
})

ipcMain.handle('create-product', async (e, product) => {
  await Product.save(product)
  return 'ok'
})
