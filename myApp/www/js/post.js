$(document).ready(init);
	function init(){
		//console.log($('#searchbar').val());
		
		$('#SaveButton').click(runWatchSearch);
		
		
	}
	function runWatchSearch(){
					var FETCH_TRIPLES_URL = "http://people.rit.edu/cmb7743/FacetTests/php/fetchtriples.php?n=";
					var value = $.trim($('#comment').val());
					
					var url =  FETCH_TRIPLES_URL+value;
					console.log(url);
					$.getJSON(url).done(function(data){
					
					watchDataLoaded(data);});
					}
					
function watchDataLoaded(data){
						if(data.results){
						var results = data.results;
						var current=results[0];
						if(results.length!=0){
						
						$('#Title').text(current.productTitle);
					
						}
						else{
						$('#Title').text("no results found");
						}
						
						}
	}
