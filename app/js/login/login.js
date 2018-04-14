/*
** login.js
** Created by Gaël THOMAS - 05/03/2018
*/

const DataFile = require('../../js/data/dataSaving.js');
const dataFile = new DataFile({
	configName: 'user-preferences',
	defaults: {
		windowConfig: { width: 1920, height: 1080 }
	}
});

var Parse = require('../../js/data/dbLogin.js');

/* Function to connect to company dashboard */
function connect() {

	/* Get inputs informations */
	var login = document.getElementById("userName").value;
	var password = document.getElementById("userPassword").value;

	/**
	 * Parse variables
	 */
	var Company = Parse.Object.extend("Company");

	/* Parse login API */
	Parse.User.logIn(login, password, {
		success: function (user) {
			if (!user.attributes.business) {
				var errorMessage = "<div class='alert alert-danger' role='alert' style='width:303px;'>Vous n'avez la permission d'accéder à cette page (compte entreprise requis).</div>";
				$j("#errorAlert").html(errorMessage);
			} else {
				dataFile.setData("userId", user.id);
				dataFile.setData("companyId", user.attributes.company.id);
	
				var query = new Parse.Query(Company);
	
				query.equalTo("objectId", user.attributes.company.id);
				query.include("logo");
					
				query.find({
					success: function (jobs) {
						dataFile.setData("companyLogo", jobs[0].get('logo').url());
						document.location.href = "../dashboard.html";
					},
					error: function (object, error) {
						console.log("LoginError: " + error);
					}
				});
			}
		},
		error: function (user, error) {
			var errorMessage = "<div class='alert alert-danger' role='alert' style='width:303px;'>E-mail / Mot de passe invalide.</div>";

			console.log(errorMessage);
			$j("#errorAlert").html(errorMessage);
		}
	});
}