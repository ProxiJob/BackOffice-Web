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