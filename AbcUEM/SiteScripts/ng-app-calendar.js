var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="global.ts" />
var SiteScript;
(function (SiteScript) {
    var Galendar;
    (function (Galendar) {
        var g = SiteScripts.Global;
        var CalendarController = (function (_super) {
            __extends(CalendarController, _super);
            function CalendarController($scope, $http) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.calendarPage = "Calendar Page";
                var $this = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translate(lang);
                });
                $this.translate(this.$scope.mc.lang);
            }
            CalendarController.prototype.translate = function (lang) {
                var result = this.loadEvents(lang);
                $('#calendar-holder').empty().append('<div id="calendar"></div>');
                if (lang == g.Languages.Mk) {
                    $("#calendar").fullCalendar({
                        lang: 'mk',
                        buttonText: {
                            today: 'денес',
                            month: 'месец',
                            week: 'недела',
                            day: 'ден'
                        },
                        events: function (start, end, timezone, callback) {
                            var events = [];
                            for (var i = 0; i < result.length; i++) {
                                events.push({
                                    _id: result[i].id,
                                    title: result[i].title,
                                    start: result[i].start,
                                    end: result[i].end,
                                    allDay: false
                                });
                            }
                            callback(events);
                        }
                    });
                }
                else {
                    $('#calendar').fullCalendar({
                        lang: 'fr',
                        buttonText: {
                            today: "aujourd'hui",
                            month: 'месец',
                            week: 'недела',
                            day: 'ден'
                        },
                        events: function (start, end, timezone, callback) {
                            var events = [];
                            for (var i = 0; i < result.length; i++) {
                                events.push({
                                    _id: result[i].id,
                                    title: result[i].title,
                                    start: result[i].start,
                                    end: result[i].end,
                                    allDay: false
                                });
                            }
                            callback(events);
                        }
                    });
                }
            };
            CalendarController.prototype.loadEvents = function (lang) {
                var response;
                $.ajax({
                    url: "/Home/CalendarEvents",
                    method: 'GET',
                    data: { lang: lang },
                    async: false,
                    success: function (data) {
                        response = data;
                    }
                });
                return response;
            };
            return CalendarController;
        })(g.Global);
        angular.module("AbcUEM").controller("CalendarController", CalendarController);
    })(Galendar = SiteScript.Galendar || (SiteScript.Galendar = {}));
})(SiteScript || (SiteScript = {}));
//# sourceMappingURL=ng-app-calendar.js.map