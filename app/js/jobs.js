/*
** jobs.js
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

var jobsList;
var Jobs = Parse.Object.extend("Jobs");
var Company = Parse.Object.extend("Company");
var innerQuery = new Parse.Query(Company);
var query = new Parse.Query(Jobs);

innerQuery.equalTo("objectId", dataFile.getData("companyId"));

query.matchesQuery('company', innerQuery);
query.include('Company');

var moment = require("moment");

var d = new Date();
var start = new moment(d);

//query.greaterThanOrEqualTo('dateStart', start.toDate());


query.find({
        success: function (jobs) {
                console.log(jobs);
                jobs.forEach(function(job) {
                        var wordAtt = (job.attributes.dateStart > start.toDate() ? "ont" : "avaient");
                        var annStatut = (job.attributes.dateStart > start.toDate() ? "À venir" : "Archivé");

                        var html = '<div class="item-listing relative">';
                        html += '<img class="item-listing-logo absolute" src="'+ dataFile.getData("companyLogo") +'"></img>';
                        html += '<div class="item-listing-infos absolute">' + job.attributes.postule.length + ' personne(s) ' + wordAtt + ' postulé à votre annonce.</div>';
                        html += '<div class="item-listing-title absolute">' + job.attributes.job + '</div>';
                        html += '<div class="item-listing-statut absolute">' + annStatut + '</div>';
                        html += '</div>';
                        $j("#missions-listing").append(html);
                });
                
        },
        error: function (object, error) {
                console.log("getJobs :" + error);
                jobsList = undefined;
        }
});

function changeMenuMissions() {
$j.ajax({
        type: "POST",
        url: "../actions.php",
        data: {
             jobsList: jobsList
        },
        success: function (data) {
            alert(data);
    
        }
    });
}