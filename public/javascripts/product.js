function init() {
	function switchMenu(active){
    	$(active).css('zIndex', '70');    
	}
	$(document).ready(function(e) {
		$('#model iframe').attr('src', 'https://sketchfab.com/models/04e3d5fe3f9046aa9f2ab62ffece4fce/embed?autostart=1');
	});
	var container = document.querySelector('#container');
	
	//Detect whether we are using HTTPS, if so we also use WSS (secure websocket)
	var socketProtocol = window.location.protocol.indexOf('s') > -1 ? 'wss' : 'ws';
	var socketURL = socketProtocol + '://' + window.location.host;
	var exampleSocket = new WebSocket(socketURL);
	exampleSocket.onopen = function (event) {
		//exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
	};
	exampleSocket.onmessage = function (event) {
		var el = document.getElementById('title');
		
		var dataObj = JSON.parse(event.data);
		var message = dataObj.msg;
		var deviceID = message.watchID;
		el.innerHTML =deviceID;
	}
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
