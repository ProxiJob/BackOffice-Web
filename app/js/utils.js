/*
** utils.js
** Created by Gaël THOMAS - 14/04/2018
*/

/**
 * Add nb days to a date
 */
function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
}

/**
 * Format date to display
 */
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
