/*
** addMission.js
** Created by Gaël THOMAS - 13/04/2018
*/

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
