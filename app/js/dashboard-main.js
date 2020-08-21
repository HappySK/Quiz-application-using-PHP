$(document).ready(function(){
    $('header > h1').append(sessionStorage.getItem('firstname'));
    $.ajax({
        url:'../app/questions.php',
        data:{action:'getQuestions'},
        type:'POST',
        dataType:'JSON',
        success:function(data)
                {
                    $.each(data,function(index,item){
                        $('.question > h1').append(item.questions);
                        $('.options').append('<br>'+item.option1+'<br>');
                        $('.options').append(item.option2+'<br>');
                        $('.options').append(item.option3+'<br>');
                        $('.options').append(item.option4+'<br>');
                    });
                }
    });
});