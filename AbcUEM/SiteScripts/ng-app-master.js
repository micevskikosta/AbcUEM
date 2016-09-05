/// <reference path="global.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SiteScripts;
(function (SiteScripts) {
    var Master;
    (function (Master) {
        var g = SiteScripts.Global;
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
                .otherwise('/Info');
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
        var MasterController = (function (_super) {
            __extends(MasterController, _super);
            function MasterController($http, $rootScope, RootFactory) {
                _super.call(this);
                this.$http = $http;
                this.$rootScope = $rootScope;
                this.RootFactory = RootFactory;
                this.setLang(g.Languages.Mk);
                this.getTranslate(g.Pages.Master, this.lang);
            }
            MasterController.prototype.setTranslate = function (lang) {
                this.setLang(lang);
                this.getTranslate(g.Pages.Master, lang);
            };
            MasterController.prototype.getTranslate = function (page, lang) {
                var _this = this;
                this.$http.get(this.RootFactory.RootUrl() + "Home/Translate?page=" + page + "&lang=" + lang).then(function (response) {
                    _this.masterLang = response.data;
                });
            };
            return MasterController;
        })(g.Global);
        Master.MasterController = MasterController;
        angular.module("AbcUEM").controller("MasterController", MasterController);
    })(Master = SiteScripts.Master || (SiteScripts.Master = {}));
})(SiteScripts || (SiteScripts = {}));
//# sourceMappingURL=ng-app-master.js.map