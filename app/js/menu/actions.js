/*
** actions.js
** Created by Gaël THOMAS - 14/04/2018
*/

function changeMenu(selected) {
        $j('#content').load('../views/' + selected);
}

function loadSidebar() {
        $j('#sidebar').load('../views/sidebar.html');
}

function disconnect() {
        document.location.href = "./loginView/login.html";
}

function seeAllJobs(initialInit) {
        changeMenu('../views/listingView/listMission.html');
        $j("#sidebar-elem.active").removeClass('active');
        $j(".sidebar-mission").parent().addClass('active');
        $j(".icon-sidebar").each(function() {
                $j(this).attr('src', $j(this).attr("src").replace("-active.png", ".png"));
        });
        $j(".sidebar-mission").children().attr('src', $j(".sidebar-mission").children().attr("src").replace(".png", "-active.png"));
        
        if (initialInit == undefined) {
                displayMissionDetails($j(".item-listing").attr('id'));
        } else
                displayMissionDetails(initialInit);
}