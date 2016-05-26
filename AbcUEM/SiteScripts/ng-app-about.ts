/// <reference path="global.ts" />

class AboutController extends Global {
    private aboutPage: any;
    constructor(public $scope, public $http: ng.IHttpService) {
        super();
        this.aboutPage = "About page";
    }
}

angular.module("AbcUEM").controller("AboutController", AboutController);
