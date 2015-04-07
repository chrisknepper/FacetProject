window.onload = function() {
	var exampleSocket = new WebSocket("wss://facetnfctest.herokuapp.com/");
	exampleSocket.onopen = function (event) {
		//exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
	};
	exampleSocket.onmessage = function (event) {
		var el = document.getElementById('currentDevice');
		var dataObj = JSON.parse(event.data);
		var message = dataObj.msg;
		var deviceID = message.connectionId;
		el.innerHTML = "The current device ID connected is " + deviceID;
	}
}