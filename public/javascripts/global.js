//This file is loaded only the first time the user browses to a page on the site (in the current tab/session)
//Implements loading the pages via ajax to be able to fade between them
//also manipulating browser/url history and calling respective pages' init functions if they exist
$(document).ready(function() {

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
		/* Three.js doesn't work after navigating pages...trying to figure it out */
		/*
		window.cancelAnimationFrame(frame);
		renderer.domElement.addEventListener('dblclick', null, false);
		frame = null;
		scene = null;
		camera = null;
		renderer = null;
		*/
		$('#ThreeJS').empty();
		$('body').html(result);
		$('body').css('opacity', '1');
		history.pushState(null, null, url);
		init(); //Call the new page's init function only if there is one :D\
		window.sessionStorage.usingAjaxNav = 0;
	});
}
