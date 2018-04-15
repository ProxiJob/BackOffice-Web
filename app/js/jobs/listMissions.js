/*
** listMissions.js
** Created by Gaël THOMAS - 13/04/2018
*/

/**
 * Display mission with his id
 * @param {*} idMission 
 */
function displayMissionDetails(idMission) {
        getMissionById(idMission).then(function (result) {
                var job = result[0];
                var dateStart = formatDate(new Date(job.attributes.dateStart));
                var dateEnd = formatDate(new Date(job.attributes.dateEnd));

                getUserByIds(job.attributes.postule).then(function (result) {
                        var users = result;
                        var html = '<div id="view-' + job.id + '" class="view-box">';

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
                        html += '<div class="view-box-elem row" style="height: 100px;">';
                        html += '<div class="col-md-6 view-box-button">';
                        html += '<button class="button button-small blue ml-10" onClick="displayEditMissionDetails(\'' + job.id + '\');">Modifier</button>';
                        html += '</div>';
                        html += '<div class="col-md-6 view-box-button">';
                        html += '<button class="button button-small blue ml-10" onClick="deleteJob(\'' + job.id + '\', true);return false;">Supprimer</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        $j("#view-mission-box").html(html);
                });
        });
}


/**
 * Display mission with his id
 * @param {*} idMission 
 */
function displayEditMissionDetails(idMission) {
        getMissionById(idMission).then(function (result) {
                var job = result[0];
                var dateStart = Moment(new Date(job.attributes.dateStart)).format("YYYY-MM-DD");
                var dateEnd = Moment(new Date(job.attributes.dateEnd)).format("YYYY-MM-DD");
                var html = '<div id="view-' + job.id + '" class="view-box">';

                html += '<div class="view-box-elem">';
                html += '<div class="view-box-title spacing">Nom de la mission</div>';
                html += '<div class="row input input-box">';
                html += '<input id="mission_title" value="'+job.attributes.job+'" type="text" class="input_text form-content-edit w-96-p" name="input_text" />';
                html += '</div>';
                html += '</div>'

                html += '<div class="view-box-elem">';
                html += '<div class="view-box-title spacing">Descriptif de la mission</div>';
                html += '<div class="row input input-box">';
                html += '<textarea id="mission_desc" class="input_text form-content w-96-p" name="input_text" style="height: 100px;">'+job.attributes.description+'</textarea>';
                html += '</div>';
                html += '</div>'

                html += '<div class="view-box-elem">';
                html += '<div class="view-box-title spacing">Rémunération (/h)</div>';
                html += '<div class="row input input-box">';
                html += '<input id="mission_cost" type="number" step=".01" value="'+job.attributes.price+'" class="input_text form-content-edit text-center w-96-p" name="input_text" />';
                html += '</div>';
                html += '</div>'

                html += '<div class="view-box-elem row">';
                html += '<div class="col-md-6">';
                html += '<div class="view-box-title spacing">Date de début</div>';
                html += '<input id="mission_start" type="text" value="'+dateStart+'" class="calendar-start input_text form-content-edit text-center w-96-p" name="input_text" READONLY/>';       
                html += '</div>'
                html += '<div class="col-md-6">';
                html += '<div class="view-box-title spacing">Date de fin</div>';
                html += '<input id="mission_end" type="text" value="'+dateEnd +'" class="calendar-end input_text form-content-edit text-center w-96-p" name="input_text" READONLY/>';       
                html += '</div>'
                html += '</div>'
                html += '<div class="view-box-elem row" style="height: 100px;">';
                html += '<div class="col-md-6 view-box-button">';
                html += '<button class="button button-small blue ml-10" onClick="updateJob(\'' + job.id + '\');return false;">Valider</button>';
                html += '</div>';
                html += '<div class="col-md-6 view-box-button">';
                html += '<button class="button button-small blue ml-10" onClick="seeAllJobs(\'' + job.id + '\');return false;">Annuler</button>';
                html += '</div>';
                html += '</div>';
                html += '<div class="row justify-content-center" style="padding: 0px 15px 0px 15px" id="errorAlert"></div>';
                html += '</div>';
                html += '</div>';

                $j("#view-mission-box").html(html);
                
                setTimeout(function(){
                        $(".calendar-start").datepicker({
                                defaultDate: dateStart,
                                closeText: 'Fermer',
                                prevText: 'Précédent',
                                nextText: 'Suivant',
                                currentText: 'Aujourd\'hui',
                                monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                                monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
                                dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                                dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
                                dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                                weekHeader: 'Sem.',
                                dateFormat: 'yy-mm-dd'
                        });
                        $(".calendar-end").datepicker({
                                defaultDate: dateEnd,
                                closeText: 'Fermer',
                                prevText: 'Précédent',
                                nextText: 'Suivant',
                                currentText: 'Aujourd\'hui',
                                monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                                monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
                                dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                                dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
                                dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                                weekHeader: 'Sem.',
                                dateFormat: 'yy-mm-dd'
                        });

                }, 300);
        });
}