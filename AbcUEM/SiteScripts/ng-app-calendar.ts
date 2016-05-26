/// <reference path="global.ts" />

class CalendarController extends Global {
    private calendarPage: any;
    constructor(public $scope, public $http: ng.IHttpService) {
        super();
        this.calendarPage = "Calendar Page";
    }
}

angular.module("AbcUEM").controller("CalendarController", CalendarController);
