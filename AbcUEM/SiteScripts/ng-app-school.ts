/// <reference path="global.ts" />

class SchoolController extends Global {
    private schoolPage: any;
    constructor(public $scope, public $http: ng.IHttpService) {
        super();
        this.schoolPage = "School Page";
    }
}

angular.module("AbcUEM").controller("SchoolController", SchoolController);
