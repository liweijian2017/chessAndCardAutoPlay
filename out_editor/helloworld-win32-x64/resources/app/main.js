const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");
function createWindow () {   
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