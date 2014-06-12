/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 6/9/14
 * Time: 1:29 PM
 * To change this template use File | Settings | File Templates.
 */



$(document).ready(function(){



    var pathname = window.location.pathname.slice(-10);

    var dP = $('.datepicker').not('.export');

    var attendanceDropdown = $(".drop");

    dP.val() == '' ? dP.val(pathname) : dP.val(moment().format('MM-DD-YYYY'));

    attendanceDropdown._CHOSEN = false;


    var firstDropdown = $(attendanceDropdown[0]).next().find('#statusSelectBoxItOptions');
    var firstIsVisible = $(attendanceDropdown[0]).next().find('#statusSelectBoxItOptions').is(':visible');


    if (attendanceDropdown.length > 0  && attendanceDropdown._CHOSEN === false){

        setTimeout(function() {
            var first = $('body').find(attendanceDropdown).first().data("selectBox-selectBoxIt");
            first.wait(250, first.open(function() {
                this.moveDown();
            }));
            attendanceDropdown._CHOSEN = true;
        }, 111);





        $('body').keydown(function(e){
            if(e.keyCode === 9){

                var f = attendanceDropdown.first();
                //var next = first.next();

                var next = f.closest('tr').next('tr').find('.drop').data("selectBox-selectBoxIt");
                console.info(next);
                next.wait(250, next.open(function() {
                   // this.moveDown();
                }));
            }
        });

    } if (!firstIsVisible) {
        //enableDownpress();
        attendanceDropdown.change(function () {
            console.log($(this));
            var attStatus = this.value;
            var studentId = $(this).attr('data-student-id');
            var sectionId = $(this).attr('data-section-id');
            var sessionId = $(this).attr('data-session-id');
            var studentName = $(this).attr('data-student-name');
            console.log(this);

            if (this.selectedIndex !== 0){
                $.ajax({
                    url:'/sections/'+sectionId+'/sessions/'+sessionId+'/students/'+studentId+'/attendances',
                    type:"POST",
                    data: {
                        status: attStatus,
                        student_name: studentName
                    },
                    success: function (data){
                        console.info(attStatus, ' success');
                        $('.att-status-'+studentId).html(attStatus);
                    },
                    error: function (xhr, status){
                        console.info(xhr.error);
                    }
                });
            }
        });
    }


    $('.best_in_place').bind("ajax:success", function(){
        console.log($(this));
        var me = $(this).attr('data-data-id');
        var a =jQuery('body').find('td.status-' +me);

        a.find('span').html($(this)[0].innerHTML);

        switch ($(this)[0].innerHTML) {

            case "present":
                jQuery(this).css('color', 'green');
                break;
            case "absent":
                jQuery(this).css('color', 'red');
                break;
            case "late":
                jQuery(this).css('color', 'yellow');
                break;
            case "excused":
                jQuery(this).css('color', 'blue');
                break;
        }
    });


    ///sections/:section_id/sessions/:session_id/students/:student_id/attendances


    dP.datepicker({
        autoclose: true
    })
        .on('changeDate', function(ev){
            var sectionId = $(this).attr('data-section-id');
            var date = moment(ev.date.valueOf()).format('MM-DD-YYYY');
            var loader = $('<div class="loader"></div>');
            var dropper = $('.dropdown-menu');
            var url = '/sections/'+sectionId+'/sessions/'+date;

            dropper.hide();
            loader.show();

            $('#tab_logic').css('opacity', '0.5').append(loader);


            $.ajax({
                url: url,
                type:"GET",
                success: function (data){
                    console.info(data);
                    window.location = url;
                    //$('body').html(data);
                    loader.fadeOut("slow");
                    $('#tab_logic').css('opacity', '1')


                },
                error: function (xhr, status){
                    console.info(xhr.error);
                }
            });

        });

});
