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
                //project_ajax(data.users);
            }
        });
    }); // end of form

    // artists search on Behance 
    var showResults = function(artists) {
        //console.log(project);
        // clone our result template code
        var result = $('.templates .user').clone();

        //console.log(artists);
        $.each(artists, function(i, u) {
                //console.log(u.display_name);
                var the_images = u.images;
                var user_name = u.username;
                var the_name = u.display_name;
                var the_fields = u.fields;
                var the_location = u.location;
                var the_stats = u.stats;
                // console.table(the_stats);
                // console.log(the_location);

                //show artist results
                var name_list = $('.names');
                // implement artist information here
                if (artist.toLowerCase() == u.display_name.toLowerCase()) {
                    var template = '<ul class="name_list"> <li> <img src = "' + the_images['138'] + '"/>' + '</li> <a target="_blank" href="https://www.behance.net/' + u.username + '">' +
                        the_name + ' </a></li>' + '<li> ' + the_fields + '</li>' + '<li> ' + the_location + '</li> ' + '<li> ' + 'Appreciations: ' + the_stats.appreciations + '</li> '+ '<li> ' + 'Followers: ' + the_stats.followers + '</li></ul>';
                    name_list.append(template);
                }
                get_projects(u.username);
                
            });
        return result;
    };
        // show artist projects here
    /*    function project_ajax(username) { 
            
        var project_url = 'https://api.behance.net/v2/users?' + '/projects?client_id=FqBdMrhgGDU37dYsu4NfGTkW4gm3B1Yn';
        var parameters = {
            dataType: 'jsonp',
           client_id: 'FqBdMrhgGDU37dYsu4NfGTkW4gm3B1Yn',
        };
        $.ajax({
            url: 'https://api.behance.net/v2/users/' + username + '/projects',
            data: parameters,
            type: "GET",
            success: function getData(data) {
                get_projects(data.users);
            
            }
            */
        //});
     // end of form
            //function get_projects(this_finally_works) {
                //console.log(this_finally_works);
           // }
        function get_projects(username) {
            $.getJSON('https://api.behance.net/v2/users/' + username + '/projects?client_id=FqBdMrhgGDU37dYsu4NfGTkW4gm3B1Yn&callback=?', function(projects){
               console.log(projects.projects); 
               $.each(projects.projects, function(i, project){
                console.log(projects); 
                
                var project_list = $('.projects');
                var the_name = project.name;
                var the_covers = project.covers['115'];
                var the_owners = project.owners;
                // console.log(the_name, the_covers);
                
                if (artist.toLowerCase() == project.owners[0].display_name.toLowerCase()) {
                    var template = "<ul class='projects_list'><li><img src='" + project.covers['202'] + "'/>" + "</li><li>" + project.name + "</li></ul>";
                $('.projects').append(template); 
                }
               }); 
            })
            
        }; //end of get project function
}); // end of jQuery