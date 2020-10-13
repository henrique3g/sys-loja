import { IpcRenderer } from 'electron'
const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer

class Electron {
  ipcRenderer: IpcRenderer
  constructor () {
    this.ipcRenderer = ipcRenderer
  }
}

let instance: Electron

export const ElectronService = () => {
  if (instance instanceof Electron) {
    return instance
  } else {
    instance = new Electron()
    return instance
  }
}
