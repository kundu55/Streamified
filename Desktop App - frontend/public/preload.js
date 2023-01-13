// const { ipcRenderer } = require('electron')

// process.once('loaded', () => {
//   window.addEventListener('message', evt => {
//     if (evt.data.type === 'select-dirs') {
//       ipcRenderer.send('select-dirs')
//     }
//   })
// })

// const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('electronAPI', {
//   showDialog: () => ipcRenderer.invoke('dialog:open')
// })