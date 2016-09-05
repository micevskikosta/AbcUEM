/// <reference path="global.ts" />

namespace SiteScripts.Master {
    import g = SiteScripts.Global;

    angular.module("AbcUEM", ["ngRoute"]);


    angular.module('AbcUEM').config(function ($routeProvider) {
        $routeProvider
            .when('/Info', {
                templateUrl: '/Home/Info'
            })
            .when('/Calendar', {
                templateUrl: '/Home/Calendar'
            })
            .when('/Galery', {
                templateUrl: '/Home/Galery'
            })
            .when('/Schools', {
                templateUrl: '/Home/Schools'
            })
            .when('/About', {
                templateUrl: '/Home/About'
            })
            .when('/Contact', {
                templateUrl: '/Home/Contact'
            })
            .when('/Login', {
                templateUrl: '/Account/Login'
            })
            .when('/RegisterUser', {
                templateUrl: '/Account/Register'
            })
            .otherwise('/Info')
    });

    //angular.module('AbcUEM').directive('file', function () {
    //    return {
    //        scope: {
    //            file: '='
    //        },
    //        link: function (scope: any, el: any, attrs: any) {
    //            el.bind('change', function (event: any) {
    //                var file = event.target.files[0];
    //                scope.file = file ? file : undefined;
    //                scope.$apply();
    //            });
    //        }
    //    };
    //});
    //    .run(function ($rootScope, $location) {
    //    $rootScope.$watch(function () {
    //        return $location.path();
    //    },function (a) {
    //        //alert('url has changed: ' + a);
    //      //  $rootScope.$broadcast('language', 4);
            
    //    });
    //});

    export class MasterController extends g.Global {
        public masterLang: any;
        constructor(public $http: ng.IHttpService, public $rootScope: ng.IRootScopeService, public RootFactory: any) {
            super();
            this.setLang(g.Languages.Mk);
            this.getTranslate(g.Pages.Master, this.lang);
        }
        public setTranslate(lang: g.Languages): void {
            this.setLang(lang);
            this.getTranslate(g.Pages.Master, lang);
        }
        public getTranslate(page: number, lang: number): void {
            this.$http.get(this.RootFactory.RootUrl() + "Home/Translate?page=" + page + "&lang=" + lang).then((response: any) => {
                this.masterLang = response.data;
            });
        }
    }
    angular.module("AbcUEM").controller("MasterController", MasterController);
}
