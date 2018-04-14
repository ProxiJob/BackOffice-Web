const electron = require('electron');
const path = require('path');
const fs = require('fs');

function getDataToParse(filePath, defaults) {
        try {
          console.log(filePath);
          return JSON.parse(fs.readFileSync(filePath));
        } catch(error) {
          return defaults;
        }
}

class ParseDataFile {
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

module.exports = ParseDataFile;