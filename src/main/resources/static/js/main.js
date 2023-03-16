
var Dashboard = function () {
    var global = {
        tooltipOptions: {
            placement: "right"
        },
        menuClass: ".c-menu"
    };

    var menuChangeActive = function menuChangeActive(el) {
        var hasSubmenu = $(el).hasClass("has-submenu");
        $(global.menuClass + " .is-active").removeClass("is-active");
        $(el).addClass("is-active");
    };

    var sidebarChangeWidth = function sidebarChangeWidth() {
        var $menuItemsTitle = $("li .menu-item__title");

        $("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
        $(".hamburger-toggle").toggleClass("is-opened");

        if ($("body").hasClass("sidebar-is-expanded")) {
            $('[data-toggle="tooltip"]').tooltip("destroy");
        } else {
            $('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
        }
    };

    $("#logo-vanhoa").text("TIÊU ĐỒ");
    $(".js-hamburger").click(function() {
        if(!$(".hamburger-toggle").hasClass("is-opened")){
            $("#logo-vanhoa").text("TĐ");
        } else{
            $("#logo-vanhoa").text("TIÊU ĐỒ");
        }
    });

    $(".header-icons-group").click(function() {
        $("#notify-number").hide();
    });


    return {
        init: function init() {
            $(".js-hamburger").on("click", sidebarChangeWidth);

            $(".js-menu li").on("click", function (e) {
                menuChangeActive(e.currentTarget);
            });

            $('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
        }
    };
}();

Dashboard.init();

$( document ).ready(function() {
    var pathname = window.location.pathname;
    var res = pathname.split("/");
    var link = "/" + res[1] + "/" + res[2];
    if (link == '/api/home'){
        $('ul.u-list a:nth-child(1) li').addClass('is-active');
    }
    if (link == '/api/tactic'){
            $('ul.u-list a:nth-child(2) li').addClass('is-active');
        }
    if (link == '/api/interShip'){
        $('ul.u-list a:nth-child(3) li').addClass('is-active');
    }
    if (link == '/api/config'){
        $('ul.u-list a:nth-child(4) li').addClass('is-active');
    }
});

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  if ($('#txt').length){
     document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
  }

  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
