// variables declaration
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const MY_API_KEY = 'AIzaSyDRtZ69djmDxfG8YB9W1Hlmb93K88zSG50';

//getJSON
function getYouTubeApi(searchTerm, callback) {
    let params = {
        part: 'snippet',
        key: MY_API_KEY,
        q: searchTerm,
        type :'video',
        maxResults: 6
    }
    $.getJSON(YOUTUBE_SEARCH_URL, params, callback);
}

function displayResults(resultObject) {
    $('#resultsContainer').empty();
    let items = resultObject.items;
    console.log(items);
    for (let i=0; i<items.length; i++){
    $('#resultsContainer').append(
        `<div class="row">
            <div class=".col-xs-6" id="video">
                <a href='https://www.youtube.com/watch?v=${items[i].id.videoId}?autoplay=1' data-lightbox="https://www.youtube.com/watch?v=${items[i].id.videoId}?autoplay=1" rel="lightframe"><img src="${items[i].snippet.thumbnails.high.url}"></a>
            </div>
            <div class=".col-xs-6">
                <div class=".col-xs-6"><span>${items[i].snippet.title}</span></div>
                <div class=".col-xs-6"><span>${items[i].snippet.channelTitle}</span></div>
            </div>
        </div>
        `);
    }
}

$(document).ready(function (){
    $('#userSearchTerm').submit(function(event) {
        event.preventDefault();
        // get the search term and remove unnecessary white spaces
        let searchTerm= $(this).find('input[name="search"]').val().trim();
        getYouTubeApi(searchTerm, displayResults);
    });
});
