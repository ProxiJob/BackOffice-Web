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
                var i = 0;
                var activeId = 0;
                jobs.forEach(function (job) {
                        var wordAtt = (job.attributes.postule.length >= 1 ? job.attributes.postule.length : "Aucun");
                        var annStatut = (job.attributes.dateStart > start.toDate() ? "À venir" : "Archivé");

                        if (i == 0)
                                activeId = job.id;
                        var html = '<div id="' + job.id + '" onclick="displayMission(\'' + job.id + '\'); return false;" class="item-listing item-listing-view relative">';
                        html += '<img class="item-listing-logo absolute" src="' + dataFile.getData("companyLogo") + '"></img>';
                        html += '<div class="item-listing-infos absolute">' + wordAtt + ' candidat(s).</div>';
                        html += '<div class="item-listing-title absolute">' + job.attributes.job + '</div>';
                        html += '<div class="item-listing-statut absolute">' + annStatut + '</div>';
                        html += '</div>';
                        $j("#missions-listing").append(html);
                        i++;
                });
                if (activeId != 0)
                        displayMission(activeId);

        },
        error: function (object, error) {
                console.log("getJobs :" + error);
        }
});