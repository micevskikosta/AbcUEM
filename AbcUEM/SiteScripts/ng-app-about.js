var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="global.ts" />
var SiteScript;
(function (SiteScript) {
    var About;
    (function (About) {
        var g = SiteScripts.Global;
        var AboutController = (function (_super) {
            __extends(AboutController, _super);
            function AboutController($scope, $http, $sce) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.$sce = $sce;
                var $this = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translate(g.Pages.About, lang, "About");
                });
                $this.translate(g.Pages.About, this.$scope.mc.lang, "About");
            }
            AboutController.prototype.translate = function (page, lang, tagId) {
                var _this = this;
                this.getTranslateAsync(page, lang, tagId).then(function (response) {
                    _this.About = _this.$sce.trustAsHtml(response.data[0].Description);
                });
            };
            return AboutController;
        })(g.Global);
        About.AboutController = AboutController;
        angular.module("AbcUEM").controller("AboutController", AboutController);
    })(About = SiteScript.About || (SiteScript.About = {}));
})(SiteScript || (SiteScript = {}));
