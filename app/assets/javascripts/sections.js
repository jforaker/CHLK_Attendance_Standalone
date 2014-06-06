/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 6/3/14
 * Time: 6:20 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    jQuery(".best_in_place").best_in_place()
    $('input[type=file]').bootstrapFileInput();
    $('.file-inputs').bootstrapFileInput();

    var id = $('#section_path').attr('data-path');
    //var MYDAYS = [];
    var name = $('#section_path').attr('data-name');


    var renderCal = function() {
        var cal = $('#calendar');

        cal.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month' //basicWeek,basicDay
            },
            defaultDate: moment(),
            editable: true,
            eventSources: [
                {
                    events: function(start, end, timezone, callback) {
                        $.ajax({
                            url:'/sections/'+ id +'.json',
                            type:"GET",
                            success: function(data) {
                                var MYDAYS = [];
                                var events = [];

                                if (data.monday) {
                                    MYDAYS.push('mon');
                                } if (data.tuesday) {
                                    MYDAYS.push('tue');
                                }   if (data.wednesday) {
                                    MYDAYS.push('wed');
                                } if (data.thurdsay) {
                                    MYDAYS.push('thu');
                                } if (data.friday) {
                                    MYDAYS.push('fri');
                                } if (data.saturday) {
                                    MYDAYS.push('sat');
                                } if (data.sunday) {
                                    MYDAYS.push('sun');
                                }


                                $(MYDAYS).each(function(i, day){
                                    console.log(day);
                                    events.push({
                                        title: day, //$(this).attr('title'),
                                        start: moment()
                                    });
                                });
                                callback(events);
                            }
                        });
                    }
                },
                {
                    events: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
                    eventClick: function(event) {
                        // opens events in a popup window
                        window.open(event.url, 'gcalevent', 'width=700,height=600');
                        return false;
                    }

                }
            ]
        });
    };

    renderCal();

});