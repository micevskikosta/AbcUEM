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
            InfoController.prototype.editItem = function (item, section) {
                var _this = this;
                this.section = section;
                this.$http.get("/Home/GetContent?Id=" + item.Id).then(function (response) {
                    _this.content = response.data;
                    $("#addContent").modal("show");
                });
            };
            InfoController.prototype.addContent = function (section) {
                this.section = section;
                $("#addContent").modal("show");
            };
            InfoController.prototype.saveItem = function (item) {
                var _this = this;
                if (item.Id) {
                    this.$http.post("/Home/UpdateContent", { item: item }).then(function (response) {
                        if (response.data) {
                            if (_this.section == "InfoBoardDetails") {
                                _this.translateInfoBoardDetails(g.Pages.Info, _this.$scope.mc.lang, _this.section);
                            }
                            else {
                                _this.translate(g.Pages.Info, _this.$scope.mc.lang, _this.section);
                            }
                            $("#addContent").modal("hide");
                            _this.clearForm();
                        }
                    });
                }
                else {
                    item.PageId = 4;
                    item.TagId = this.section;
                    this.$http.post("/Home/AddContent", { item: item }).then(function (response) {
                        if (response.data) {
                            if (_this.section == "InfoBoardDetails") {
                                _this.translateInfoBoardDetails(g.Pages.Info, _this.$scope.mc.lang, _this.section);
                            }
                            else {
                                _this.translate(g.Pages.Info, _this.$scope.mc.lang, _this.section);
                            }
                            $("#addContent").modal("hide");
                            _this.clearForm();
                        }
                    });
                }
            };
            InfoController.prototype.clearForm = function () {
                this.content = null;
                this.section = null;
            };
            InfoController.prototype.deleteItem = function (item, element, section) {
                $('#' + element).modal('show');
                this.id = item.Id;
                this.item = item.Title + ' (' + item.Description + ')';
                this.element = element;
                this.section = section;
            };
            InfoController.prototype.confirm = function () {
                var _this = this;
                this.$http.post("/Home/DeleteContent", { Id: this.id }).then(function (response) {
                    if (response.data) {
                        if (_this.section == "InfoBoardDetails") {
                            _this.translateInfoBoardDetails(g.Pages.Info, _this.$scope.mc.lang, _this.section);
                        }
                        else {
                            _this.translate(g.Pages.Info, _this.$scope.mc.lang, _this.section);
                        }
                        $('#' + _this.element).modal('hide');
                        _this.dismiss();
                    }
                });
            };
            InfoController.prototype.dismiss = function () {
                this.id = null;
                this.item = null;
                this.element = null;
                this.section = null;
            };
            return InfoController;
        })(g.Global);
        angular.module("AbcUEM").controller("InfoController", InfoController);
    })(Info = SiteScript.Info || (SiteScript.Info = {}));
})(SiteScript || (SiteScript = {}));
