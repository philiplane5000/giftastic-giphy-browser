$(document).ready(function(){
    console.log("CONNECTED");
})

let sports = ["cricket", "football", "basketball", "lacrosse", "badminton", "field hockey", "surfing", "soccer", "tennis", "volleyball", "ice hockey"];

buttonGenerator(sports);

function buttonGenerator(arr) {
    //function to generate button for array input
    let $target = $('#sportsButtons');
    //if statement to run same function for single string item or value needed(!)
    arr.forEach(function(item){
        let $button = $('<button>');
        $button.text(`${item}`);
        $button.addClass(`${item}`);
        $target.append($button);
    });
}

