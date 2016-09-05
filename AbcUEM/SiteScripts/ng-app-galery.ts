/// <reference path="global.ts" />
namespace SiteScript.Galery {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;

    declare var $;

    class Content {
        public Id: number;
        public TitleMk: string;
        public TitleFr: string;
        public ImgUrl: string;
    }

    declare var $privateScope;

    class GaleryController extends g.Global {
        private rootGalery: boolean = true;
        private rootGaleryName: string;
        private galleryMaster: any;
        private galleryDetails: any;
        private galleryHomeButton: any;
        private galleryHomeNav: any = { nameMk: "Галерија", nameFr: "Gallery" };
        private largeImgSrc: string;
        private largeImgDesc: string;

        private content: Content = new Content();

        constructor(public $scope, public $http: ng.IHttpService, public RootFactory: any) {
            super();
            var $this = this;
            $privateScope = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translateGallery(lang);
            });
            $this.translateGallery(this.$scope.mc.lang);

            this.initJquery();

        }

        public translateGallery(lang: g.Languages): void {
            this.getTranslateGalleryAsync(lang).then((response: any) => {
                this.galleryMaster = response.data;
            });

            if (lang == g.Languages.Mk) {
                this.galleryHomeButton = this.galleryHomeNav.nameMk;
            }
            else {
                this.galleryHomeButton = this.galleryHomeNav.nameFr;
            }
        }

        public getTranslateGalleryAsync(lang: g.Languages): angular.IPromise<any> {
            return this.$http.get(this.RootFactory.RootUrl() + "Home/GalleryMaster?lang=" + lang);
        }

        public getTranslateGalleryDetailsAsync(masterId: number, lang: g.Languages): angular.IPromise<any> {
            return this.$http.get(this.RootFactory.RootUrl() + "Home/GalleryDetails?masterId=" + masterId +"&lang=" + lang);
        }

        private imgId: any;
        public viewImage(img: any): void {
            this.rootGalery = false;
            this.rootGaleryName = img.title;
            this.imgId = img.id;
            debugger;
            this.getTranslateGalleryDetailsAsync(img.id, this.$scope.mc.lang).then((response: any) => {
                this.galleryDetails = response.data;
            });
        }

        public viewImages(id: any): void {
            debugger;
            this.getTranslateGalleryDetailsAsync(id, this.$scope.mc.lang).then((response: any) => {
                debugger;
                this.galleryDetails = response.data;
            });
        }

        public returnToRoot(): void {
            this.rootGalery = true;
        }

        public fullImg(img: any) {
            this.largeImgSrc = img.id;
            this.largeImgDesc = img.title;
            $("#fullSizeImg").modal("show");
        }

        private addGalery() {
            $("#galeryModal").modal("show");
        }

        private saveItem() {
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
        }

        private initJquery() {
            $("#galeryModal").on("hidden.bs.modal", function () {
                $(this).find('form')[0].reset();
            });
        }


        private Id: any;
        private updateGalery(item: any) {
            this.Id = item.id;
            $("#TitleMk").val(item.TitleMk);
            $("#TitleFr").val(item.TitleFr);
            $("#updateGaleryModal").modal("show");
        }

        private updateItem() {
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
        }

        private deleteGalery() {
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
        }

        private addImages() {
            $("#imageModal").modal("show");
        }
        
        private saveImages() {
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
        }

        private subGaleryImgId: any;
        private updateImage(item: any) {
            this.subGaleryImgId = item.id;
            $("#subTitleMk").val(item.TitleMk);
            $("#subTitleFr").val(item.TitleFr);
            $("#updateSubGaleryModal").modal("show");
        }

        private updateSubItem() {
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
        }

        

        private deleteSubImage() {
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
        }
    }

    angular.module("AbcUEM").controller("GaleryController", GaleryController);
}