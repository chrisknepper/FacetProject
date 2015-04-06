window.onload = function() {
	$('#simulateButton').on('click', function() {
		var url = '/ping';
		$.get(url, {}, function(data) {
			console.log(data);
		});
	});
}