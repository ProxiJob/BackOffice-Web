/*
** addMission.js
** Created by Gaël THOMAS - 13/04/2018
*/

/**
 * Parse initialization
 */
var Parse = require('../js/dbLogin.js');

/**
 * User preferences initialization
 */
const ParseDataFile = require('../js/dataSaving.js');
const dataFile = new ParseDataFile({
        configName: 'user-preferences',
        defaults: {
                windowConfig: { width: 1920, height: 1080 }
        }
});

