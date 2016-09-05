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
    declare var $customScope;
    declare var result;

    

    class CalendarController extends g.Global {
        private content: Content = new Content();
        private currentLang: any;
        constructor(public $scope, public $http: ng.IHttpService, public RootFactory: any) {
            super();
            $customScope = this;
            var $this = this;
            this.$scope.$on('language', function (event, lang) {
                $this.translate(lang);
            });
            $this.translate(this.$scope.mc.lang);

            this.initJquery();
        }

        public translate(lang: g.Languages): void {
            this.currentLang = lang;
            result = this.loadEvents(lang);
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
                                description: result[i].description,
                                start: result[i].start,
                                end: result[i].end,
                                allDay: false
                            });
                        }
                        callback(events);
                    },
                    eventRender: function (event, element) {
                        if (event.description != '') {
                            element.find('.fc-title').append('<div class="glyphicon glyphicon-info-sign" style="position: absolute;top: 2px;right:2px;"></div>');
                        }
                    },
                    select: function (start, end) {
                        startDate = start._d;
                        endDate = end._d;
                        $("#content").modal("show");
                    },
                    eventClick: function (calEvent, jsEvent, view) {
                        if (jsEvent.type == 'click') {
                            $customScope.$http.post($customScope.RootFactory.RootUrl() + "Home/GetCalendarEvent", { id: calEvent._id }).then((response: any) => {
                                if (response.data) {
                                    $customScope.content = response.data;
                                    $("#content").modal("show");
                                }
                            });
                        }
                    },
                    eventResize: function (event, dayDelta, minuteDelta, revertFunc) {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: $customScope.RootFactory.RootUrl() + 'Home/UpdateCalendarEvent',
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
                            url: $customScope.RootFactory.RootUrl() +'Home/UpdateCalendarEvent',
                            data: JSON.stringify({ id: event._id, start: event.start._d, end: event.end._d }),
                            cache: false,
                            success: function (data) {
                                revertFunc();
                            },
                            failure: function (response) {
                                
                            }
                        });
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
                        month: 'mois',
                        week: 'dimanche',
                        day: 'jour'
                    },
                    events: function (start, end, timezone, callback) {
                        var events = [];
                        for (var i = 0; i < result.length; i++) {
                            events.push({
                                _id: result[i].id,
                                title: result[i].title,
                                description: result[i].description,
                                start: result[i].start,
                                end: result[i].end,
                                allDay: false
                            });
                        }
                        callback(events);
                    },
                    eventRender: function (event, element) {
                        if (event.description != '') {
                            element.find('.fc-title').append('<div class="glyphicon glyphicon-info-sign" style="position: absolute;top: 2px;right:2px;"></div>');
                        }
                    },
                    select: function (start, end) {
                        startDate = start._d;
                        endDate = end._d;
                        $("#content").modal("show");
                    },
                    eventClick: function (calEvent, jsEvent, view) {
                        if (jsEvent.type == 'click') {
                            $customScope.$http.post($customScope.RootFactory.RootUrl() + "Home/GetCalendarEvent", { id: calEvent._id }).then((response: any) => {
                                if (response.data) {
                                    $customScope.content = response.data;
                                    $("#content").modal("show");
                                }
                            });
                        }
                    },
                    eventResize: function (event, dayDelta, minuteDelta, revertFunc) {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            type: 'POST',
                            url: $customScope.RootFactory.RootUrl() + 'Home/UpdateCalendarEvent',
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
                            url: $customScope.RootFactory.RootUrl() + 'Home/UpdateCalendarEvent',
                            data: JSON.stringify({ id: event._id, start: event.start._d, end: event.end._d }),
                            cache: false,
                            success: function (data) {
                                revertFunc();
                            },
                            failure: function (response) {

                            }
                        });
                    }
                });
            }
        }

        loadEvents(lang: g.Languages): any {
            var response: any;
            $.ajax({
                url: this.RootFactory.RootUrl() +"Home/CalendarEvents",
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
            if (item.Id) {
                this.$http.post(this.RootFactory.RootUrl() + "Home/UpdateCalendarEvent", { item: item }).then((response: any) => {
                    if (response.data) {
                        result = this.loadEvents(this.$scope.mc.lang);
                        $('#calendar').fullCalendar('refetchEvents');
                        $("#content").modal("hide");
                    }
                });
            }
            else {
                item.start = startDate;
                item.end = endDate;
                this.$http.post(this.RootFactory.RootUrl() + "Home/SaveCalendarEvent", { item: item }).then((response: any) => {
                    if (response.data) {
                        result = this.loadEvents(this.$scope.mc.lang);
                        $('#calendar').fullCalendar('refetchEvents');
                        $("#content").modal("hide");
                    }
                });
            }
        }

        private clearForm() {
            this.content = null;
            startDate = null;
            endDate = null;
        }

        private deleteEvent(item: Content) {
            var c = confirm("Дали сте сигурни за бришење на елементот");
            if (c) {
                this.$http.post(this.RootFactory.RootUrl() +"Home/DeleteCalendarEvent", { item: item }).then((response: any) => {
                    if (response.data) {
                        result = this.loadEvents(this.$scope.mc.lang);
                        $('#calendar').fullCalendar('refetchEvents');
                        $("#content").modal("hide");
                    }
                });
            }
        }

        private initJquery() {
            $("#content").on("hidden.bs.modal", function () {
                $(this).find('form')[0].reset();
                $customScope.$scope.cc.content = null;
            });
        }
    }

    angular.module("AbcUEM").controller("CalendarController", CalendarController);
}