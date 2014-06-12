/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 6/11/14
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */

$(window).load(function() {
    $(".loader").fadeOut("slow");
});



$(document).ready(function(){

    $('#year').html(moment().format('YYYY'));

    $('input[type=file]').bootstrapFileInput();
    $('.file-inputs').bootstrapFileInput();
    $(".select-style").selectBoxIt({
        showEffect: "fadeIn",
        showEffectSpeed: 155,
        hideEffect: "fadeOut",
        hideEffectSpeed: 155,
        aggressiveChange: false
//        populate: function() {
//            var deferred = $.Deferred(),
//                arr = [],
//                x = -1;
//            $.ajax({
//                url: 'https://api.github.com/users/gfranko/repos'
//            }).done(function(data) {
//                    while(++x < data.length) {
//                        arr.push(data[x].name);
//                    }
//                    deferred.resolve(arr);
//                });
//            return deferred;
//        }
    });
    $(".select-style").bind({

        // Binds to the 'open' event on the original select box
        "open": function() {

            // Adds the Twitter Bootstrap 'dropup' class to the drop down
            $(this).data("selectBox-selectBoxIt").dropdown.addClass("dropup");

        },

        // Binds to the 'close' event on the original select box
        "close": function() {

            // Removes the Twitter Bootstrap 'dropup' class from the drop down
            $(this).data("selectBox-selectBoxIt").dropdown.removeClass("dropup");

        }

    });

    var $loginButton=$('.mainNav a.lg'),
        $loginPanel=$('#login'),
        $closelogin=$loginPanel.find('span.close'),
        $mobileMenuIcon=$('.wrap a.listMenu'),
        $menuNav=$('.wrap nav'),
        $feature=$menuNav.find('a[data-type=feature]'),
        $resetPasswordAnc=$('#makeLogin .forgotPassword a'),
        $makeLogin=$('#makeLogin'),
        $BackToLogInAnc=$('#resetPassword .forgotPassword a'),
        $resetPassword=$('#resetPassword');

    //open login page after a click event on the login button
    $loginButton.on('click', function(e){
        e.preventDefault();
        if($(window).width()>1024){
            $loginPanel.fadeIn();
            console.log($loginPanel)
        }else{
            $loginPanel.fadeIn(100);
            if($mobileMenuIcon.is(':visible')){
                $menuNav.removeClass('openNavigation');
                $mobileMenuIcon.removeClass('clicked');
            }
        }
    });

    //close login page after a click event on the close button
    $closelogin.on('click', function(){
        closePopUp();
    });

    //close login page if you click somewhere outside the login panel
    $loginPanel.on('click', function(event){
        if($(event.target).is('div#login')){
            closePopUp();
        }
    });

    function closePopUp(){
        if($(window).width()>1024){
            $loginPanel.fadeOut(function(){
                $resetPassword.addClass('hide');
                $makeLogin.removeClass('hide');
            });
        }else{
            $loginPanel.fadeOut(100, function(){
                $resetPassword.addClass('hide');
                $makeLogin.removeClass('hide');
            });
        }
    }

    //mobile menu behaviour
    $mobileMenuIcon.on('click', function(e){
        e.preventDefault();
        $menuNav.toggleClass('openNavigation');
        $mobileMenuIcon.toggleClass('clicked');
    });

    //smooth scrolling to content
    $feature.on('click', function(e){
        e.preventDefault();
        var $target= $(this.hash);
        // $target= $(target);
        $('body,html').animate(//html-to fix a bug with firefox
            {'scrollTop':$target.offset().top},
            900,'swing'
        );
        if($mobileMenuIcon.is(':visible')){
            $menuNav.removeClass('openNavigation');
            $mobileMenuIcon.removeClass('clicked');
        }
    });

    //switch to reset password panel if click on the reset password link
    $resetPasswordAnc.on('click', function(e){
        e.preventDefault();
        $makeLogin.addClass('hide');
        $resetPassword.removeClass('hide');
    });

    //switch to login panel if click on the rback to login link
    $BackToLogInAnc.on('click', function(e){
        e.preventDefault();
        $resetPassword.addClass('hide');
        $makeLogin.removeClass('hide');
    });

    /*--------------------------*
     *	insert and animate GIF  *
     *--------------------------*/
    var $divFeature=$('div.feature'),
        $imageGif=$divFeature.find('img');

    //hide image and sustitute .png with .svg if laptop
    loadFeaturedImage($imageGif);
    $(window).on('resize', function(){
        loadFeaturedImage($imageGif);
    });

    //show and animate gif on scrolling or if the page if already scrolled
    animateGif($divFeature);
    $(window).on('scroll resize', function(){
        animateGif($divFeature);
    });

    function loadFeaturedImage($images){
        $images.each(function(){
            $this=$(this);
            var srcTot=$this.attr('src'),
                imgExtencion=srcTot.substring(srcTot.length - 3, srcTot.length),
                srcNew=srcTot.substring(0, srcTot.length - 3);
            console.log(imgExtencion);
            if($(window).width()>1024 && imgExtencion=='png'){
                $this.hide();
                $this.attr('src',srcNew+'gif');
            }else if($(window).width()<=1024 && imgExtencion=='gif'){
                $this.show();
                $this.attr('src',srcNew+'png');
            }
        });
    }

    function animateGif($container){
        if($(window).width()>1024){
            $container.each(function(){
                if($(this).offset().top-$(window).scrollTop()<$(window).height()*0.6){
                    ($(this).hasClass('feature1')) ? $(this).find('img').addClass('move-right').show():$(this).find('img').addClass('move-left').show();
                }
            });
        }
    }

});