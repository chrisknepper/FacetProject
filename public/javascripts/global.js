//This file is loaded only the first time the user browses to a page on the site (in the current tab/session)
//Implements loading the pages via ajax to be able to fade between them
//also manipulating browser/url history and calling respective pages' init functions if they exist
$(document).ready(function() {
	var curInit = init;
	init();
	$('.go-to-page').on('click', function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		$('body').css('opacity', '0');
		$.get(url, {someData: 'data'}, function(result) {
			$('body').html(result);
			$('body').css('opacity', '1');
			history.pushState(null, null, url);
			console.log(curInit);
			if(curInit !== init) {
				init();
			}
		});
	});
});
