/// <reference path="global.ts" />
namespace SiteScript.About {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;
    export class AboutController extends g.Global {
        private About: any;
        constructor(public $scope, public $http: ng.IHttpService, public $sce: ng.ISCEService) {
            super();
            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translate(g.Pages.About, lang, "About");
            });

            $this.translate(g.Pages.About, this.$scope.mc.lang, "About");

        }

        public translate(page: number, lang: number, tagId: string): void {
            this.getTranslateAsync(page, lang, tagId).then((response: any) => {
                this.About = this.$sce.trustAsHtml(response.data[0].Description);
            });
        }
    }

    angular.module("AbcUEM").controller("AboutController", AboutController);
}