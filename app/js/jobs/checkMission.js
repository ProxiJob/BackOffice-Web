/*
** checkMission.js
** Created by Gaël THOMAS - 15/03/2018
*/

function checkInputsMission(title, start, end, cost, desc, posTop)
{
        var errorMessage = "";

        if (title == 0)
                errorMessage += " Titre incorrect. ";
        if (cost < 9.76)
                errorMessage += " Rémunération brut minimale de 9.76 euros. ";
        if (desc == 0 || desc.lenght < 25)
                errorMessage += " La description doit faire au moins 25 charactères. ";
        if (start == "Invalid Date" || end == "Invalid Date" || start > end)
                errorMessage += " Les dates sont invalides. ";
        if (!(errorMessage == ""))
                $j("#errorAlert").html("<div class='alert alert-danger' style='top: "+posTop+"px; position: relative' role='alert' style='width:303px;'>"+errorMessage+"</div>");
        return (errorMessage == "")
}
