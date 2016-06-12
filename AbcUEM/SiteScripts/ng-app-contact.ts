/// <reference path="global.ts" />
namespace SiteScript.Contact {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;
    class ContactController extends g.Global {
        private langMk: any = {
            nameAndLastName: "Име и презиме",
            email: "Електронска пошта",
            note: "Порака",
            send: "Испрати"
        };
        private langFr: any = {
            nameAndLastName: "Nom et prénom",
            email: "Email",
            note: "Message",
            send: "Envoyer"
            
        };
        private nameAndLastName: string;
        private email: string;
        private note: string;
        private send: string;

        constructor(public $scope, public $http: ng.IHttpService) {
            super();
            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translate(lang);
            });

            $this.translate(this.$scope.mc.lang);
        }

        public translate(lang: number): void {
            if (lang == g.Languages.Mk) {
                this.nameAndLastName = this.langMk.nameAndLastName;
                this.email = this.langMk.email;
                this.note = this.langMk.note;
                this.send = this.langMk.send;
            }
            else {
                this.nameAndLastName = this.langFr.nameAndLastName;
                this.email = this.langFr.email;
                this.note = this.langFr.note;
                this.send = this.langFr.send;
            }
        }
    }

    angular.module("AbcUEM").controller("ContactController", ContactController);
}