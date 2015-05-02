function init() {
	$('body').removeClass('prevent-horizontal-scroll');
	var container = document.querySelectorAll('.tileContainer');
	for (var i = 0; i < container.length; i++) {
		var msnry = new Masonry( container[i], {
			// options
			columnWidth: 280,
			gutter: 10
		});
	};
}
