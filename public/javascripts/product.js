function init() {
	function switchMenu(active){
		$(active).css('zIndex', '70');    
	}
    
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
		 
		 
	});
    var title=$('.position').val();
    var watchid='#'+title;
    console.log(watchid);
    console.log()
    $(watchid).addClass('selected');
}
