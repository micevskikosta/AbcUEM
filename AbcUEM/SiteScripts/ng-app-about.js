/// <reference path="global.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AboutController = (function (_super) {
    __extends(AboutController, _super);
    function AboutController($scope, $http) {
        _super.call(this);
        this.$scope = $scope;
        this.$http = $http;
        this.aboutPage = "About page";
    }
    return AboutController;
})(Global);
angular.module("AbcUEM").controller("AboutController", AboutController);
