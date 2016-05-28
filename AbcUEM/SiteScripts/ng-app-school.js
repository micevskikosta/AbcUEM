/// <reference path="global.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SchoolController = (function (_super) {
    __extends(SchoolController, _super);
    function SchoolController($scope, $http) {
        _super.call(this);
        this.$scope = $scope;
        this.$http = $http;
        this.schoolPage = "School Page";
    }
    return SchoolController;
})(Global);
angular.module("AbcUEM").controller("SchoolController", SchoolController);
//# sourceMappingURL=ng-app-school.js.map