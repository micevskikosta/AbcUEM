/// <reference path="_references.ts" />

declare var rootUrl: any;

namespace SiteScripts.Global {
    export enum Languages { Mk, Fr }
    export enum Pages { Master = 1, Schools = 2, About = 3, Info = 4 }

    export class Global {
        public lang: Languages;
        public $http: ng.IHttpService;
        public $rootScope: ng.IRootScopeService;
        public setLang(lang: Languages) {
            this.lang = lang;
            this.$rootScope.$broadcast('language', this.lang);
        }
        public getTranslateAsync(page: number, lang: number, tagId: string): angular.IPromise<any> {
            return this.$http.get(rootUrl + "Home/Translate?page=" + page + "&lang=" + lang + "&tagId=" + tagId);
        }
    }
}



$(window).load(function () {
    //Toggle class on page load
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/#/") + 1);
    $(".nav-bar-buttons a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '' || $(this).attr("href") == '#' + pgurl.split('#')[1])
            $(this).addClass("active");

        $(".nav-bar-buttons a").click(function (event) {
            $(".nav-bar-buttons a").removeClass("active");
        });
    })

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
