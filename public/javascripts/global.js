//This file is loaded only the first time the user browses to a page on the site (in the current tab/session)
//Implements loading the pages via ajax to be able to fade between them
//also manipulating browser/url history and calling respective pages' init functions if they exist
$(document).ready(function() {


//Leap motion stuff
//From https://github.com/RudeDude/LeapScroll/blob/master/LeapScroll.js
//We need to modify this to make it pinch to zoom
function runScript(){
        var e={};
        var t={};
        var n=document.body;
        Leap.loop(function(t){
                var r={};
                var i={};
                for(var s=0, o=t.pointables.length; s!=o; s++){
                        var u=t.pointables[s];
                        var a=e[u.id];
                        var f=n.scrollTop;
                        if(document.hasFocus()){
                                if(u.tipPosition[1]-325>0){n.scrollTop=f-=150}
                                if(u.tipPosition[1]-125>0){n.scrollTop=f-=5}
                                if(u.tipPosition[1]-90<0){n.scrollTop=f+=5}
                        }
                }
        })
}
if(typeof Leap=="undefined"){
        var jsCode=document.createElement("script");
        jsCode.setAttribute("src","https://js.leapmotion.com/0.2.0/leap.min.js");
        jsCode.onload=runScript;document.body.appendChild(jsCode)
}else{
        runScript()
}

	//Detect whether we are using HTTPS, if so we also use WSS (secure websocket)
	var socketProtocol = window.location.protocol.indexOf('s') > -1 ? 'wss' : 'ws';
	var socketURL = socketProtocol + '://' + window.location.host;
	var exampleSocket = new WebSocket(socketURL);
	exampleSocket.onopen = function (event) {
		//exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
	};
	exampleSocket.onmessage = function (event) {
		var dataObj = JSON.parse(event.data);
		var message = dataObj.msg;
		if(window.location.href.indexOf('simulate') === -1 && window.location.href.indexOf('ping') === -1) {
			goToURL('/product/' + message.watchInfo.id); //Only navigate away if we aren't on the ping or simulate pages
		}
	}
	if(window.sessionStorage.usingAjaxNav != 1) {
		init();
	}
	$('.go-to-page').on('click', function(e) {
		e.preventDefault();
		goToURL($(this).attr('href'));
	});
});

function goToURL(url) {
	window.sessionStorage.usingAjaxNav = 1;
	$('body').css('opacity', '0');
	$.get(url, {someData: 'data'}, function(result) {
		$('body').html(result);
		$('body').css('opacity', '1');
		history.pushState(null, null, url);
		init(); //Call the new page's init function only if there is one :D\
		window.sessionStorage.usingAjaxNav = 0;
	});
}
