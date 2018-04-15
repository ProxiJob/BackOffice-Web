/*
** dbQueries.js
** Created by Gaël THOMAS - 14/04/2018
*/

/**
 * Get mission by id
 * @param {int} idMission 
 */
function getMissionById(idMission) {
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

/**
 * Get users by ids (array)
 * @param {array} idsUser 
 */
function getUserByIds(idsUser) {
        var query = new Parse.Query(Users);

        query.containedIn('objectId', idsUser);
        query.include('profilPicture');
        var promise = query.find({
                success: function (users) {
                        return users;
                },
                error: function (object, error) {
                        console.log("getUserByIds :" + error);
                        return undefined;
                }
        });
        return promise;
}

/**
 * Delete a job by his id
 * @param {int} idJob 
 */
function deleteJob(idJob, reload) {
        if (confirm("Voulez vous vraiment supprimer cette mission.")) {
                getMissionById(idJob).then(function (result) {
                        result[0].destroy({
                                success: function (job) {
                                        console.log("Object " + job.id + "deleted.");
                                },
                                error: function (job, error) {
                                        console.log("deleteJob: " + error.message);
                                }
                        });
                });
                if (reload) {
                        setTimeout(function () {
                                seeAllJobs(undefined);
                        }, 500);
                }
        }
}


/* Function to add mission in database */
function addMission() {

        /* Get inputs informations */
        var title = document.getElementById("mission_title").value;
        var start = new Date(document.getElementById("mission_start").value);
        var end = new Date(document.getElementById("mission_end").value);
        var cost = document.getElementById("mission_cost").value;
        var desc = document.getElementById("mission_desc").value;

        /* Format date */
        var startDate = new Moment(start);
        var endDate = new Moment(end);

        /* Make query */
        var query = new Parse.Query(Company);
        query.equalTo("objectId", dataFile.getData("companyId"));
        query.find({
                success: function (company) {
                        var jobs = new Jobs();

                        jobs.set("job", title);
                        jobs.set("dateStart", startDate.toDate());
                        jobs.set("postule", []);
                        jobs.set("dateEnd", endDate.toDate());
                        jobs.set("price", cost);
                        jobs.set("description", desc);
                        jobs.set("company", company[0]);
                        jobs.save(null, {
                                success: function (gameScore) {
                                        console.log('New object created with objectId: ' + gameScore.id);
                                        seeAllJobs(gameScore.id);
                                },
                                error: function (gameScore, error) {
                                        console.log('Failed to create new object, with error code: ' + error.message);
                                }
                        });

                },
                error: function (object, error) {
                        console.log("addMission :" + error.message);
                        jobsList = undefined;
                }
        });
}

/**
 * Update a job by id
 * @param {int} idJob 
 */

function updateJob(idJob) {
        getMissionById(idJob).then(function (result) {
                /* Get inputs informations */
                var title = document.getElementById("mission_title").value;
                var start = new Date(document.getElementById("mission_start").value);
                var end = new Date(document.getElementById("mission_end").value);
                var cost = document.getElementById("mission_cost").value;
                var desc = document.getElementById("mission_desc").value;

                /* Format date */
                var startDate = new Moment(start);
                var endDate = new Moment(end);

                /* Update job */
                var job = result[0];

                job.set("job", title);
                job.set("dateStart", startDate.toDate());
                job.set("dateEnd", endDate.toDate());
                job.set("price", cost);
                job.set("description", desc);
                job.save(null, {
                        success: function (job) {
                                seeAllJobs(job.id);
                        },
                        error: function (job, error) {
                                alert('Failed to update object, with error code: ' + error.message);
                        }
                });
        });
}