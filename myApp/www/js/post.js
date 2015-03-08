$(function(){
        $('form').submit(function(){
            var landmarkID = $(this).parent().attr('data-landmark-id');
            var postData = $(this).serialize();
            var postData2 = 'MAGICWATCH';
            
            $.ajax({
                type: 'POST',
                data: postData2,
                url: 'http://banjoboygames.com/test/save.php',
                success: function(data){
                    console.log(data);
                    alert('Your comment was successfully added');
                },
                error: function(){
                    console.log(data);
                    alert('There was an error adding your comment');
                }
            });
            
            return false;
        });
    });