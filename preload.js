// 可选：安全加载 ipcRenderer
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onNotifyData: (callback) => ipcRenderer.on('notify-data', (event, data) => callback(data)),
  sendClick: (label) => ipcRenderer.send('notify-click', label)
});
