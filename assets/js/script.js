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

// function appendYoutubeInfo(data) {
//     const title = data.title;
//     const thumbnail = 
// }





        //replace this declaration with the text box value!!
//pokemonName = document.querySelector("text")
var pokemonName = "charmander";

var imageUrl = '';
var imageIcon = document.createElement('img');
var pokemonType = '';
var pokemonId = 0;
var height = 0;
var weight = 0;

                        //.value when query selector is in place
var APIURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;


function getPokemon(){
    fetch(APIURL)
    .then(function(response){
        return response.json()
    })
    .then(function(pokemon){
        height = pokemon.height;
        weight = pokemon.weight;
        pokemonId = pokemon.id;
        imageUrl = pokemon.sprites.other.dream_world.front_default;

        //image icon displays a picture of the pokemon
        imageIcon.setAttribute('src', imageUrl)
        
        pokemonType = pokemon.types[0].type.name
        console.log('height :>> ', height);
        console.log('weight :>> ', weight);
        console.log('pokemonType :>> ', pokemonType);
        console.log('pokemonId :>> ', pokemonId);
        console.log('image :>> ', imageIcon);
    })
}

//invoke the function to run

getPokemon();