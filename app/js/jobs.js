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

console.log("Start Job");

query.find({
        success: function (jobs) {
                jobs.forEach(function(job) {
                                var wordAtt = (job.attributes.postule.length >= 1 ? job.attributes.postule.length : "Aucun");
                                var annStatut = (job.attributes.dateStart > start.toDate() ? "À venir" : "Archivé");

                                //console.log("Logo: " + job.attributes.company.get("logo").url());
                                var html = '<div id="'+ job.id +'" onclick="displayMission(\''+ job.id +'\'); return false;" class="item-listing relative">';
                               // html += '<img class="item-listing-logo absolute" src="'+ job.attributes.company.get("logo").url() +'"></img>';
                                html += '<div class="item-listing-infos absolute">' + wordAtt + ' candidat(s).</div>';
                                html += '<div class="item-listing-title absolute">' + job.attributes.job + '</div>';
                                html += '<div class="item-listing-statut absolute">' + annStatut + '</div>';
                                html += '</div>';
                                $j("#missions-listing").append(html);
                        
                });
                
        },
        error: function (object, error) {
                console.log("getJobs :" + error);
        }
});


function displayMission(idMission) {
        console.log(idMission);
        var html = '<div id="">' + idMission + '</div>';
        $j("#missions-content").html(html);
}