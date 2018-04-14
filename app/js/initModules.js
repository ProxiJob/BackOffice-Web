/*
** initModules.js
** Created by Gaël THOMAS - 14/04/2018
*/

/**
 * DataFile declaration with variable to treat user-preferences
 */
const DataFile = require('../js/data/dataSaving.js');
const dataFile = new DataFile({
        configName: 'user-preferences',
        defaults: {
                windowConfig: { width: 1920, height: 1080 }
        }
});

/**
 * Init libs
 */
var Moment = require("moment");
var Parse = require('../js/data/dbLogin.js');
var $j = require("jquery");

/**
 * Init parse objects
 */
var Jobs = Parse.Object.extend("Jobs");
var Company = Parse.Object.extend("Company");
var Users = Parse.Object.extend("User");