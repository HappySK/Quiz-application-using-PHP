$(document).ready(function(){
    $('header > h1').append(sessionStorage.getItem('firstname'));
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