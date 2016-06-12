/// <reference path="global.ts" />
namespace SiteScript.Info {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;
    class InfoController extends g.Global {
        private InfoArray: any;
        constructor(public $scope, public $http: ng.IHttpService, public $sce: ng.ISCEService) {
            super();
            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translate(g.Pages.Info, lang, "InfoBoard");
            });

            $this.translate(g.Pages.Info, this.$scope.mc.lang, "InfoBoard");
        }
        
        public translate(page: number, lang: number, tagId: string): void {
            this.getTranslateAsync(page, lang, tagId).then((response: any) => {
                this.InfoArray = response.data;
            });
        }
    }

    angular.module("AbcUEM").controller("InfoController", InfoController);
}