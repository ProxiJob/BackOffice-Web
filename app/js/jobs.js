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
query.include('logo');

var moment = require("moment");

var d = new Date();
var start = new moment(d);

//query.greaterThanOrEqualTo('dateStart', start.toDate());

query.find({
        success: function (jobs) {
                jobs.forEach(function(job) {
                                var wordAtt = (job.attributes.postule.length >= 1 ? job.attributes.postule.length : "Aucun");
                                var annStatut = (job.attributes.dateStart > start.toDate() ? "À venir" : "Archivé");

                                var html = '<div id="'+ job.id +'" onclick="displayMission(\''+ job.id +'\'); return false;" class="item-listing relative">';
                                html += '<img class="item-listing-logo absolute" src="'+ dataFile.getData("companyLogo") +'"></img>';
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

function getMissionById(idMission) {
        var Jobs = Parse.Object.extend("Jobs");
        var query = new Parse.Query(Jobs);

        query.equalTo('objectId', idMission);
        query.include('logo');
        var promise = query.find({
                success: function (job) {
                        return job;
                },
                error: function (object, error) {
                        console.log("getJobs :" + error);
                        return undefined;
                }
        });
        return promise;
}


function formatDate(date) {
        var monthNames = [
          "Janvier", "Fébrirer", "Mars",
          "Avril", "Mai", "Juin", "Juillet",
          "Août", "Septembre", "Octobre",
          "Novembre", "Décembre"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      }

function displayMission(idMission) {
        getMissionById(idMission).then(function(result) {
                var job = result[0];
                var dateStart = formatDate(new Date(job.attributes.dateStart));
                var dateEnd = formatDate(new Date(job.attributes.dateEnd));
                
                
                var html = '<div class="view-box">';
                html += '<div>Nom de la mission</div>';
                
                html += '<div>'+ job.attributes.job +'</div>';
                
                html += '<div>Descriptif de la mission</div>';
                
                html += '<div>'+ job.attributes.description +'</div>';

                
                html += '<div>Rémunération (/h)</div>';
                
                html += '<div>'+ job.attributes.price +' euros</div>';

                html += '<div>Date de début</div>';
                
                html += '<div>'+ dateStart +'</div>';

                html += '<div>Date de fin</div>';
                
                html += '<div>'+ dateEnd +'</div>';
                
                html += '</div>';
               
                $j("#view-mission-box").html(html);
        });
}