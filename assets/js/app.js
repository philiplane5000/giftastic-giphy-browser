$(document).ready(function(){

console.log("CONNECTED");

let sports = ["cricket", "football", "basketball", "lacrosse", "badminton", "field hockey", "surfing", "soccer", "tennis", "volleyball", "ice hockey"];

buttonGenerator(sports);

$('body').on('click', '.giphy-search-btn', function (event) {

    event.preventDefault();

    clearViewer();

    let query = $(this).attr('data-attribute');

    let queryURL = generateQueryURL(query);
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updateGiphyViewer)
  });

function updateGiphyViewer(response){
    
    // console.log(res.data[0].images.fixed_height.url);
    // console.log(res.data[0].rating);

//**************************************************************************************************/
  // Get from the form the number of results to display
  // API doesn't have a "limit" parameter, so we have to do this ourselves
  console.log(response);

  let count = response.pagination.count;

  console.log(count);

  for (let i = 0; i < count; i++) {

    let $target = $('#giphy-viewer');
     
    // let giphURL = response.data[i].images.fixed_height.url;
    // console.log(giphURL);
    // let giphRating = response.data[i].rating;
    // console.log(giphRating);

    let $giphyDiv = $('<div>').addClass('giph-div');

    let $rating = $('<div>').html(`<h6>Rating:${response.data[i].rating} </h6>`);
    let $giphy = $('<img>').attr('src', response.data[i].images.fixed_width.url);

    $giphyDiv.append($rating).append($giphy);
    $target.append($giphyDiv);

  } /*end for loop*/
//**************************************************************************************************/
}

function clearViewer() {
    $('#giphy-viewer').empty();
}

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
    let limitResultsTo = 9;

    let queryURL = `${baseURL}search?api_key=${apikey}&q=${searchFor}&limit=${limitResultsTo}`;
    queryURL.toString();

    console.log(queryURL);
    return queryURL;
}

}); /*END DOCUMENT READY*/



