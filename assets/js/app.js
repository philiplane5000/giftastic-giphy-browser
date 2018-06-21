$(document).ready(function () {

    console.log("CONNECTED");

    let topics = ["soccer", "nature", "cats", "dogs", "gardening", "surfing", "animals", "succulents"];

    buttonGenerator(topics);

    $('body').on('click', '.giphy-search-btn', function (event) {

        event.preventDefault();
        clearTarget($('#giphy-viewer'));

        let query = $(this).attr('data-attribute');
        let queryURL = generateQueryURL(query);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updateGiphyViewer)
    });

    $('body').on('click', '.giphy-img', function() {
        let state = $(this).attr('data-state');

        if (state === "still") {
            $(this).attr('src', $(this).attr('data-animate'))
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });

    $('#addSport').on('click', function (event) {
        event.preventDefault();
        //THIS FUNCTION TAKES .VAL FROM INPUT AS A VARIABLE
            clearTarget($('#buttons'));
            let newTopic = $('#sport-input').val().trim();
            newTopic.toString();
            //PUSHES THE .VAL ONTO THE ARRAY OF BUTTONS
            topics.push(newTopic);
            //CLEARS ALL BUTTONS AND REGENERATES ANEW
            buttonGenerator(topics);
        })

    function updateGiphyViewer(response) {
        console.log(response);
        let count = response.pagination.count;

        for (let i = 0; i < count; i++) {
            let imgStill = response.data[i].images.fixed_width_still.url;
            let imgAnimate = response.data[i].images.fixed_width.url;

            let $target = $('#giphy-viewer');
            let $giphyDiv = $('<div>').addClass('giphy-div');
            let $rating = $('<div>').html(`<h6>Rating: ${response.data[i].rating} </h6>`);
            let $giphy = $('<img>')
                .addClass('giphy-img')
                .addClass('rounded')
                .attr('src', imgStill)
                .attr('data-state', "still")
                .attr('data-still', imgStill)
                .attr('data-animate', imgAnimate);

            $giphyDiv.append($rating).append($giphy);
            $target.append($giphyDiv);
        } /*end for loop*/
    }

    function buttonGenerator(arr) {
        //function to generate button for array input
        let $target = $('#buttons');
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



