/// <reference path="global.ts" />

class GaleryController extends Global {
    private galeryPage: any;
    constructor(public $scope, public $http: ng.IHttpService) {
        super();
        this.galeryPage = "Galery Page";
    }
}

angular.module("AbcUEM").controller("GaleryController", GaleryController);
