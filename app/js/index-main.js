$(document).ready(function(){
    flag=true;
    
    // Checking whether the password matches the confirm password

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

    // Action to be performed while clicking on register button

    $('#reg-submit').click(function(){
        if(isNotEmpty('reg')&&flag)
        {
            sendData('reg');
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

    // Action to be performed while clicking to login button*

    $('#login-submit').click(function(){
        if(isNotEmpty('log'))
        {
            // Redirected to welcome.html if all cases are evaluated to true
            sendData('log');
        }
        else
        {
            $('.feedback:even').html('<b>Please Enter your Email and Password</b>');
        }
    });

    // Function that checks emptiness of fields

    function isNotEmpty(modal)
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

    // The user data is retrieved using DOM and sent to the welcome.html using asynchronously

    function sendData(action)
    {
        if(action=='reg')
        {
            var user={
                fname:$('#signup-firstname').val(),
                lname:$('#signup-lastname').val(),
                email:$('#signup-email').val(),
                pwd:$('#signup-cpassword').val()
            };
        }
        else if(action=='log')
        {
            var user={
                email:$('#login-email').val(),
                pwd:$('#login-password').val()
            };
        }
        var user_data=JSON.stringify(user);
        $.ajax({
            url:'../app/index-validate.php',
            data:{action:action,user:user_data},
            type:'POST',
            dataType:'JSON',
            success:function(data)
                    {
                        if(data.result=='failure')
                        {
                            if(action=='reg')
                            {
                                $('.feedback:odd').html('<b>'+data.message+'</b>');
                            }
                            else if(action=='log')
                            {
                                $('.feedback:even').html('<b>'+data.message+'</b>');
                            }
                        }
                        else if(data.result=='success')
                        {
                            sessionStorage.setItem('id',data.id);
                            sessionStorage.setItem('firstname',data.firstname);
                            sessionStorage.setItem('lastname',data.lastname);
                            window.location.href="../app/welcome.html";
                        }
                    }
                    
        });
    }
});