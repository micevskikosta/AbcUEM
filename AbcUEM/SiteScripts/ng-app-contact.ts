/// <reference path="global.ts" />

class ContactController extends Global {
    private contactPage: any;
    constructor(public $scope, public $http: ng.IHttpService) {
        super();  
        this.contactPage = "Contact page";
    }   
}

angular.module("AbcUEM").controller("ContactController", ContactController);
