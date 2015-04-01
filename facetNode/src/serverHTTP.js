var http = require('http'); //the http module will be stored as the variable http
var fs = require('fs'); //the file system module for file/folder functions stored as the variable fs
//import the websocket library. There are many, but socket.io is one of the most common and feature rich
var socketio = require('socket.io');
//handle db stuff
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('facetCatalog.sqlite');
var check;
var users = {};


var port = process.env.PORT || process.env.NODE_PORT || 3000;

//read the client html file into memory
//__dirname in node is the current directory (in this case the same folder as the server js file)
var index = fs.readFileSync(__dirname + '/../client/client.html');

//function to handle requests
//will automatically receive request and response from the http server
function onRequest(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(index); 
    response.end(); 
}

	


var app = http.createServer(onRequest).listen(port);

//pass in the http server into socketio and grab the websocket server as io
var io = socketio(app);
 
 //function to handle new object selected
 var onSelect=function(socket){
	 socket.on("select", function(data) {
		 console.log("in select");
		 var id=data.label;
		 queryDB(id);
		
	 });
	 
 };
 var onJoined = function(socket) {
		socket.on("join", function(data) {
    
        
        var joinMsg = {
            name: 'server', 
            msg: 'There are ' + Object.keys(users).length + ' users online'
        };
    
		socket.emit('msg', joinMsg);
		
        //the socket as 'name'. Now anywhere I have this socket, I will know that client's name
		socket.name = data.name;
		users[socket.name] = socket.name;
		
		socket.join('room1');
		
        //This emits a message of type 'msg' to room1 and sends some json saying who joined the room.
		socket.broadcast.to('room1').emit('msg', { name: 'server', msg: data.name + " has joined the room."} );
		
		console.log(data.name + ' joined');
		
        //Emit a message back to this client socket of type 'msg' notifying them they successfully joined the room
		socket.emit('msg', {name: 'server', msg: 'You joined the room'});
	});
};
 function queryDB(id){
	 var title;
	   db.each("SELECT tagID AS id, productTitle FROM tagInfo where tagID="+id, function(err, row) {
				console.log(row.id + ": " + row.productTitle);
				title=row.productTitle;
				console.log("queryDB:Title:"+title);
				var messageData = {
			title: "title for "+title
			};
		 socket.broadcast.to('room1').emit('select', messageData);
				
			});
			if(title){
			//updateProduct(title);
			}
 }
 function updateProduct(title){
	 console.log("in update product");
	  
	 
	 
 }
function closeDb() {
    console.log("closeDb");
    db.close();
}
console.log('starting up');
io.sockets.on("connection", function(socket) {

    console.log('started');
    
    //call the functions to attach handlers and send in the new socket connect
    onSelect(socket); 
	onJoined(socket)
	
});

