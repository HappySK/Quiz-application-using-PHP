$(document).ready(function(){
    flag=true;
    $('#signup-cpassword').keyup(function(){
        if($('#signup-cpassword').val()==$('#signup-password').val())
        {
            $('.feedback').html('<b>Password Matched</b>');
            flag=true;
        }
        else
        {
            $('.feedback').html('<b>Password Mismatch</b>')
            flag=false;
        }
    });
    $('#reg-submit').click(function(){
        if(isEmpty('reg')&&flag)
        {
            window.location.href="../app/welcome.html";
        }
        else
        {
            if(flag)
            {
                $('.feedback:odd').html('<b>Please input all the fields</b>');
            }
            else
            {
                $('.feedback:odd').html('<b>Password Mismatch</b>');
            }
        }

    });
    $('#login-submit').click(function(){
        if(isEmpty('log'))
        {
            window.location.href="../app/welcome.html";
        }
        else
        {
            $('.feedback:even').html('<b>Please Enter your Email and Password</b>');
        }
    });
    function isEmpty(modal)
    {
        isNotEmpty=true;
        if(modal=='reg')
        {
            $('#signup').find('input').each(function(){
                if($(this).val()=='')
                {
                    isNotEmpty=false;
                }
            });
        }
        else if(modal=='log')
        {
            $('#signin').find('input').each(function(){
                if($(this).val()=='')
                {
                    isNotEmpty=false;
                }
            });
        }
        return isNotEmpty;
    }
});