/// <reference path="global.ts" />
namespace SiteScript.Info {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;

    declare var $: any;

    class Content {
        public Id: number;
        public TitleMk:string;
        public TitleFr:string;
        public DescriptionMk:string;
        public DescriptionFr:string;
        public ImgPath:string;
        public TagId: string;
        public PageId: number;
    }

    class InfoController extends g.Global {
        private InfoArray: any;
        private InfoBoardArray: any;
        private content: Content = new Content();
        constructor(public $scope, public $http: ng.IHttpService, public $sce: ng.ISCEService) {
            super();
            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translate(g.Pages.Info, lang, "InfoBoard");
                $this.translateInfoBoardDetails(g.Pages.Info, lang, "InfoBoardDetails");
            });
            $this.translate(g.Pages.Info, this.$scope.mc.lang, "InfoBoard");
            $this.translateInfoBoardDetails(g.Pages.Info, this.$scope.mc.lang, "InfoBoardDetails");
        }
        
        public translate(page: number, lang: number, tagId: string): void {
            this.getTranslateAsync(page, lang, tagId).then((response: any) => {
                this.InfoArray = response.data;
            });
        }
        public translateInfoBoardDetails(page: number, lang: number, tagId: string): void {
            this.getTranslateAsync(page, lang, tagId).then((response: any) => {
                this.InfoBoardArray = response.data;
            });
        }

        private editLeftItem(item: Content) {
            this.$http.get("/Home/GetContent?Id=" + item.Id).then((response: any) => {
                this.content = response.data;
                $("#addLeftContent").modal("show");
            });
        }

        private saveLeftItem(item: Content) {
            if (item.Id) {
                this.$http.post("/Home/UpdateContent", { item: item }).then((response: any) => {
                    if (response.data) {
                        this.translate(g.Pages.Info, this.$scope.mc.lang, "InfoBoard");
                        $("#addLeftContent").modal("hide");
                    }
                });
            }
            else {
                item.PageId = 4;
                item.TagId = "InfoBoard";
                this.$http.post("/Home/AddContent", { item: item }).then((response: any) => {
                    if (response.data) {
                        this.translate(g.Pages.Info, this.$scope.mc.lang, "InfoBoard");
                        $("#addLeftContent").modal("hide");
                    }
                });
            }
        }

        private clearForm() {
            this.content = null;
        }
    }

    angular.module("AbcUEM").controller("InfoController", InfoController);
}