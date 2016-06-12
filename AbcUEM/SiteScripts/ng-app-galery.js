var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="global.ts" />
var SiteScript;
(function (SiteScript) {
    var Galery;
    (function (Galery) {
        var g = SiteScripts.Global;
        var GaleryController = (function (_super) {
            __extends(GaleryController, _super);
            function GaleryController($scope, $http) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.galeryPage = "Galery Page";
            }
            return GaleryController;
        })(g.Global);
        angular.module("AbcUEM").controller("GaleryController", GaleryController);
    })(Galery = SiteScript.Galery || (SiteScript.Galery = {}));
})(SiteScript || (SiteScript = {}));
