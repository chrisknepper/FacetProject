window.onload = function() {
	var container = document.querySelector('#container');
	var msnry = new Masonry( container, {
		// options
		columnWidth: 280,
		itemSelector: '.item',
		gutter: 10
	});
	//Detect whether we are using HTTPS, if so we also use WSS (secure websocket)
	var socketProtocol = window.location.protocol.indexOf('s') > -1 ? 'wss' : 'ws';
	var socketURL = socketProtocol + '://' + window.location.host;
	var exampleSocket = new WebSocket(socketURL);
	exampleSocket.onopen = function (event) {
		//exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
	};
	exampleSocket.onmessage = function (event) {
		var el = document.getElementById('currentDevice');
		el.style.display = 'block';
		var dataObj = JSON.parse(event.data);
		var message = dataObj.msg;
		var watchResult = message.watchInfo;
		//console.log(watchResult);
		el.innerHTML = '<h1>' + watchResult.name + '</h1><h2>' + watchResult.collection + '</h2>';
	}
}