/// <reference path="global.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CalendarController = (function (_super) {
    __extends(CalendarController, _super);
    function CalendarController($scope, $http) {
        _super.call(this);
        this.$scope = $scope;
        this.$http = $http;
        this.calendarPage = "Calendar Page";
    }
    return CalendarController;
})(Global);
angular.module("AbcUEM").controller("CalendarController", CalendarController);
//# sourceMappingURL=ng-app-calendar.js.map