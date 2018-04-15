/*
** loadJobModules.js
** Created by Gaël THOMAS - 13/04/2018
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

/**
 * Format date
 */
var d = new Date();
var start = new Moment(d);

var incoming = 0;
var total = 0;
var archive = 0;

/**
 * Do query
 */
query.find({
        success: function (jobs) {
                var i = 0;

                if (jobs.length == 0) {
                        var html = '<div class="alert-title spacing">Aucune mission à afficher</div>';
                        $j("#allJobs").addClass("hidden");
                        $j("#missions-listing").append(html);
                }
                jobs.forEach(function (job) {
                        incoming = (job.attributes.dateStart > start.toDate() ? incoming + 1 : incoming);
                        total += 1;

                        if (i < 6) {
                                var wordAtt = (job.attributes.postule.length >= 1 ? job.attributes.postule.length : "Aucun");
                                var annStatut = (job.attributes.dateStart > start.toDate() ? "À venir" : "Archivé");
                                

                                var html = '<div id="' + job.id + '" onclick="seeAllJobs(\'' + job.id + '\'); return false;" class="item-listing relative">';
                                html += '<img class="item-listing-logo absolute" src="' + dataFile.getData("companyLogo") + '"></img>';
                                html += '<div class="item-listing-infos absolute">' + wordAtt + ' candidat(s).</div>';
                                html += '<div class="item-listing-title absolute">' + job.attributes.job + '</div>';
                                html += '<div class="item-listing-statut absolute">' + annStatut + '</div>';
                                html += '</div>';
                                $j("#missions-listing").append(html);
                                i++;
                        }
                });
                                
                archive = total - incoming;
                $('#badge-incoming').text(incoming);
                $('#badge-archived').text(archive);
                $('#badge-total').text(total);

        },
        error: function (object, error) {
                console.log("getJobs :" + error);
        }
});

function displayMission(idMission) {
        getMissionById(idMission).then(function (result) {
                var job = result[0];
                var dateStart = formatDate(new Date(job.attributes.dateStart));
                var dateEnd = formatDate(new Date(job.attributes.dateEnd));
                var html = '<div class="view-box">';
                html += '<div>Nom de la mission</div>';
                html += '<div>' + job.attributes.job + '</div>';
                html += '<div>Descriptif de la mission</div>';
                html += '<div>' + job.attributes.description + '</div>';
                html += '<div>Rémunération (/h)</div>';
                html += '<div>' + job.attributes.price + ' euros</div>';
                html += '<div>Date de début</div>';
                html += '<div>' + dateStart + '</div>';
                html += '<div>Date de fin</div>';
                html += '<div>' + dateEnd + '</div>';
                html += '</div>';
                $j("#view-mission-box").html(html);
        });
}