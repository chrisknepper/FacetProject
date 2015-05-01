function init() {
    var title=$('.position').text();
    var watchid='#'+title;
    console.log(watchid);
    console.log()
    $(watchid).addClass('selected');
    indicateClass();
	function switchMenu(active){
    	$(active).css('zIndex', '70');    
	}
	
	var container = document.querySelector('#container');
    /*$('#watchesm').click(function(){switchMenu('#watches');});
    $('#technologym').click(function(){switchMenu('#technology');});
    $('#eventm').click(function(){switchMenu('#event');});
    $('#iconm').click(function(){switchMenu('#icons');});  
    $('#historym').click(function(){switchMenu('#history');});
    $('#achievementsm').click(function(){switchMenu('#achievements');});
    $('.back').click(function(){
        //var category=this.parent();
         $(this).parent().css('zIndex', '-1');
         
         
    })
    */
    function indicateClass(){
        var categories=['#watchesm','#technologym', '#eventm', '#iconm', '#historym', '#achievementsm'];

        for(var i=0;i<categories.length; i++){
            var cat=$(i).dataset.status;
            if(cat==true){
                $(i).addClass('true');
                console.log(i+'is selected');
            }
        }
    }
    
}
