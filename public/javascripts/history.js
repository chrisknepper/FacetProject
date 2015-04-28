function init() {
	var hiddenItems, currentGallery, currentGalleryLength;
	console.log('history init');

	$('.watchHistorySelect').on('click', function(e) {
		handleFocusSwitch($(this), '.person', togglePerson);
	});

	$('.person > .close').on('click', function(e) {
		e.preventDefault();
		togglePerson($(this).parent());	
	});

	$('.galleryContainer > .close').on('click', function(e) {
		e.preventDefault();
		if($('.galleryChild.expanded').length === 0) {
			unloadGallery($(this).parent());
		}
		else {
			unloadSlide($(this).parent());
		}
	});

	$('.person > .expand').on('click', function(e) {
		e.preventDefault();
		handleFocusSwitch($(this), '.galleryContainer', loadGallery);		
	});

	$('.galleryChild').on('click', function(e) {
		$('.galleryChild').removeClass('expanded');
		$(this).addClass('expanded');
		hiddenItems = new Array();
		$(this).siblings().each(function() {
			hiddenItems.push($(this));
			$(this).hide();
		});
		updateInfoSnippet($(this).data('text'));
		$('#infoSnippet').toggleClass('visible');
		//currentGallery.masonry();
	});

	$('#infoSnippet .back').on('click', function(e) {
		var prev = $('.galleryChild.expanded').prev('.galleryChild');
		if(prev.length > 0) {
			$('.galleryChild.expanded').each(function() {
				$(this).removeClass('expanded');
				hiddenItems.push($(this));
				$(this).hide();
			});
			$(prev[0]).show(0, function() {
				$(prev[0]).addClass('expanded');
			});
			currentGallery.masonry();
			updateInfoSnippet();
		}
	});

	$('#infoSnippet .forward').on('click', function(e) {
		var next = $('.galleryChild.expanded').next('.galleryChild');
		if(next.length > 0) {
			$('.galleryChild.expanded').each(function() {
				$(this).removeClass('expanded');
				hiddenItems.push($(this));
				$(this).hide();
			});
			$(next[0]).show();
			$(next[0]).addClass('expanded');
			currentGallery.masonry();
			updateInfoSnippet();
		}
	});
}

var loadGallery = function(container) {
	currentGallery = container.children('.gallery').first();
	currentGalleryLength = container.find('.galleryChild').length;
	imagesLoaded(currentGallery[0], function() {
		msnry = new Masonry( currentGallery[0], {
			// options
			columnWidth: 1, //WHY ISN'T THIS MORE DOCUMENTED
			gutter: 0,
			itemSelector: '.galleryChild'
		});
	});

	$(container).toggle(400);
	$(container).toggleClass('visible');
}

var togglePerson = function(container) {
	$(container).toggle(400);
	$(container).toggleClass('visible');
}

var unloadGallery = function(container) {
	$(container).toggle(400, function(e) {
		currentGallery.masonry('destroy');
	});
	$(container).toggleClass('visible');
}

var unloadSlide = function(container) {
	$('.galleryChild').removeClass('expanded');
	for (var i = 0; i < hiddenItems.length; i++) {
		hiddenItems[i].show();
	};
	setTimeout(function() { //This is a bad way to do this, but masonry's .reveal method seems broken
		currentGallery.masonry();
	}, 700);
	$('#infoSnippet').removeClass('visible');
	
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
	if($('.galleryChild.expanded').prev('.galleryChild').length === 0) {
		$('#infoSnippet .back').css('opacity', '0.5');
	}
	else {
		$('#infoSnippet .back').css('opacity', '1');
	}
	if($('.galleryChild.expanded').next('.galleryChild').length === 0) {
		$('#infoSnippet .forward').css('opacity', '0.5');
	}
	else {
		$('#infoSnippet .forward').css('opacity', '1');
	}
	var ind = $('.galleryChild.expanded').index() + 1;
	$('#infoSnippet .slideCount').text(ind + '/' + currentGalleryLength);
	if(text) {
		$('#infoSnippet .text').text(text);
	}
}
