// when form submission use this for example 
// paramaters of api call
// a function to handle data 
// $.getJSON(url, parameters, function to handle data)

$(function() {
    var artist;
    $('form').submit(function(e) {
        e.preventDefault();
        // zero out results if previous search has run
        $('.names').html('');
        artist = $(this).find("input[name='artists']").val();

        var behance_url = 'https://api.behance.net/v2/users?';
        var parameters = {
            dataType: 'jsonp',
            q: artist,
            client_id: 'FqBdMrhgGDU37dYsu4NfGTkW4gm3B1Yn',
        };
        $.ajax({
            url: 'https://api.behance.net/v2/users',
            data: parameters,
            dataType: "jsonp", //use jsonp to avoid cross origin issues
            type: "GET",
            success: function getData(data) {
                //console.log(data);
                showResults(data.users);
                // console.log(data.users);
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
    var map = L.mapbox.map('map', 'examples.map-h67hf2ic');

    // artists search on Behance 
    var showResults = function(artists) {

        // clone our result template code
        var result = $('.templates .user').clone();

        //console.log(artists);
        $.each(artists, function(i, u) {
                // console.log(u.display_name);
                var the_images = u.images;
                var user_name = u.username;
                var the_name = u.display_name;
                var the_fields = u.fields;
                var the_location = u.location;
                var the_stats = u.stats;
                //console.log(u_stats);
                console.log(the_location);

                var geocoder = L.mapbox.geocoder('mapbox.places');

                geocoder.query(the_location, showMap);

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

                    L.mapbox.featureLayer({
                        // this feature is in the GeoJSON format: see geojson.org
                        // for the full specification
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            // coordinates here are in longitude, latitude order because
                            // x, y is the standard for GeoJSON and many formats
                            coordinates: [-77.03221142292,
                                38.913371603574
                            ]
                        },
                        properties: {
                            title: 'Peregrine Espresso',
                            description: '1718 14th St NW, Washington, DC',
                            // one can customize markers by adding simplestyle properties
                            // https://www.mapbox.com/guides/an-open-platform/#simplestyle
                            'marker-size': 'large',
                            'marker-color': '#BE9A6B',
                            'marker-symbol': 'cafe'
                        }
                    }).addTo(map);
                }
                //show artist results
                var name_list = $('.names');
                // implement map for each artist here
                if (artist.toLowerCase() == u.display_name.toLowerCase()) {
                    var template = '<ul class="name_list"> <li> <img src = "' + the_images['138'] + '"/>' + '</li> <a target="_blank" href="https://www.behance.net/' + u.username + '">' +
                        the_name + ' </a></li>' + '<li> ' + the_fields + '</li>' + '<li> ' + the_location + '</li> ' + '<li> ' + the_stats + '</li></ul>';
                    name_list.append(template);
                }
            });
            // show artists profile image
            //result.find('.images').attr('src', artists.images);

        //show artists fields in result
        //result.find('.fields').text(artists.fields);

        //show artists country in result
        //result.find('.location').text(artists.location);

        //show artists stats in result - followers and appreciations
        //result.find('.stats').text(artists.stats);

        return result;
    };
}); // end of jQuery
