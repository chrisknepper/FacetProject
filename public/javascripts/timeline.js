function init() {
	function switchMenu(active){
    	$(active).css('zIndex', '70');    
	}
	$(document).ready(function(e) {
		$('#model iframe').attr('src', 'https://sketchfab.com/models/04e3d5fe3f9046aa9f2ab62ffece4fce/embed?autostart=1');
	});
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
