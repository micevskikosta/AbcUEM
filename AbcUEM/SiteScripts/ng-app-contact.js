/// <reference path="global.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ContactController = (function (_super) {
    __extends(ContactController, _super);
    function ContactController($scope, $http) {
        _super.call(this);
        this.$scope = $scope;
        this.$http = $http;
        this.contactPage = "Contact page";
    }
    return ContactController;
})(Global);
angular.module("AbcUEM").controller("ContactController", ContactController);
