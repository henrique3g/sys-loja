import { ipcMain } from 'electron'
import { Cliente } from '../models/Cliente'

ipcMain.handle('list-all-clientes', async () => {
  return await Cliente.find()
})

ipcMain.handle('create-cliente', async (e, cliente) => {
  try {
    await Cliente.save(cliente)
    return 'ok'
  } catch (error) {
    return 'error'
  }
})
