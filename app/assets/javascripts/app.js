/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 5/31/14
 * Time: 5:05 PM
 * To change this template use File | Settings | File Templates.
 */
$(function() {
    var alert = $('.alert');
    alert.fadeIn('slow').slideDown('slow', function() {
        console.log(alert);
        $(this).delay(2500).slideUp();
    });
});

$(document).ready(function(){
    var i=1;
    $("#add_row").click(function(){
        $('#addr'+i).html("<td>"+ (i+1) +"</td><td><input name='name"+i+"' type='text' placeholder='Name' class='form-control input-md'  /> </td><td><input  name='note"+i+"' type='text' placeholder='Note'  class='form-control input-md'></td>");

        $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
        i++;
    });
    $("#delete_row").click(function(){
        if(i>1){
            $("#addr"+(i-1)).html('');
            i--;
        }
    });


    $('#save-students').click(function(){

        var sectionId = $('#tab_logic').data('id');

        var arr = [];

        $('#tab_logic').find('td.number').each(function(i, n){

            var name =  $(this)[0].nextElementSibling.innerText;
            var note =  $(this)[0].nextElementSibling.nextElementSibling.innerText;
            console.log(name)

            arr.push({
                'student': {
                    'name': name,
                    'note': note,
                    'section_id': sectionId
                }

            })
        });

        //console.info(JSON.stringify(arr))

        var a = [];

        var obj = {
            student: {
                name: 'juw hyrhe',
                note: 'some note',
                section_id: sectionId
            }
            ,
            student: {
                name: 'bill smitn',
                note: 'some note',
                section_id: sectionId
            }
        };
        a.push(obj);
        var fake = obj;

        console.info(fake)

        $.ajax({
            url:'/students',
            type:"POST",
            dataType: "json",
            contentType: 'application/json',
            data:  JSON.stringify(fake)
                   ,    //JSON.stringify(arr),
            success: function (data){
                console.info(data);
                setTimeout(function(){
                    document.location = '/sections/'+ sectionId;
                }, 800)
            },
            error: function (xhr, status){
                console.info(xhr.error);
                //alert('Looks like there was an error while reaching HelloSign. Refresh the page and try again.');
                //document.location = "/"
            }
        });
    });

});


$(function () {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});