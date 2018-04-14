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

var Moment = require("moment");

function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

/* Function to add mission in database */
function addMission() {

	/* Get inputs informations */
	var title = document.getElementById("mission_title").value;
	var start = addDays(new Date(document.getElementById("mission_start").value), 1);
        var end = addDays(new Date(document.getElementById("mission_end").value), 1);
        var cost = document.getElementById("mission_cost").value;
        var desc = document.getElementById("mission_desc").value;
        
        /* Format date */ 
        var startDate = new Moment(start);
        var endDate = new Moment(end);

        var Company = Parse.Object.extend("Company");
                       
var query = new Parse.Query(Company);

query.equalTo("objectId", dataFile.getData("companyId"));


query.find({
        success: function (company) {
                var Jobs = Parse.Object.extend("Jobs");
                var jobs = new Jobs();
                
                jobs.set("job", title);
                jobs.set("dateStart", startDate.toDate());
                jobs.set("postule", []);
                jobs.set("dateEnd", endDate.toDate());
                jobs.set("price", cost);
                jobs.set("description", desc);
                jobs.set("company", company[0]);
                
                
                jobs.save(null, {
                  success: function(gameScore) {
                     console.log('New object created with objectId: ' + gameScore.id);
                  },
                  error: function(gameScore, error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                  }
                });             
                
        },
        error: function (object, error) {
                console.log("getJobs :" + error);
                jobsList = undefined;
        }
});
}
