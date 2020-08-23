$(document).ready(function(){
    marks=0;
    $('header > h1').append(sessionStorage.getItem('firstname'));
    $.get('../app/results.php',{action:'getLeaderBoard'},function(data){
        $.each(data,function(index,item){
            var h4=document.createElement('h4');
            var text=document.createTextNode(item.name+' - '+item.score);
            h4.appendChild(text);
            document.getElementById('contestants').appendChild(h4);            
        });
    },'JSON');
    $('#logout').click(function(){
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('firstname');
        sessionStorage.removeItem('lastname');
        window.location.href='../public/index.html';
    });
    $.ajax({
        url:'../app/questions.php',
        data:{action:'getQuestions'},
        type:'POST',
        dataType:'JSON',
        success:function(data)
                {
                    index=0;
                    qn=1;
                    answers=[];
                    $('.question > h5 > span').text(qn);
                    putQuestions(data);
                    $('label').click(function(){
                        if($(this).attr('value')==data[index].result)
                        {
                            marks++;
                        }
                        index++;
                        qn++;
                        $('.question > h5 > span').text(qn);
                        putQuestions(data);
                    });
                    $('#finish').click(function(){
                        var fname=sessionStorage.getItem('firstname');
                        var lname=sessionStorage.getItem('lastname');
                        var fullname=fname+' '+lname;
                        $.post('../app/results.php',{action:'result',name:fullname, score:marks});
                        window.location.href='../app/results.html';
                    });
                }
    });
    function putQuestions(data)
    {
        $('.question > h1').text(data[index].id+') '+data[index].questions);
        $('label[for="opt1"]').text('a) '+data[index].option1).attr('value',data[index].option1);
        $('label[for="opt2"]').text('b) '+data[index].option2).attr('value',data[index].option2);
        $('label[for="opt3"]').text('c) '+data[index].option3).attr('value',data[index].option3);
        $('label[for="opt4"]').text('d) '+data[index].option4).attr('value',data[index].option4);
        $('label').addClass('border');
    }
});