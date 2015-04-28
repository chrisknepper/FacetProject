function init() {
	function switchMenu(active){
    	$(active).css('zIndex', '70');    
	}
	
	var container = document.querySelector('#container');
    $('#watchesm').click(function(){switchMenu('#watches');});
    $('#technologym').click(function(){switchMenu('#technology');});
    $('#eventm').click(function(){switchMenu('#event');});
    $('#iconm').click(function(){switchMenu('#icons');});  
    $('#historym').click(function(){switchMenu('#history');});
    $('#achievementsm').click(function(){switchMenu('#achievements');});
    $('.back').click(function(){
        //var category=this.parent();
         $(this).parent().css('zIndex', '-1');
         
         
    })
}
