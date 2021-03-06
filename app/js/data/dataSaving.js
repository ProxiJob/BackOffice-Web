/*
** dataSaving.js
** Created by Gaël THOMAS - 13/04/2018
*/

const electron = require('electron');
const path = require('path');
const fs = require('fs');

/**
 * Get user-preferences JSON
 * @param {*} filePath 
 * @param {*} defaults 
 */
function getDataToParse(filePath, defaults) {
	try {
		return JSON.parse(fs.readFileSync(filePath));
	} catch (error) {
		return defaults;
	}
}

/**
 * Class DataFile with user-preferences JSON informations
 */
class DataFile {
	constructor(opts) {
		const userDataPath = (electron.app || electron.remote.app).getPath('userData');
		this.path = path.join(userDataPath, opts.configName + '.json');
		this.data = getDataToParse(this.path, opts.defaults);
	}

	getData(key) {
		return this.data[key];
	}

	setData(key, val) {
		this.data[key] = val;
		fs.writeFileSync(this.path, JSON.stringify(this.data));
	}
}

module.exports = DataFile;