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
        var Content = (function () {
            function Content() {
            }
            return Content;
        })();
        var CalendarController = (function (_super) {
            __extends(CalendarController, _super);
            function CalendarController($scope, $http, RootFactory) {
                _super.call(this);
                this.$scope = $scope;
                this.$http = $http;
                this.RootFactory = RootFactory;
                this.content = new Content();
                $customScope = this;
                var $this = this;
                this.$scope.$on('language', function (event, lang) {
                    $this.translate(lang);
                });
                $this.translate(this.$scope.mc.lang);
                this.initJquery();
            }
            CalendarController.prototype.translate = function (lang) {
                this.currentLang = lang;
                result = this.loadEvents(lang);
                $('#calendar-holder').empty().append('<div id="calendar"></div>');
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
                                $customScope.$http.post($customScope.RootFactory.RootUrl() + "Home/GetCalendarEvent", { id: calEvent._id }).then(function (response) {
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
                                $customScope.$http.post($customScope.RootFactory.RootUrl() + "Home/GetCalendarEvent", { id: calEvent._id }).then(function (response) {
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
            };
            CalendarController.prototype.loadEvents = function (lang) {
                var response;
                $.ajax({
                    url: this.RootFactory.RootUrl() + "Home/CalendarEvents",
                    method: 'GET',
                    data: { lang: lang },
                    async: false,
                    success: function (data) {
                        response = data;
                    }
                });
                return response;
            };
            CalendarController.prototype.saveItem = function (item) {
                var _this = this;
                if (item.Id) {
                    this.$http.post(this.RootFactory.RootUrl() + "Home/UpdateCalendarEvent", { item: item }).then(function (response) {
                        if (response.data) {
                            result = _this.loadEvents(_this.$scope.mc.lang);
                            $('#calendar').fullCalendar('refetchEvents');
                            $("#content").modal("hide");
                        }
                    });
                }
                else {
                    item.start = startDate;
                    item.end = endDate;
                    this.$http.post(this.RootFactory.RootUrl() + "Home/SaveCalendarEvent", { item: item }).then(function (response) {
                        if (response.data) {
                            result = _this.loadEvents(_this.$scope.mc.lang);
                            $('#calendar').fullCalendar('refetchEvents');
                            $("#content").modal("hide");
                        }
                    });
                }
            };
            CalendarController.prototype.clearForm = function () {
                this.content = null;
                startDate = null;
                endDate = null;
            };
            CalendarController.prototype.deleteEvent = function (item) {
                var _this = this;
                var c = confirm("Дали сте сигурни за бришење на елементот");
                if (c) {
                    this.$http.post(this.RootFactory.RootUrl() + "Home/DeleteCalendarEvent", { item: item }).then(function (response) {
                        if (response.data) {
                            result = _this.loadEvents(_this.$scope.mc.lang);
                            $('#calendar').fullCalendar('refetchEvents');
                            $("#content").modal("hide");
                        }
                    });
                }
            };
            CalendarController.prototype.initJquery = function () {
                $("#content").on("hidden.bs.modal", function () {
                    $(this).find('form')[0].reset();
                    $customScope.$scope.cc.content = null;
                });
            };
            return CalendarController;
        })(g.Global);
        angular.module("AbcUEM").controller("CalendarController", CalendarController);
    })(Galendar = SiteScript.Galendar || (SiteScript.Galendar = {}));
})(SiteScript || (SiteScript = {}));
//# sourceMappingURL=ng-app-calendar.js.map