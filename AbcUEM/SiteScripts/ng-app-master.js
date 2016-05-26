var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        .otherwise('/Info');
});
var MasterController = (function (_super) {
    __extends(MasterController, _super);
    function MasterController($scope, $http) {
        _super.call(this);
        this.$scope = $scope;
        this.$http = $http;
        this.setLang(Languages.Mk);
        this.getTranslate(Pages.Master, this.lang);
    }
    MasterController.prototype.setTranslate = function (lang) {
        this.getTranslate(Pages.Master, lang);
        this.setLang(lang);
    };
    MasterController.prototype.getTranslate = function (page, lang) {
        var _this = this;
        this.$http.get("/Home/Translate?page=" + page + "&lang=" + lang).then(function (response) {
            _this.masterLang = response.data;
        });
    };
    return MasterController;
})(Global);
angular.module("AbcUEM").controller("MasterController", MasterController);
