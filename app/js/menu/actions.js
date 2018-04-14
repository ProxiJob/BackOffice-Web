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