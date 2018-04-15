'use strict';

/**
 * Electron.JS includes
 */
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain

let mainWindow

/* DB includes */
var Parse = require('./app/js/data/dbLogin.js');
const ParseDataFile = require('./app/js/data/dataSaving.js');
const dataFile = new ParseDataFile({
	configName: 'user-preferences',
	defaults: {
	  windowConfig: { width: 1920, height: 1080 }
	}
});

//require('electron-reload')(__dirname+'/app');

/* Check if user already logged */
function isAlreadyConnect() {
	var query = new Parse.Query(User);
	var userId = dataFile.getData("userId");
	
	if (userId && userId != undefined) {
		query.equalTo("Company", userId);
		query.find({
		success: function(user) {
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
	mainWindow = new BrowserWindow({ width: 1920, height: 1080, minWidth: 1280, minHeight: 925, icon: __dirname + '/app/ressources/app-ico.ico' })

	mainWindow.setMenu(null);
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/app/views/loginView/login.html'),
		protocol: 'file:',
		slashes: true
	}))

	//mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})