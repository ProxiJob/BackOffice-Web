'use strict';

const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const ipc = require('electron').ipcMain

var Parse = require('./app/js/dbLogin.js');

//require('electron-reload')(__dirname+'/app');

let mainWindow

// Personnals includes
const ParseDataFile = require('./app/js/dataSaving.js');
const dataFile = new ParseDataFile({
	configName: 'user-preferences',
	defaults: {
	  windowConfig: { width: 1920, height: 1080 }
	}
});


/* Check if user already logged */
function isAlreadyConnect() {
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	var userId = dataFile.getData("userId");
	
	if (userId && userId != undefined) {
		query.equalTo("Company", userId);
		query.find({
		success: function(user) {
			console.log(dataFile.getData("companyId"));
			if (user.attributes.company.id == dataFile.getData("companyId"))
				return true;
			return false;
		},
		error: function(object, error) {
			console.log("isAlreadyConnect :" + error);
			return false;
		}
		});
	}
}

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({ width: 1920, height: 1080, minWidth: 1280, minHeight: 720, icon: __dirname + '/app/ressources/app-ico.ico' })

	mainWindow.setMenu(null);
	// and load the index.html of the app.
	//console.log(isAlreadyConnect());
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/app/views/login.html'),
		protocol: 'file:',
		slashes: true
	}))

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
