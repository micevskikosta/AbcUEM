var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="global.ts" />
var SiteScript;
(function (SiteScript) {
    var Info;
    (function (Info) {
        var g = SiteScripts.Global;
        var InfoController = (function (_super) {
            __extends(InfoController, _super);
            function InfoController($scope, $http, $sce) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.$sce = $sce;
                var $this = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translate(g.Pages.Info, lang, "InfoBoard");
                });
                $this.translate(g.Pages.Info, this.$scope.mc.lang, "InfoBoard");
            }
            InfoController.prototype.translate = function (page, lang, tagId) {
                var _this = this;
                this.getTranslateAsync(page, lang, tagId).then(function (response) {
                    _this.InfoArray = response.data;
                });
            };
            return InfoController;
        })(g.Global);
        angular.module("AbcUEM").controller("InfoController", InfoController);
    })(Info = SiteScript.Info || (SiteScript.Info = {}));
})(SiteScript || (SiteScript = {}));
