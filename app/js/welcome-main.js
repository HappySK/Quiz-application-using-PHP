$(document).ready(function(){

    /* The Name of the logged in user is dynamically rendered */

    $('header > h1').append(sessionStorage.getItem('firstname'));
    
    /* The Scroll function is implemented inorder to remove the disability of the checkbox */

    $('#tnc').scroll(function(){
        scrollheight=$('#tnc').scrollTop();
        if(scrollheight>500)
        {
            $('#agree').removeAttr('disabled');
        }
    });
    
    $('#start').click(function(){
        if($('#agree').prop('checked')==true)
        {
            window.location.href='../app/dashboard.html';
        }
        else    
        {
            $('.feedback').text('Please accept terms and conditions');
        }
    });
});