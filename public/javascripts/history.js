var hiddenItems, currentGallery, currentGalleryLength, currentExpandedIndex, currentGalleryChild, msnry;
function init() {

	console.log('history init');

	$('.watchHistorySelect').on('click', function(e) {
		handleFocusSwitch($(this), '.person', togglePerson);
	});

	$(document).on('click', '#watchHistory > .close', function(e) {
		unloadSlide();
	});

	$('.person > .close').on('click', function(e) {
		e.preventDefault();
		togglePerson($(this).parent());	
	});

	$('.galleryContainer > .close').on('click', function(e) {
		e.preventDefault();
		$('#infoSnippet').removeClass('visible');
		if($('.galleryChildExpanded').length === 0) {
			unloadGallery($(this).parent());
		}
		else {
			unloadSlide();
		}
	});

	$('.person > .expand').on('click', function(e) {
		e.preventDefault();
		handleFocusSwitch($(this), '.galleryContainer', loadGallery);		
	});

	$('.galleryChild').on('click', function(e) {
		currentExpandedIndex = $(this).index();
		currentGalleryChild = $(this).parent();
		var bigImage = $(this).clone();
		bigImage.removeClass('galleryChild');
		bigImage.addClass('galleryChildExpanded');
		bigImage.append($('.close.icon-close_icon').first().clone());
		$('#watchHistory').prepend(bigImage);
		updateInfoSnippet(bigImage.data('text'));
		window.setTimeout(function() {
			$('#watchHistory > .galleryChildExpanded').addClass('visible');
			$('#infoSnippet').addClass('visible');
		}, 100);
	});

	$('#infoSnippet .back').on('click', function(e) {
		currentExpandedIndex = currentExpandedIndex - 1;
		switchSlide();
	});

	$('#infoSnippet .forward').on('click', function(e) {
		currentExpandedIndex = currentExpandedIndex + 1;
		switchSlide();
	});
}

var loadGallery = function(container) {
	$(container).toggleClass('visible');
	window.setTimeout(function() {
		container.addClass('loading');
	}, 500);
	window.setTimeout(function() {
		currentGallery = container.children('.gallery').first();
		currentGalleryLength = container.find('.galleryChild').length;
		imagesLoaded(currentGallery[0], function() {
		msnry = new Masonry( currentGallery[0], {
		// options
		columnWidth: 1, //WHY ISN'T THIS MORE DOCUMENTED
		gutter: 0,
		itemSelector: '.galleryChild'
		});
		container.removeClass('loading');
		});
		window.setTimeout(function() {
			currentGallery.addClass('visible');
		}, 300);
		
	}, 1000);	
}

var togglePerson = function(container) {
	//$(container).toggle(400);
	$(container).toggleClass('visible');
}

var unloadGallery = function(container) {
	currentGallery.removeClass('visible');
	$(container).toggleClass('visible');
	msnry.destroy();
}

var switchSlide = function() {
	//Wrap slide navigation
	if(currentExpandedIndex < 0) {
		currentExpandedIndex = currentGalleryChild.children().length - 1;
	}
	if(currentExpandedIndex > currentGalleryChild.children().length -1) {
		currentExpandedIndex = 0;
	}
	var bigImage = currentGalleryChild.children().eq(currentExpandedIndex).clone();
	bigImage.removeClass('galleryChild');
	unloadSlide();
	bigImage.addClass('galleryChildExpanded');
	bigImage.append($('.close.icon-close_icon').first().clone());
	$('#watchHistory').prepend(bigImage);
	window.setTimeout(function() {
		$('#watchHistory > .galleryChildExpanded').addClass('visible');
		updateInfoSnippet(bigImage.data('text'));
	}, 100);

}

var unloadSlide = function(container) {
	$('.galleryChildExpanded').remove();	
}

var handleFocusSwitch = function(evtObj, selector, callback) {
	var selectedContainer = evtObj.next(selector);
	var selectedContainerVisible = selector + '.visible';
	var selectedContainerAnimated = selector + ':animated';
	if($(selectedContainerVisible).length === 0) {
		callback(selectedContainer);
	}
	else {
		$(selectedContainerVisible).toggle({
			duration: 400,
			always: function(e) {
				if($(selectedContainerAnimated).length === 0) {
					callback(selectedContainer);
				}
			}
		});
	}
}

var updateInfoSnippet = function(text) {
	$('#infoSnippet .slideCount').text((currentExpandedIndex + 1) + '/' + currentGalleryLength);
	$('#infoSnippet .text').html(text);
}
