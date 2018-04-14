/*
** login.js
** Created by Gaël THOMAS - 05/03/2018
*/

const ParseDataFile = require('../js/dataSaving.js');
const dataFile = new ParseDataFile({
	configName: 'user-preferences',
	defaults: {
		windowConfig: { width: 1920, height: 1080 }
	}
});

var Parse = require('../js/dbLogin.js');

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
			} else {
				dataFile.setData("userId", user.id);
				dataFile.setData("companyId", user.attributes.company.id);
				
				var Company = Parse.Object.extend("Company");
				var query = new Parse.Query(Company);

				query.equalTo("objectId", user.attributes.company.id);
				query.include("logo");
				query.find({
					success: function (jobs) {
						console.log(jobs[0].get('logo').url());
						dataFile.setData("companyLogo", jobs[0].get('logo').url());
					},
					error: function (object, error) {
						console.log("LoginError: " + error);
					}
				});
				//document.location.href = "dashboard.html";
			}
		},
		error: function (user, error) {
			var errorMessage = "<div class='alert alert-danger' role='alert' style='width:303px;'>E-mail / Mot de passe invalide.</div>";

			console.log(errorMessage);
			$j("#errorAlert").html(errorMessage);
		}
	});
}