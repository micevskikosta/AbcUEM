var Languages;
(function (Languages) {
    Languages[Languages["Mk"] = 0] = "Mk";
    Languages[Languages["Fr"] = 1] = "Fr";
})(Languages || (Languages = {}));
var Pages;
(function (Pages) {
    Pages[Pages["Master"] = 1] = "Master";
})(Pages || (Pages = {}));
var Global = (function () {
    function Global() {
    }
    Global.prototype.setLang = function (lang) {
        this.lang = lang;
    };
    return Global;
})();
$(window).load(function () {
    //Toggle class on page load
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/#/") + 1);
    $(".nav-bar-buttons a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
            $(this).addClass("active");
        $(".nav-bar-buttons a").click(function (event) {
            $(".nav-bar-buttons a").removeClass("active");
        });
    });
    //Toggle class on click
    $(".nav-bar-buttons a").click(function (event) {
        var self = $(this)[0];
        $(".nav-bar-buttons a").each(function (index) {
            if (self == $(this)[0])
                $(self).addClass("active");
            else
                $(this).removeClass("active");
        });
    });
});
