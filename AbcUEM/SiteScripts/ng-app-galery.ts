/// <reference path="global.ts" />
namespace SiteScript.Galery {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;
    class GaleryController extends g.Global {
        private galeryPage: any;
        constructor(public $scope, public $http: ng.IHttpService) {
            super();
            this.galeryPage = "Galery Page";
        }
    }

    angular.module("AbcUEM").controller("GaleryController", GaleryController);
}