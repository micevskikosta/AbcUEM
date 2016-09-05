/// <reference path="global.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SiteScript;
(function (SiteScript) {
    var Schools;
    (function (Schools) {
        var g = SiteScripts.Global;
        var SchoolController = (function (_super) {
            __extends(SchoolController, _super);
            function SchoolController($scope, $http, $sce) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.$sce = $sce;
                var $this = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translate(g.Pages.Schools, lang, "SchoolsTitle");
                    $this.translate(g.Pages.Schools, lang, "SchoolsWithPictures");
                });
                $this.translate(g.Pages.Schools, this.$scope.mc.lang, "SchoolsTitle");
                $this.translate(g.Pages.Schools, this.$scope.mc.lang, "SchoolsWithPictures");
            }
            SchoolController.prototype.translate = function (page, lang, tagId) {
                var _this = this;
                this.getTranslateAsync(page, lang, tagId).then(function (response) {
                    switch (tagId) {
                        case "SchoolsTitle":
                            _this.SchoolsTitle = _this.$sce.trustAsHtml(response.data[0].Description);
                            break;
                        case "SchoolsWithPictures":
                            _this.SchoolsWithPictures = response.data;
                            break;
                    }
                });
            };
            return SchoolController;
        })(g.Global);
        Schools.SchoolController = SchoolController;
        angular.module("AbcUEM").controller("SchoolController", SchoolController);
    })(Schools = SiteScript.Schools || (SiteScript.Schools = {}));
})(SiteScript || (SiteScript = {}));
//# sourceMappingURL=ng-app-school.js.map