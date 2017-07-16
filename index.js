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
        maxResults: 5
    }
    $.getJSON(YOUTUBE_SEARCH_URL, params, callback);
}

function displayResults(resultObject) {
    $('#resultsContainer').empty();
    let items = resultObject.items;
    for (let i=0; i<items.length; i++){
    $('#resultsContainer').append(
        `<div class="d-inline-block" id="video">
        <a href='https://www.youtube.com/watch?v=${items[i].id.videoId}'><img src="${items[i].snippet.thumbnails.default.url}"></a>
        </div>`);
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
