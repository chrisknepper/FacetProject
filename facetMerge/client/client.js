//The socket.io client library automatically makes a global for the library called io.
        //You can change it to use a different name instead if desired.
        var socket,user;
		function connectSocket() {
           
			var socket = io.connect();
			
            //when the socket connects, fire the connected function
            //The 'connect' event is automatically fired by socket.io when a socket connects
			socket.on('connect', function() {
				console.log('connecting');
				
				socket.emit('join', { name: user });
				
			});

			socket.on('select', function(data) {
				console.log(data.title);
                //document.getElementById("details").text=data.title;
				$('#details').text(data.title);
				
			});
		
			
		}
		function logProduct(){
		var tagName=$("#watchname").val();
			var data = {
					label:tagName
					};
			socket.emit("select", data);
		}
		function init() {
		socket = io.connect();
		user = 'user' + (Math.floor((Math.random()*1000)) + 1);
            connectSocket();
			$('#connect').click(logProduct);
		}
	
        //when the page is loaded, call init
		window.onload = init;