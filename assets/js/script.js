// API Keys
const youtubeKey = 'AIzaSyDZydKsrsx6X3k5coX1yjxwzupOmTEanDY';
var container = document.querySelector('.container')
const LOCAL_STORAGE_KEY = "Names";

var historyNameArray = [];

// obtain history local storage data, use them to update historyNameArray and render history buttons
initLocalStorage();

function initLocalStorage() {
    var currentLocalStorageVal = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(currentLocalStorageVal != null) {
        historyNameArray = JSON.parse(currentLocalStorageVal);
        renderHistoryButtons(historyNameArray);
    }
}

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
    container.removeAttribute("hidden");
    getPokemon(searchInput);
    youtubeQuery(searchInput);
    // add name to local storage
    addNamesToLocalStorage(searchInput);

    //append the button
    var $historySection = $("#history-section");
    var $historyNamesButton = $("<button>");
    $historyNamesButton.html(searchInput);
    $historyNamesButton.click(function (){
        var thisBtnVal = $(this).html();
        getPokemon(thisBtnVal);
    });
    $historySection.append($historyNamesButton);
})

// function appendYoutubeInfo(data) {
//     const title = data.title;
//     const thumbnail = 
// }

function getPokemon(searchInput){

    //**temp placeholder to view changes **
    //searchInput = 'pikachu'
    //**temp placeholder to view changes **
    
    var APIURL = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;
    fetch(APIURL)
    .then(function(response){
        return response.json()
    })
    .then(function(pokemon){
        var imageUrl = '';
        var imageIcon = document.querySelector('.image');
        var name = document.querySelector(".name");
        var pokemonType = document.querySelector('.types')
        var pokemonId = document.querySelector('.ID');
        var heightWeight = document.querySelector('.height-weight')
        var height = 0;
        var weight = 0;
        var ability = document.querySelector(".abilities")

        var stats = document.querySelector('.stats')
        var hp = pokemon.stats[0].base_stat;
        var attack = pokemon.stats[1].base_stat;
        var defense = pokemon.stats[2].base_stat;
        var speed = pokemon.stats[5].base_stat;

        pokemonId.textContent = `ID# ${pokemon.id}`;
        imageUrl = pokemon.sprites.other.dream_world.front_default;
        name.textContent = pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1);

        pokemonType.textContent = 
            `Element Type: ${pokemon.types[0].type.name.charAt(0).toUpperCase()
            + pokemon.types[0].type.name.slice(1)}`;

        height = pokemon.height * 3.937008;
        weight = pokemon.weight * 0.2204623;
        heightWeight.textContent = `Height: ${height.toFixed(1)}in Weight: ${weight.toFixed(2)}lbs`;

        ability.textContent = 
            `Special Ability: ${pokemon.abilities[0].ability.name.charAt(0).toUpperCase() +
            pokemon.abilities[0].ability.name.slice(1)}`;

        stats.textContent = `HP: ${hp} Attack: ${attack} Defense: ${defense} Speed: ${speed}`;
        
        //image icon displays a picture of the pokemon
        imageIcon.setAttribute('src', imageUrl)
    })
}

// save input Pokemon names to local storage
function addNamesToLocalStorage(name){
    historyNameArray.push(name);
    // convert new array into string
    var stringifiedHistoryName = JSON.stringify(historyNameArray);
    // store string in local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedHistoryName);
}

// render names on the left side of webpage as buttons and register click event
function renderHistoryButtons(nameArray){
    var $historySection = $("#history-section");
    for(let i = 0; i < nameArray.length; i++){
        var names = nameArray[i];
        var $historyNamesButton = $("<button>");
        $historyNamesButton.html(names);
        $historyNamesButton.click(function (){
            var thisBtnVal = $(this).html();
            getPokemon(thisBtnVal);
        });
        $historySection.append($historyNamesButton);
    }
}

//**temp placeholder to view changes **
//getPokemon();
//**temp placeholder to view changes **
