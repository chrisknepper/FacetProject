function init() {
    var title=$('.position').text();
    var watchid='#'+title;
    console.log(watchid);
    console.log()
    $(watchid).addClass('selected');
    $('#vscroll').animate({scrollTop:$(watchid).position().top}, 'slow')
   
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
        var values=['#watchesvalue','#technologyvalue', '#eventvalue', '#iconvalue', '#historyvalue', '#achievementsvalue'];

        for(var i=0;i<categories.length; i++){
            var thisone=categories[i];
            var thisvalue=values[i];
            console.log(categories[i]);
            var cat=$(thisvalue).text();
            console.log(cat);
            if(cat=='true'){
                $(thisone).addClass('true');
                
            }
            else if(cat != 'true'){
                $(thisone).addClass('false');
                
            }
            }
        
    }
    
}
