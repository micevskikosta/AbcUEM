/// <reference path="global.ts" />
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

class MasterController extends Global {
    public masterLang: any;
    constructor(public $scope, public $http: ng.IHttpService) {
        super();
        this.setLang(Languages.Mk);
        this.getTranslate(Pages.Master, this.lang);
    }
    setTranslate(lang: Languages): void {
        this.getTranslate(Pages.Master, lang);
        this.setLang(lang);
    }
    getTranslate(page: number, lang: number): void {
        this.$http.get("/Home/Translate?page=" + page + "&lang=" + lang).then((response: any) => {
            this.masterLang = response.data;
        });
    }
}


angular.module("AbcUEM").controller("MasterController", MasterController);
