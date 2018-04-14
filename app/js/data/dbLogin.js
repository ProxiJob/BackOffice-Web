/**
 * Parse initialization
 */

var Parse = require('parse');

Parse.initialize("proxiID");
Parse.serverURL = 'https://proxijob.herokuapp.com/parse'

module.exports = Parse;