$(document).ready(function () {

    console.log("CONNECTED");

    let sports = ["cricket", "football", "basketball", "lacrosse", "badminton", "field hockey", "surfing", "soccer", "tennis", "volleyball", "ice hockey"];

    buttonGenerator(sports);

    $('body').on('click', '.giphy-search-btn', function (event) {

        event.preventDefault();

        clearTarget($('#giphy-viewer'));

        let query = $(this).attr('data-attribute');

        let queryURL = generateQueryURL(query);

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updateGiphyViewer)
    });

    $('#addSport').on('click', function (event) {
        event.preventDefault();
        //THIS FUNCTION TAKES .VAL FROM INPUT AS A VARIABLE
        clearTarget($('#sportsButtons'));
        let newSport = $('#sport-input').val().trim();
        newSport.toString();
        //PUSHES THE .VAL ONTO THE ARRAY OF BUTTONS
        sports.push(newSport);
        //CLEARS ALL BUTTONS AND REGENERATES ANEW
        buttonGenerator(sports);

    })

    function updateGiphyViewer(response) {

        let count = response.pagination.count;

        for (let i = 0; i < count; i++) {
            let $target = $('#giphy-viewer');
            let $giphyDiv = $('<div>').addClass('giph-div');
            let $rating = $('<div>').html(`<h6>Rating:${response.data[i].rating} </h6>`);
            let $giphy = $('<img>').attr('src', response.data[i].images.fixed_width.url);
            $giphyDiv.append($rating).append($giphy);
            $target.append($giphyDiv);
        } /*end for loop*/
    }

    function buttonGenerator(arr) {
        //function to generate button for array input
        let $target = $('#sportsButtons');
        //if statement to run same function for single string item or value needed(!)
        arr.forEach(function (item) {
            let $button = $('<button>');
            $button.text(`${item}`);
            $button.addClass('giphy-search-btn btn btn-sm btn-info');
            $button.attr('data-attribute', item);
            $target.append($button);
        })
    }

    function generateQueryURL(query) {

        let baseURL = "https://api.giphy.com/v1/gifs/";
        let apikey = "PW1vGxATHQSLxVgoWYhQmuqL7Dq0V9K0";
        let searchFor = query;
        let limitResultsTo = 9;

        let queryURL = `${baseURL}search?api_key=${apikey}&q=${searchFor}&limit=${limitResultsTo}`;
        queryURL.toString();

        console.log(queryURL);
        return queryURL;
    }

    function clearTarget($target) {
        $target.empty();
    }

}); /*END DOCUMENT READY*/



