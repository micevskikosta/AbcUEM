/// <reference path="global.ts" />

namespace SiteScript.Schools {
    import g = SiteScripts.Global;

    export class SchoolController extends g.Global {
        private SchoolsTitle: any;
        private SchoolsWithPictures: any;
        constructor(public $scope, public $http: ng.IHttpService, public $sce: ng.ISCEService) {
            super();
            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translate(g.Pages.Schools, lang, "SchoolsTitle");
                $this.translate(g.Pages.Schools, lang, "SchoolsWithPictures");
            });

            $this.translate(g.Pages.Schools, this.$scope.mc.lang, "SchoolsTitle");
            $this.translate(g.Pages.Schools, this.$scope.mc.lang, "SchoolsWithPictures");
            
        }
        
        public translate(page: number, lang: number, tagId: string): void {
            this.getTranslateAsync(page, lang, tagId).then((response: any) => {

                switch (tagId) {
                    case "SchoolsTitle":
                        this.SchoolsTitle = this.$sce.trustAsHtml(response.data[0].Description);
                        break;
                    case "SchoolsWithPictures":
                        this.SchoolsWithPictures = response.data;
                        break;
                }
            });
        }
        
    }

    angular.module("AbcUEM").controller("SchoolController", SchoolController);
}
