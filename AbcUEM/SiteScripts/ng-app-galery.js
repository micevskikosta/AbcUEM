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
                this.rootGalery = true;
                this.galleryHomeNav = { nameMk: "Галерија", nameFr: "Gallery" };
                var $this = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translateGallery(lang);
                });
                $this.translateGallery(this.$scope.mc.lang);
            }
            GaleryController.prototype.translateGallery = function (lang) {
                var _this = this;
                this.getTranslateGalleryAsync(lang).then(function (response) {
                    _this.galleryMaster = response.data;
                });
                if (lang == g.Languages.Mk) {
                    this.galleryHomeButton = this.galleryHomeNav.nameMk;
                }
                else {
                    this.galleryHomeButton = this.galleryHomeNav.nameFr;
                }
            };
            GaleryController.prototype.getTranslateGalleryAsync = function (lang) {
                return this.$http.get("/Home/GalleryMaster?lang=" + lang);
            };
            GaleryController.prototype.getTranslateGalleryDetailsAsync = function (masterId, lang) {
                return this.$http.get("/Home/GalleryDetails?masterId=" + masterId + "&lang=" + lang);
            };
            GaleryController.prototype.viewImage = function (img) {
                var _this = this;
                this.rootGalery = false;
                this.rootGaleryName = img.title;
                this.getTranslateGalleryDetailsAsync(img.id, this.$scope.mc.lang).then(function (response) {
                    _this.galleryDetails = response.data;
                });
            };
            GaleryController.prototype.returnToRoot = function () {
                this.rootGalery = true;
            };
            GaleryController.prototype.fullImg = function (img) {
                this.largeImgSrc = img.id;
                this.largeImgDesc = img.title;
                $("#fullSizeImg").modal("show");
            };
            return GaleryController;
        })(g.Global);
        angular.module("AbcUEM").controller("GaleryController", GaleryController);
    })(Galery = SiteScript.Galery || (SiteScript.Galery = {}));
})(SiteScript || (SiteScript = {}));
//# sourceMappingURL=ng-app-galery.js.map