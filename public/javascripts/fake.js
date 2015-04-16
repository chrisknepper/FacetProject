window.onload = function() {
	$('#simulateButton').on('click', function() {
		var url = '/ping';
		var randomFakeWatch = Math.floor(Math.random() * 19 + 1);
		$.get(url, {watch: randomFakeWatch}, function(data) {
			console.log(data);
		});
	});
}