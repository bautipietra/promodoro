const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        icon: 'sources/promodoro.ico',
        width: 200,
        height: 200,
        transparent: true,
        alwaysOnTop: true,
        frame: false,
        resizable: false,
        center: true
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})