// API Keys
const youtubeKey = 'AIzaSyDZydKsrsx6X3k5coX1yjxwzupOmTEanDY';

// Youtube Fetch Request
async function youtubeQuery(searchInput) {
    const youtubeSearch = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&key=${youtubeKey}&maxResults=1`;

    await fetch(youtubeSearch)
    .then(res => res.json())
    .then(result => {
        // Add the function that appends the youtube info to the page
        console.log(result)
    })
}

// runs functions with search input when the button is clicked
$('#searchBtn').click(() => {
    var searchInput = $('#searchInput').val();

    youtubeQuery(searchInput);
})

function appendYoutubeInfo() {
    
}