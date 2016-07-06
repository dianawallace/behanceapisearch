// when form submission use this for example 
// paramaters of api call
// a function to handle data 
// $.getJSON(url, parameters, function to handle data)

$(function() {

    $('form').submit(function(e) {
        e.preventDefault();
        var artists = $(this).find("input[name='artists']").val();
        console.log(artists);


        var behance_url = 'https://api.behance.net/v2/users?';
        var parameters = {
            dataType: 'jsonp',
            q: artists,
            client_id: 'FqBdMrhgGDU37dYsu4NfGTkW4gm3B1Yn',

        };

        function getArtist(data) {
            console.log(data);
        }
        //$.getJSON(behance_url, parameters, getArtist);

    //    function jsonCallback(json){
    //    console.log(json);
    //    }

    $.ajax({
        url: 'https://api.behance.net/v2/users',
        data: parameters,
        dataType: "jsonp", //use jsonp to avoid cross origin issues
        type: "GET",
        success: function getData(data) {
            console.log(data);
            if (data.ok) {
                if (data.count > 0) {
                    //$.each is a higher order function. It takes an array and a function as an argument.
                    //The function is executed once for each item in the array.
                    $.each(data.result.items, function(i, item) {
                        var popularArtists = showResults(item);
                        $('.results').append(popularArtists);
                    });
                }
                else {
                    $('<p>No artists found.</p>').appendTo('.results');
                }
            }
            else {
                $('.results').empty();
                alert(data.error);
            }
        }

    });
    }); // end of form

    // Top artists search on Behance 
    var showResults = function(artists) {

        // clone our result template code
        var result = $('.templates .user').clone();

        // Show the artists name in result
        var displayName = result.find('.display_name');
        //displayName.attr('href', answerers.user.link);
        displayName.html('<a target="_blank" https://api.behance.net/v2/users' + artists.user.user_id + '/' + artists.user.display_name + '">' + artists.user.display_name + '" </a>');

        console.log(artists);

        //show artists fields in result
        result.find('.fields').text(artists.user.fields);

        //show artists post count in result
        result.find('.country').text(artists.country);

        return result;
    };



}); // end of jQuery
