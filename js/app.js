// my behance api key: FqBdMrhgGDU37dYsu4NfGTkW4gm3B1Yn

$(document).ready( function() {
	$('.artist-getter').submit( function(e){
		e.preventDefault();
		// zero out results if previous search has run
		//$('.results').html('');
		// get the value of the tags the user submitted
		var artists = $(this).find("input[name='artists']").val();
		getArtist(artists);
	});

// Top artists search on Behance 
var showResults = function(artists) {
	
	// clone our result template code
	var result = $('.templates .user').clone();
	
	// Show the artists name in result
	var displayName = result.find('.display_name');
	//displayName.attr('href', answerers.user.link);
	displayName.html('<a target="_blank" https://api.behance.net/v2/users' + artists.user.user_id + '/' + artists.user.display_name +'">'+ artists.user.display_name +'" </a>');

	console.log(artists);
	
	//show artists fields in result
	result.find('.fields').text(artists.user.fields);
	
	//show artists post count in result
	result.find('.country').text(artists.country);
	
	return result;
};


// search popular artistss 
var getArtist = function(artists) {

	// the parameters we need to pass in our request to Behance's API
	var requestData = {
		tag: artists, 
		site: 'behance',
		api_key: 'FqBdMrhgGDU37dYsu4NfGTkW4gm3B1Yn'
	};
	
	//myCallbackFunction({
    //    http:behance.net/v2/users/?api_key=1234567890&callback=myCallbackFunction
    //});
    
    //$.getJSON(ApiURL, paramsOfApi, functionToDoSomethingWithApi);
    
	$.ajax({
		url: "https://api.behance.net/v2/users?q=api_key/" + requestData.tag + '/top-artists/',
		data: requestData,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET",
        success: function getData(data) {
	 	    if (data.ok) {
	 	        if (data.count > 0) {
	 	     	//$.each is a higher order function. It takes an array and a function as an argument.
		        //The function is executed once for each item in the array.
		            $.each(data.result.items, function(i, item) {
			            var popularArtists = showResults(item);
			            $('.results').append(popularArtists);
		                });   
	 	        } else {
	 	            $('<p>No artists found.</p>').appendTo('.results');
	 	            }
	 	     } else {
	 	        $('.results').empty();
	 	         //alert(data.error);
	 	            }
	 	        }	
	     })
    };

}); // end of jQuery
