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

        private editItem(item: Content, section) {
            this.section = section;
            this.$http.get("/Home/GetContent?Id=" + item.Id).then((response: any) => {
                this.content = response.data;
                $("#addContent").modal("show");
            });
        }
        
        private addContent(section) {
            this.section = section;
            $("#addContent").modal("show");
        }

        private saveItem(item: Content) {
            if (item.Id) {
                this.$http.post("/Home/UpdateContent", { item: item }).then((response: any) => {
                    if (response.data) {
                        if (this.section == "InfoBoardDetails") {
                            this.translateInfoBoardDetails(g.Pages.Info, this.$scope.mc.lang, this.section);
                        }
                        else {
                            this.translate(g.Pages.Info, this.$scope.mc.lang, this.section);
                        }
                        $("#addContent").modal("hide");
                        this.clearForm();
                    }
                });
            }
            else {
                item.PageId = 4;
                item.TagId = this.section;
                this.$http.post("/Home/AddContent", { item: item }).then((response: any) => {
                    if (response.data) {
                        if (this.section == "InfoBoardDetails") {
                            this.translateInfoBoardDetails(g.Pages.Info, this.$scope.mc.lang, this.section);
                        }
                        else {
                            this.translate(g.Pages.Info, this.$scope.mc.lang, this.section);
                        }
                        $("#addContent").modal("hide");
                        this.clearForm();
                    }
                });
            }
        }

        private clearForm() {
            this.content = null;
            this.section = null;
        }

        private id: any;
        private item: string;
        private element: string;
        private section: string;
        private deleteItem(item: any, element: any, section: any) {
            $('#' + element).modal('show');
            this.id = item.Id;
            this.item = item.Title + ' (' + item.Description + ')';
            this.element = element;
            this.section = section;
        }

        private confirm() {
            this.$http.post("/Home/DeleteContent", { Id: this.id }).then((response: any) => {
                if (response.data) {
                    if (this.section == "InfoBoardDetails") {
                        this.translateInfoBoardDetails(g.Pages.Info, this.$scope.mc.lang, this.section);
                    }
                    else {
                        this.translate(g.Pages.Info, this.$scope.mc.lang, this.section);
                    }
                    $('#' + this.element).modal('hide');
                    this.dismiss();
                }
            });
        }

        private dismiss() {
            this.id = null;
            this.item = null;
            this.element = null;
            this.section = null;
        }
    }

    angular.module("AbcUEM").controller("InfoController", InfoController);
}