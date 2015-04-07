var path = require('path'); 
var express = require('express');  
var compression = require('compression');  
var favicon = require('serve-favicon'); 
var cookieParser = require('cookie-parser'); 
var mongoose=require('mongoose');
var http = require('http'); //the http module will be stored as the variable http
var fs = require('fs'); //the file system module for file/folder functions stored as the variable fs
//import the websocket library. There are many, but socket.io is one of the most common and feature rich
var socketio = require('socket.io');

var bodyParser=require('body-parser');
//pull in our routes
var router = require('./router.js'); 

var server;  
//handle db stuff
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('facetCatalog.sqlite');
var check;
var users = {};


var port = process.env.PORT || process.env.NODE_PORT || 3000;

//read the client html file into memory
//__dirname in node is the current directory (in this case the same folder as the server js file)
var index = fs.readFileSync(__dirname + '/../client/client.html');

var app = express();
app.use('/assets', express.static(path.resolve(__dirname+'../../client/'))); 
app.use(compression()); 
app.use(bodyParser.urlencoded({
	extended:true
}));
                                                     
app.set('view engine', 'jade'); 
app.set('views', __dirname + '/views'); 
app.use(favicon(__dirname + '/../client/img/favicon.png')); 
app.use(cookieParser()); 

router(app); 

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
	 console.log("querydb");
	 runQuery(updateProduct);
	function runQuery(callback){
            db.each("SELECT tagID AS id, productTitle FROM tagInfo where tagID="+id, function(err, rows){
                if (err){
                    // call your callback with the error
                    callback(err);
                    //return;
                }
                // call your callback with the data
				console.log(rows);
                callback(null, rows);
                //return;
            });
        }

 }
 function updateProduct(err,rows){
	 console.log(rows);
	 
	 console.log("in update product");
	 if(err) console.log("error with message");
	 else{
	 console.log(rows.id + ": " + rows.productTitle);
				title=rows.productTitle;
				console.log("queryDB:Title:"+title);
	  	var messageData = {
			title: "title for "+title
			};
			io.sockets.in('room1').emit('select', messageData);
				
			
	 
		}
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

server = app.listen(port, function(err) { 
    if (err) {
      throw err;
    }
    console.log('Listening on port ' + port);
});