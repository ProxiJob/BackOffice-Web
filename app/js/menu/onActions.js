/*
** onHover.js
** Created by Gaël THOMAS - 14/04/2018
*/

$j(".sidebar-icon").on({
        mouseenter: function () {
                if ($j(this).parent().hasClass("active") == false)
                        $j(this).children().attr('src', $j(this).children().attr("src").replace(".png", "") + '-active.png');

        },
        mouseleave: function () {           
                if ($j(this).parent().hasClass("active") == false)
                        $j(this).children().attr('src', $j(this).children().attr("src").replace("-active.png", ".png"));

        },
        mousedown: function () {
                if ($j(this).parent().hasClass("active") == false) {
                        $j("#sidebar-elem.active").removeClass('active');
                        $j(this).parent().addClass('active');
                        $j(".icon-sidebar").each(function() {
                                $j(this).attr('src', $j(this).attr("src").replace("-active.png", ".png"));
                        });
                        $j(this).children().attr('src', $j(this).children().attr("src").replace(".png", "-active.png"));
                }
        }
});
