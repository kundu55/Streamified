const axios = require('axios');
const path = require('path');
let ip = require('ip')


const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

ipcMain.handle('get-folder', async (event, ...args) => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  return result
})

ipcMain.handle('get-ip',(event, ...args) => {
  // const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  return ip.address()
})


// require('@electron/remote/main').initialize()
let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});




