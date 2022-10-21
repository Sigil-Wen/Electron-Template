console.log(`Hello from Electron 👋`)
const path = require('path')
const { ipcMain } = require('electron')
const { desktopCapturer } = require('electron')
const { app, BrowserWindow, Menu, nativeImage } = require('electron') // app controls app's event lifecycle and browser window manages app windows
const image = nativeImage.createFromPath('img.png')
app.dock.setIcon(image);

async function lesgo() {
  return "OKAY THIS FRICKEN WORKED"
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), //_dirname is a global variable that points to the directory of the currently executing script. path.join joins multip.le paths togetheer
    },
  })
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  ipcMain.on('get-sources', async (event, sourceId) => {
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
      console.log("sources:")
      for (const source of sources) {
        console.log(source.name)
        if (source.name === 'Electron') {
          BrowserWindow.webContents.send('SET_SOURCE', source.id)
          return
        }
      }
    })
  })

  win.loadFile('index.html')
}

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () { console.log('New Window') }
  }, {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])



app.whenReady().then(() => {
  ipcMain.handle('lesgo', lesgo)
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu)
  }
  createWindow()
  app.on('activate', () => { // opens a window if none are open
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})