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
        var Content = (function () {
            function Content() {
            }
            return Content;
        })();
        var GaleryController = (function (_super) {
            __extends(GaleryController, _super);
            function GaleryController($scope, $http, RootFactory) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.RootFactory = RootFactory;
                this.rootGalery = true;
                this.galleryHomeNav = { nameMk: "Галерија", nameFr: "Gallery" };
                this.content = new Content();
                var $this = this;
                $privateScope = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translateGallery(lang);
                });
                $this.translateGallery(this.$scope.mc.lang);
                this.initJquery();
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
                return this.$http.get(this.RootFactory.RootUrl() + "Home/GalleryMaster?lang=" + lang);
            };
            GaleryController.prototype.getTranslateGalleryDetailsAsync = function (masterId, lang) {
                return this.$http.get(this.RootFactory.RootUrl() + "Home/GalleryDetails?masterId=" + masterId + "&lang=" + lang);
            };
            GaleryController.prototype.viewImage = function (img) {
                var _this = this;
                this.rootGalery = false;
                this.rootGaleryName = img.title;
                this.imgId = img.id;
                debugger;
                this.getTranslateGalleryDetailsAsync(img.id, this.$scope.mc.lang).then(function (response) {
                    _this.galleryDetails = response.data;
                });
            };
            GaleryController.prototype.viewImages = function (id) {
                var _this = this;
                debugger;
                this.getTranslateGalleryDetailsAsync(id, this.$scope.mc.lang).then(function (response) {
                    debugger;
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
            GaleryController.prototype.addGalery = function () {
                $("#galeryModal").modal("show");
            };
            GaleryController.prototype.saveItem = function () {
                if ($('#uploadFile').valid()) {
                    var formData = new FormData($('#uploadFile')[0]);
                    $.ajax({
                        url: $privateScope.RootFactory.RootUrl() + 'Home/SaveGaleryImage',
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            $("#galeryModal").modal("hide");
                            $('#uploadFile')[0].reset();
                            $privateScope.translateGallery($privateScope.$scope.mc.lang);
                        },
                        failure: function (response) {
                            alert("Сите полиња се задолжителни");
                        }
                    });
                }
            };
            GaleryController.prototype.initJquery = function () {
                $("#galeryModal").on("hidden.bs.modal", function () {
                    $(this).find('form')[0].reset();
                });
            };
            GaleryController.prototype.updateGalery = function (item) {
                this.Id = item.id;
                $("#TitleMk").val(item.TitleMk);
                $("#TitleFr").val(item.TitleFr);
                $("#updateGaleryModal").modal("show");
            };
            GaleryController.prototype.updateItem = function () {
                if ($('#updateUploadFile').valid()) {
                    var formData = new FormData($('#updateUploadFile')[0]);
                    formData.append("Id", this.Id);
                    $.ajax({
                        url: $privateScope.RootFactory.RootUrl() + 'Home/UpdateGaleryImage',
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            window.location.reload(true);
                        },
                        failure: function (response) {
                            alert("Сите полиња се задолжителни");
                        }
                    });
                }
            };
            GaleryController.prototype.deleteGalery = function () {
                var c = confirm("Дали сте сигурни за бришење на галеријата (ќе бидат избришани и сите слики што припаѓаат на оваа галерија");
                if (c) {
                    var formData = new FormData();
                    formData.append("Id", this.Id);
                    $.ajax({
                        url: $privateScope.RootFactory.RootUrl() + 'Home/DeleteGalery',
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            $("#updateGaleryModal").modal("hide");
                            $privateScope.translateGallery($privateScope.$scope.mc.lang);
                        },
                        failure: function (response) {
                            alert("Грешка !");
                        }
                    });
                }
            };
            GaleryController.prototype.addImages = function () {
                $("#imageModal").modal("show");
            };
            GaleryController.prototype.saveImages = function () {
                if ($('#uploadImageFile').valid()) {
                    var formData = new FormData($('#uploadImageFile')[0]);
                    formData.append("GalleryMasterId", this.imgId);
                    $.ajax({
                        url: $privateScope.RootFactory.RootUrl() + 'Home/SaveImages',
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            $("#imageModal").modal("hide");
                            $('#uploadImageFile')[0].reset();
                            $privateScope.viewImages(data);
                            $privateScope.$scope.$apply();
                        },
                        failure: function (response) {
                            alert("Сите полиња се задолжителни");
                        }
                    });
                }
            };
            GaleryController.prototype.updateImage = function (item) {
                this.subGaleryImgId = item.id;
                $("#subTitleMk").val(item.TitleMk);
                $("#subTitleFr").val(item.TitleFr);
                $("#updateSubGaleryModal").modal("show");
            };
            GaleryController.prototype.updateSubItem = function () {
                if ($('#updateUploadFile').valid()) {
                    var formData = new FormData($('#updateSubFile')[0]);
                    formData.append("Id", this.subGaleryImgId);
                    formData.append("GalleryMasterId", this.imgId);
                    $.ajax({
                        url: $privateScope.RootFactory.RootUrl() + 'Home/UpdateSubGaleryImage',
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            $("#updateSubGaleryModal").modal("hide");
                            $privateScope.viewImages(data);
                            $privateScope.$scope.$apply();
                        },
                        failure: function (response) {
                            alert("Сите полиња се задолжителни");
                        }
                    });
                }
            };
            GaleryController.prototype.deleteSubImage = function () {
                var c = confirm("Дали сте сигурни за бришење на сликата");
                if (c) {
                    var formData = new FormData();
                    formData.append("Id", this.subGaleryImgId);
                    formData.append("GalleryMasterId", this.imgId);
                    $.ajax({
                        url: $privateScope.RootFactory.RootUrl() + 'Home/DeleteImage',
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            $("#updateSubGaleryModal").modal("hide");
                            $privateScope.viewImages(data);
                            $privateScope.$scope.$apply();
                        },
                        failure: function (response) {
                            alert("Грешка !");
                        }
                    });
                }
            };
            return GaleryController;
        })(g.Global);
        angular.module("AbcUEM").controller("GaleryController", GaleryController);
    })(Galery = SiteScript.Galery || (SiteScript.Galery = {}));
})(SiteScript || (SiteScript = {}));
//# sourceMappingURL=ng-app-galery.js.map