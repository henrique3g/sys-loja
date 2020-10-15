import { ipcMain } from 'electron'
import { Venda } from '../models/Venda'

const sum = (prev, current) => parseFloat(current.total + '') + prev

ipcMain.handle('caixa-saldo', async () => {
  const allVendas = await Venda.find({ relations: ['cliente'] })
  const vendasAVista = allVendas.filter(venda => venda.date.toLocaleDateString() === new Date().toLocaleDateString() && !venda.cliente)
  const vendasAPrazo = allVendas.filter(venda => venda.date.toLocaleDateString() === new Date().toLocaleDateString() && venda.cliente)
  return {
    aVista: vendasAVista.reduce(sum, 0),
    aPrazo: vendasAPrazo.reduce(sum, 0)
  }
})
