/// <reference path="global.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InfoController = (function (_super) {
    __extends(InfoController, _super);
    function InfoController($scope, $http) {
        _super.call(this);
        this.$scope = $scope;
        this.$http = $http;
        this.infoPage = "Info Page";
    }
    return InfoController;
})(Global);
angular.module("AbcUEM").controller("InfoController", InfoController);
