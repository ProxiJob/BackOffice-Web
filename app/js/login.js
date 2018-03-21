/*
** login.js
** Created by Gaël THOMAS - 05/03/2018
*/

var Parse = require('parse');

Parse.initialize("proxiID");
Parse.serverURL = 'https://proxijob.herokuapp.com/parse'

/* Function to connect to company dashboard */
function connect() {

	/* Get inputs informations */
	var login = document.getElementById("userName").value;
	var password = document.getElementById("userPassword").value;

	/* Parse login API */
	Parse.User.logIn(login, password, {
		success: function (user) {
			if (!user.attributes.business) {
				var errorMessage = "<div class='alert alert-danger' role='alert' style='width:303px;'>Vous n'avez la permission d'accéder à cette page (compte entreprise requis).</div>";
				$j("#errorAlert").html(errorMessage);
			} else
				document.location.href = "dashboard.html";
		},
		error: function (user, error) {
			
			var errorMessage = "<div class='alert alert-danger' role='alert' style='width:303px;'>E-mail / Mot de passe invalide.</div>";
			$j("#errorAlert").html(errorMessage);
		}
	});
}
