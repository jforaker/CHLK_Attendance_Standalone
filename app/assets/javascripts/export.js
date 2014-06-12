/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 6/12/14
 * Time: 1:27 PM
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function(){

    var exportDP = $('.export');

    exportDP.datepicker({
        autoclose: true
    })
        .on('changeDate', function(ev){
            var sectionId = $(this).attr('data-section-id');
            var date = moment(ev.date.valueOf()).format('MM-DD-YYYY');
            var loader = $('<div class="loader"></div>');
            var dropper = $('.dropdown-menu');
            var url = '/sections/'+sectionId+'/attendances/'+date;

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
})