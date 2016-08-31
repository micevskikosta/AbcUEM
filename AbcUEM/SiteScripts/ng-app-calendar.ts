/// <reference path="global.ts" />
namespace SiteScript.Galendar {
    import g = SiteScripts.Global;
    import m = SiteScripts.Master;

    declare var $;

    class Content {
        public Id: number;
        public TitleMk: string;
        public TitleFr: string;
        public DescriptionMk: string;
        public DescriptionFr: string;
        public start: Date;
        public end: Date;
    }

    declare var startDate;
    declare var endDate;

    class CalendarController extends g.Global {
        private content: Content = new Content();
        constructor(public $scope, public $http: ng.IHttpService) {
            super();

            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translate(lang);
            });
            $this.translate(this.$scope.mc.lang);
        }

        public translate(lang: g.Languages): void {
            var result = this.loadEvents(lang);
            $('#calendar-holder').empty().append('<div id="calendar"></div>')
            if (lang == g.Languages.Mk) {
                $("#calendar").fullCalendar({
                    lang: 'mk',
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultView: 'month',
                    selectable: true,
                    editable: true,
                    selectHelper: true,
                    axisFormat: 'HH:mm',
                    timeFormat: {
                        agenda: 'HH:mm'
                    },
                    minTime: '08:00:00',
                    maxTime: '21:00:00',
                    slotMinutes: 30,
                    defaultEventMinutes: 60,
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
                    },
                    select: function (start, end) {
                        startDate = start._d;
                        endDate = end._d;
                        $("#content").modal("show");
                    },
                    eventClick: function (calEvent, jsEvent, view) {
                        if (jsEvent.type == 'click') {
                            $("#content").modal("show");
                        }
                    },
                    eventResize: function (event, dayDelta, minuteDelta, revertFunc) {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: '/Home/UpdateCalendarEvent',
                            data: JSON.stringify({ id: event._id, start: event.start._d, end: event.end._d }),
                            cache: false,
                            success: function (data) {
                                revertFunc();
                            },
                            failure: function (response) {

                            }
                        });
                    },
                    eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: '/Home/UpdateCalendarEvent',
                            data: JSON.stringify({ id: event._id, start: event.start._d, end: event.end._d }),
                            cache: false,
                            success: function (data) {
                                revertFunc();
                            },
                            failure: function (response) {
                                
                            }
                        });
                        
                        //CalendarService.UpdateEventDate(event._id, moment(event.start).format("YYYY-MM-DD HH:mm"), moment(event.end).format("YYYY-MM-DD HH:mm")).then(function (data) {
                        //    if (data[0] == false) {
                        //        revertFunc();
                        //    }
                        //});
                    }
                });
            }
            else {
                $('#calendar').fullCalendar({
                    lang: 'fr',
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultView: 'month',
                    selectable: true,
                    selectHelper: true,
                    editable: true,
                    axisFormat: 'HH:mm',
                    timeFormat: {
                        agenda: 'HH:mm'
                    },
                    minTime: '08:00:00',
                    maxTime: '21:00:00',
                    slotMinutes: 30,
                    defaultEventMinutes: 60,
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

        loadEvents(lang: g.Languages): any {
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
        
        private saveItem(item: Content) {
            item.start = startDate;
            item.end = endDate;
            this.$http.post("/Home/SaveCalendarEvent", { item: item }).then((response: any) => {
                if (response.data) {
                    window.location.reload();
                    this.clearForm();
                }
            });
        }

        private clearForm() {
            this.content = null;
            startDate = null;
            endDate = null;
        }
    }

    angular.module("AbcUEM").controller("CalendarController", CalendarController);
}