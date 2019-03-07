const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");
const dm = require('dm.dll'); 

function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({ width: 800, height: 600 })

  // 然后加载 app 的 index.html.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  
}

app.on('ready', createWindow)

// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
  //console.log(dm.dll.moveTo(0,0))
  
  
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})