window.onload = function() {
	$('#simulateButton').on('click', function() {
		var url = '/ping';
		var timestamp = new Date().getTime();
		$.get(url, {watch: timestamp}, function(data) {
			console.log(data);
		});
	});
}