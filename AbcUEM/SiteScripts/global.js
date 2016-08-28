/// <reference path="_references.ts" />
var SiteScripts;
(function (SiteScripts) {
    var Global;
    (function (Global_1) {
        (function (Languages) {
            Languages[Languages["Mk"] = 0] = "Mk";
            Languages[Languages["Fr"] = 1] = "Fr";
        })(Global_1.Languages || (Global_1.Languages = {}));
        var Languages = Global_1.Languages;
        (function (Pages) {
            Pages[Pages["Master"] = 1] = "Master";
            Pages[Pages["Schools"] = 2] = "Schools";
            Pages[Pages["About"] = 3] = "About";
            Pages[Pages["Info"] = 4] = "Info";
        })(Global_1.Pages || (Global_1.Pages = {}));
        var Pages = Global_1.Pages;
        var Global = (function () {
            function Global() {
            }
            Global.prototype.setLang = function (lang) {
                this.lang = lang;
                this.$rootScope.$broadcast('language', this.lang);
            };
            Global.prototype.getTranslateAsync = function (page, lang, tagId) {
                return this.$http.get("/Home/Translate?page=" + page + "&lang=" + lang + "&tagId=" + tagId);
            };
            return Global;
        })();
        Global_1.Global = Global;
    })(Global = SiteScripts.Global || (SiteScripts.Global = {}));
})(SiteScripts || (SiteScripts = {}));
$(window).load(function () {
    //Toggle class on page load
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/#/") + 1);
    $(".nav-bar-buttons a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '' || $(this).attr("href") == '#' + pgurl.split('#')[1])
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
//# sourceMappingURL=global.js.map