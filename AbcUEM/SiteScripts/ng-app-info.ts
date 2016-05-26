/// <reference path="global.ts" />

class InfoController extends Global {
    private infoPage: any;
    constructor(public $scope, public $http: ng.IHttpService) {
        super();
        this.infoPage = "Info Page";
    }
}

angular.module("AbcUEM").controller("InfoController", InfoController);
