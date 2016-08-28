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
        var Content = (function () {
            function Content() {
            }
            return Content;
        })();
        var InfoController = (function (_super) {
            __extends(InfoController, _super);
            function InfoController($scope, $http, $sce) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.$sce = $sce;
                this.content = new Content();
                var $this = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translate(g.Pages.Info, lang, "InfoBoard");
                    $this.translateInfoBoardDetails(g.Pages.Info, lang, "InfoBoardDetails");
                });
                $this.translate(g.Pages.Info, this.$scope.mc.lang, "InfoBoard");
                $this.translateInfoBoardDetails(g.Pages.Info, this.$scope.mc.lang, "InfoBoardDetails");
            }
            InfoController.prototype.translate = function (page, lang, tagId) {
                var _this = this;
                this.getTranslateAsync(page, lang, tagId).then(function (response) {
                    _this.InfoArray = response.data;
                });
            };
            InfoController.prototype.translateInfoBoardDetails = function (page, lang, tagId) {
                var _this = this;
                this.getTranslateAsync(page, lang, tagId).then(function (response) {
                    _this.InfoBoardArray = response.data;
                });
            };
            InfoController.prototype.editLeftItem = function (item) {
                var _this = this;
                this.$http.get("/Home/GetContent?Id=" + item.Id).then(function (response) {
                    _this.content = response.data;
                    $("#addLeftContent").modal("show");
                });
            };
            InfoController.prototype.saveLeftItem = function (item) {
                var _this = this;
                if (item.Id) {
                    this.$http.post("/Home/UpdateContent", { item: item }).then(function (response) {
                        if (response.data) {
                            _this.translate(g.Pages.Info, _this.$scope.mc.lang, "InfoBoard");
                            $("#addLeftContent").modal("hide");
                        }
                    });
                }
                else {
                    item.PageId = 4;
                    item.TagId = "InfoBoard";
                    this.$http.post("/Home/AddContent", { item: item }).then(function (response) {
                        if (response.data) {
                            _this.translate(g.Pages.Info, _this.$scope.mc.lang, "InfoBoard");
                            $("#addLeftContent").modal("hide");
                        }
                    });
                }
            };
            InfoController.prototype.clearForm = function () {
                this.content = null;
            };
            return InfoController;
        })(g.Global);
        angular.module("AbcUEM").controller("InfoController", InfoController);
    })(Info = SiteScript.Info || (SiteScript.Info = {}));
})(SiteScript || (SiteScript = {}));
//# sourceMappingURL=ng-app-info.js.map