function init() {
	function switchMenu(active){
    	$(active).css('zIndex', '70');    
	}
	$(document).ready(function(e) {
		$('#model iframe').attr('src', 'https://sketchfab.com/models/04e3d5fe3f9046aa9f2ab62ffece4fce/embed?autostart=1');
	});
	var container = document.querySelector('#container');
    $('#movementm').click(function(){switchMenu('#movement');});
    $('#featuresm').click(function(){switchMenu('#features');});
    $('#variationsm').click(function(){switchMenu('#variations');});
    $('#inspirationm').click(function(){switchMenu('#inspiration');});  
    $('#externalm').click(function(){switchMenu('#external');});
    $('#buym').click(function(){switchMenu('#buy');});
    $('.back').click(function(){
        //var category=this.parent();
         $(this).parent().css('zIndex', '-1');
         console.log('hi');
         
    })
}
