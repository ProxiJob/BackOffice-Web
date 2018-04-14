/*
** jobs.js
** Created by Gaël THOMAS - 13/04/2018
*/

/**
 * Display mission with his id
 * @param {*} idMission 
 */
function displayMission(idMission) {
        getMissionById(idMission).then(function (result) {
                var job = result[0];
                var dateStart = formatDate(new Date(job.attributes.dateStart));
                var dateEnd = formatDate(new Date(job.attributes.dateEnd));

                getUserByIds(job.attributes.postule).then(function (result) {
                        var users = result;
                        var html = '<div class="view-box">';

                        html += '<div class="view-box-elem row">';
                        html += '<div class="col-md-12">';
                        html += '<div class="view-box-title">Candidats</div>';

                        if (users.length == 0)
                                html += '<div class="view-box-text">Aucun candidats n\'a postulé à votre annonce.</div>';
                        var i = 0;
                        users.forEach(function (user) {
                                if (i++ < 4) {
                                        var pic = user.get("profilPicture");
                                        var firstName = user.attributes.firstName.charAt(0).toUpperCase() + user.attributes.firstName.slice(1).toLowerCase();
                                        var lastName = user.attributes.lastName.toUpperCase().charAt(0);

                                        if (pic == undefined)
                                                pic = "../ressources/default-avatar.png";
                                        else
                                                pic = pic.url();
                                        html += '<div class="view-box-picbox ' + (i == 2 ? "display-none-if" : "") + '">';
                                        html += '<figure><img with="100" height="100" src="' + pic + '" />';
                                        html += '<figcaption class="view-box-picbox-text text-center">' + firstName + ' ' + lastName + '.</figcaption></figure>';
                                        html += '</div>'
                                } else {
                                        html += '<div class="view-box-picbox">';
                                        html += '<figure><img with="100" height="100" src="../ressources/more.png" />';
                                        html += '<figcaption class="view-box-picbox-text text-center">Voir plus</figcaption></figure>';
                                        html += '</div>'
                                }

                        });
                        html += '</div>';
                        html += '</div>'
                        html += '<div class="view-box-elem">';
                        html += '<div class="view-box-title">Nom de la mission</div>';
                        html += '<div class="view-box-text">' + job.attributes.job + '</div>';
                        html += '</div>'
                        html += '<div class="view-box-elem">';
                        html += '<div class="view-box-title">Descriptif de la mission</div>';
                        html += '<div class="view-box-text">' + job.attributes.description + '</div>';
                        html += '</div>'
                        html += '<div class="view-box-elem">';
                        html += '<div class="view-box-title">Rémunération (/h)</div>';
                        html += '<div class="view-box-text">' + job.attributes.price + ' euros</div>';
                        html += '</div>'
                        html += '<div class="view-box-elem row">';
                        html += '<div class="col-md-6">';
                        html += '<div class="view-box-title">Date de début</div>';
                        html += '<div class="view-box-text">' + dateStart + '</div>';
                        html += '</div>'
                        html += '<div class="col-md-6">';
                        html += '<div class="view-box-title">Date de fin</div>';
                        html += '<div class="view-box-text">' + dateEnd + '</div>';
                        html += '</div>'
                        html += '</div>'
                        html += '</div>';
                        $j("#view-mission-box").html(html);
                });
        });
}