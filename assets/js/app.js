$(document).ready(function(){

console.log("CONNECTED");

let sports = ["cricket", "football", "basketball", "lacrosse", "badminton", "field hockey", "surfing", "soccer", "tennis", "volleyball", "ice hockey"];

buttonGenerator(sports);

$('body').on('click', '.giphy-search-btn', function (event) {

    event.preventDefault();

    let query = $(this).attr('data-attribute');

    let queryURL = generateQueryURL(query);
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(res){
        console.log(res.data[0].images.fixed_height.url);
        console.log(res.data[0].rating);
    });

  });

function buttonGenerator(arr) {
    //function to generate button for array input
    let $target = $('#sportsButtons');
    //if statement to run same function for single string item or value needed(!)
    arr.forEach(function(item){
        let $button = $('<button>');
        $button.text(`${item}`);
        $button.addClass('giphy-search-btn btn btn-sm btn-info');
        $button.attr('data-attribute', item);
        $target.append($button);
    })}

function generateQueryURL(query) {

    let baseURL = "https://api.giphy.com/v1/gifs/";
    let apikey = "PW1vGxATHQSLxVgoWYhQmuqL7Dq0V9K0";
    let searchFor = query;
    let limitResultsTo = 5;

    let queryURL = `${baseURL}search?api_key=${apikey}&q=${searchFor}&limit=${limitResultsTo}`;
    queryURL.toString();

    console.log(queryURL);
    return queryURL;
}

}); /*END DOCUMENT READY*/



