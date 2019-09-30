// |v|--------------------|v|
// |v| app initialisation |v|
const { app, BrowserWindow} = require('electron');
var WifiControl = require('wifi-control')
let win;
function createWindow(){
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile("index.html")
  win.on('closed', () => {
    win = null
  })
};
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){
    app.quit()
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
/*
   |+| app initialisation |+|
   |+|--------------------|+|
   |-|--------------------|-|
   |-|   rest of the app  |-|
*/
function GetWirelessDevices(){
  WifiControl.init({
    debug: true
  })
  WifiControl.scanForWifi(function(err, response){
    if(err) console.log(err)
    console.log(response)
  })
}
