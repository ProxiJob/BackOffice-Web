var Electron = require('electron');
var Parse = require('parse');

Parse.initialize("proxiID");
Parse.serverURL = 'https://proxijob.herokuapp.com/parse'

function getInfos() {

	var login = document.getElementById("userName").value;
	var password = document.getElementById("userPassword").value;


	Parse.User.logIn(login, password, {
		success: function (user) {
			document.location.href = "test.html";
		},
		error: function (user, error) {
			console.log("BAD");
		}
	});
}
