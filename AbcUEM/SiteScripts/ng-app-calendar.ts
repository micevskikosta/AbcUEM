/// <reference path="global.ts" />
namespace SiteScript.Galendar {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;

    declare var $;

    class CalendarController extends g.Global {
        private calendarPage: any;
        constructor(public $scope, public $http: ng.IHttpService) {
            super();
            this.calendarPage = "Calendar Page";
           
            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translate(lang);
            });
            $this.translate(this.$scope.mc.lang);
        }

        public translate(lang: g.Languages): void {
            console.log("kuroi");
            var result = this.loadEvents(lang);
            $('#calendar-holder').empty().append('<div id="calendar"></div>')
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
                                    end: result[i].end,// will be parsed,
                                    allDay: false
                                });
                            }
                            callback(events);
                    }
                });
            }
        }

        loadEvents(lang: g.Languages):any {
            var response: any;
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
        }
    }

    angular.module("AbcUEM").controller("CalendarController", CalendarController);
}