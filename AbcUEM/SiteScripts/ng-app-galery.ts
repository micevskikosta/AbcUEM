/// <reference path="global.ts" />
namespace SiteScript.Galery {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;

    declare var $;

    class GaleryController extends g.Global {
        private rootGalery: boolean = true;
        private rootGaleryName: string;
        private galleryMaster: any;
        private galleryDetails: any;
        private galleryHomeButton: any;
        private galleryHomeNav: any = { nameMk: "Галерија", nameFr: "Gallery" };
        private largeImgSrc: string;
        private largeImgDesc: string;
        constructor(public $scope, public $http: ng.IHttpService) {
            super();
            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translateGallery(lang);
            });
            $this.translateGallery(this.$scope.mc.lang);
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
            return this.$http.get("/Home/GalleryMaster?lang=" + lang);
        }

        public getTranslateGalleryDetailsAsync(masterId: number, lang: g.Languages): angular.IPromise<any> {
            return this.$http.get("/Home/GalleryDetails?masterId=" + masterId +"&lang=" + lang);
        }


        public viewImage(img: any): void {
            this.rootGalery = false;
            this.rootGaleryName = img.title;
            this.getTranslateGalleryDetailsAsync(img.id, this.$scope.mc.lang).then((response: any) => {
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
    }

    angular.module("AbcUEM").controller("GaleryController", GaleryController);
}