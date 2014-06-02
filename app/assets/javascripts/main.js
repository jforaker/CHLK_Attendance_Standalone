jQuery(document).ready(function($){
    //hamburger menu on mobile
    var $hamburger_menu= $('.hamburger'),
        $nav_menu= $('#navver');

    $hamburger_menu.on('click', function(){
        $nav_menu.toggleClass('is-visible');
    });

    $(window).on('resize', function(){

        if($(window).width()>=1024) $nav_menu.removeClass('is-visible');
    });

    //open login page after a click event on the login button
    var $loginButton= $('#navver').find('a[data-type="login"]'),
        $loginPanel= $('#login'),
        $resetPassword=$('#resetPassword'),
        $makeLogin=$('#makeLogin'),
        $resetPasswordAnc=$('#makeLogin .forgotPassword a'),
        $BackToLogInAnc=$('#resetPassword .forgotPassword a'),
        $closelogin=$loginPanel.find('span.close');

    $loginButton.on('click', function(e){
        $loginPanel.fadeIn();
        $nav_menu.removeClass('is-visible');
        $('body, html').addClass('is-login-open');
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
        $('body, html').removeClass('is-login-open');
        $loginPanel.fadeOut(100, function(){
            $resetPassword.addClass('hide');
            $makeLogin.removeClass('hide');
        });
    }


    //switch to reset password panel if click on the reset password link
    $resetPasswordAnc.on('click', function(e){
        // e.preventDefault();
        $makeLogin.addClass('hide');
        $resetPassword.removeClass('hide');
    });

    //switch to login panel if click on the rback to login link
    $BackToLogInAnc.on('click', function(e){
        // e.preventDefault();
        $resetPassword.addClass('hide');
        $makeLogin.removeClass('hide');
    });

    // console.log($('.select-style').length);
    //style select element
    if ($('.select-style').length>0) $('.select-style').customSelect();

    //case submition modal
    var $caseSubmitButton= $('a.submit-case, a.submit-new-case'),
        $caseSubmitPanel= $('#login[data-type="case-submition"]'),
        $closeModal=$caseSubmitPanel.find('span.close');

    // console.log($loginPanel);
    $caseSubmitButton.on('click', function(e){
        $caseSubmitPanel.fadeIn();
        // $nav_menu.removeClass('is-visible');
        $('body, html').addClass('is-login-open');
    });

    //close case submition modal a click event on the close button
    $closeModal.on('click', function(){
        closeModal();
    });

    function closeModal(){
        $('body, html').removeClass('is-login-open');
        $caseSubmitPanel.fadeOut(100);
    }
});