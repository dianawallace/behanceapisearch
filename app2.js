// when form submission use this for example 
// paramaters of api call
// a function to handle data 
// $.getJSON(url, parameters, function to handle data)

$(function() {
    var artist;
    $('form').submit(function(e) {
        e.preventDefault();
        artist = $(this).find("input[name='artists']").val();
        console.log(artist);

        var behance_url = 'https://api.behance.net/v2/users?';
        var parameters = {
            dataType: 'jsonp',
            q: artist,
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
                showResults(data.users);
                console.log(data.users);

                // if (data.ok) {
                //     if (data.count > 0) {
                //         //$.each is a higher order function. It takes an array and a function as an argument.
                //         //The function is executed once for each item in the array.
                //         $.each(data.result.items, function(i, item) {
                //                 var popularArtists = showResults(item);

                //                 $('.results').append(popularArtists);

                //         });
                //     }
                //     else {
                //         $('<p>No artists found.</p>').appendTo('.results');
                //     }
                // }
                // else {
                //     $('.results').empty();
                //     //alert(data.error);
                // }
            }
        });
    }); // end of form

    L.mapbox.accessToken = 'pk.eyJ1IjoiZGlhbmF3YWxsYWNlIiwiYSI6ImNpcWNmbDFkbzAyOG1mbG0xb3VyNnA1cXYifQ.MkDM9QfSVDxHas9Mk3f1pA';

    // Top artists search on Behance 
    var showResults = function(artists) {

        // clone our result template code
        var result = $('.templates .user').clone();

        // Show the artists name in result
        //var displayName = result.find('.display_name');
        //displayName.attr('href', artists.user.link);
        //displayName.html('<a target="_blank" https://api.behance.net/v2/users' + artists.users + '/' + artists.users.display_name + '">' + artists.users.display_name + '" </a>');

        console.log(artists);
        $.each(artists, function(i, u) {
            console.log(u.display_name);
            var the_name = u.display_name;
            var the_fields = u.fields;
            var the_country = u.country;
            var map; 
            //map.remove();
            var geocoder = L.mapbox.geocoder('mapbox.places');
                map = L.mapbox.map('map', 'examples.map-h67hf2ic');

            geocoder.query(the_country, showMap);

            function showMap(err, data) {
                // The geocoder can return an area, like a city, or a
                // point, like an address. Here we handle both cases,
                // by fitting the map bounds to an area or zooming to a point.
                if (data.lbounds) {
                    map.fitBounds(data.lbounds);
                }
                else if (data.latlng) {
                    map.setView([data.latlng[0], data.latlng[1]], 13);
                }
            }
                

            var name_list = $('.names');
            if (artist.toLowerCase() == u.display_name.toLowerCase()) {
                var template = '<ul class="name_list"><li> ' + the_name + '</li>' + '<li> ' + the_fields + '</li>' + '<li> ' + the_country + '</li></ul>';
                name_list.append(template);
            }
        })

        //show artists fields in result
        result.find('.fields').text(artists.fields);

        //show artists post count in result
        result.find('.country').text(artists.country);

        return result;
    };




}); // end of jQuery
