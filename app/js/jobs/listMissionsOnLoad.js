/*
** listMissionsOnLoad.js
** Created by Gaël THOMAS - 14/04/2018
*/

/**
 * Create query
 */
var innerQuery = new Parse.Query(Company);
var query = new Parse.Query(Jobs);

innerQuery.equalTo("objectId", dataFile.getData("companyId"));
query.matchesQuery('company', innerQuery);
query.include('Company');
query.include('logo');

var d = new Date();
var start = new Moment(d);

/**
 * Do query
 */
query.find({
        success: function (jobs) {
                if (jobs.length == 0) {
                        var html = '<div class="alert-title spacing">Aucune missions à afficher</div>';
                        $j("#allJobs").addClass("hidden");
                        $j("#missions-listing").append(html);
                }
                jobs.forEach(function (job) {
                        var wordAtt = (job.attributes.postule.length >= 1 ? job.attributes.postule.length : "Aucun");
                        var annStatut = (job.attributes.dateStart > start.toDate() ? "À venir" : "Archivé");

                        var html = '<div id="' + job.id + '" onclick="displayMissionDetails(\'' + job.id + '\'); return false;" class="item-listing item-listing-view relative">';
                        html += '<img class="item-listing-logo absolute" src="' + dataFile.getData("companyLogo") + '"></img>';
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

setTimeout(function(){
        if ($j("#view-mission-box").children().length == 0) {
                displayMissionDetails($j(".item-listing").attr('id'));
        }
}, 500);