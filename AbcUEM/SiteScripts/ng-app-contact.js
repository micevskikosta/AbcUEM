var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="global.ts" />
var SiteScript;
(function (SiteScript) {
    var Contact;
    (function (Contact) {
        var g = SiteScripts.Global;
        var ContactController = (function (_super) {
            __extends(ContactController, _super);
            function ContactController($scope, $http) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.langMk = {
                    nameAndLastName: "Име и презиме",
                    email: "Електронска пошта",
                    note: "Порака",
                    send: "Испрати"
                };
                this.langFr = {
                    nameAndLastName: "Nom et prénom",
                    email: "Email",
                    note: "Message",
                    send: "Envoyer"
                };
                var $this = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translate(lang);
                });
                $this.translate(this.$scope.mc.lang);
            }
            ContactController.prototype.translate = function (lang) {
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
            };
            return ContactController;
        })(g.Global);
        angular.module("AbcUEM").controller("ContactController", ContactController);
    })(Contact = SiteScript.Contact || (SiteScript.Contact = {}));
})(SiteScript || (SiteScript = {}));
//# sourceMappingURL=ng-app-contact.js.map