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
    const youtubeSearch = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&key=${youtubeKey}&maxResults=5`;

    await fetch(youtubeSearch)
    .then(function(response){
        return response.json();
    })
    .then(function(snippet){
        console.log(snippet);
        for(let i = 0; i < 5; i++){
            const title = snippet.items[i].snippet.title;
            const thumbnail = snippet.items[i].snippet.thumbnails.default.url;
            const videoID = snippet.items[i].id.videoId;

            const youtubeHTML = `<a href="https://www.youtube.com/watch?v=${videoID}">
                                    <div id='ytCard'>
                                    <h2>${title}</h2>
                                    <img src='${thumbnail}'>
                                    </div>
                                </a>`;
            $('.videos').append(youtubeHTML);
        }
    })
}


// runs functions with search input when the button is clicked
$('#searchBtn').click(() => {
    let videos = document.querySelector('.videos');
    var searchInput = $('#searchInput').val();
    container.removeAttribute("hidden");
    // clear the old content in container when the button is clicked
    videos.innerHTML = "";
    // if the search input is empty, don't add it to local storage or append the button
    if(searchInput == ""){
        return;
    };
    getPokemon(searchInput);
    //youtubeQuery(searchInput);
        
    // if the input name does not exist in the historyNameArray, add it to local storage and append the button
    
})

// function appendYoutubeInfo(data) {
//     const title = data.title;
//     const thumbnail = 
// }

function getPokemon(searchInput){
    
    var APIURL = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;
        fetch(APIURL)
        .then(function(response){
            if (response.status >=200 && response.status <=299) {
                return response.json();
            }else {
                $('#myModal').modal('show');
                $('.close-modal').hide();
                throw Error(response.statusText)
            }
    })
    .then(function(pokemon){
        var imageUrl = '';
        var imageIcon = document.querySelector('.image');
        var name = document.querySelector(".name");
        var pokemonType = document.querySelector('.types');
        var pokemonId = document.querySelector('.ID');
        var heightWeight = document.querySelector('.height-weight');
        var height = 0;
        var weight = 0;
        var ability = document.querySelector(".abilities");

        var stats = document.querySelector('.stats');
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
        imageIcon.setAttribute('src', imageUrl);


        if(historyNameArray.indexOf(searchInput) == -1 && historyNameArray.length < 8){
            // add name to local storage
            addNamesToLocalStorage(searchInput);
            // create and append the input name button
            var $historySection = $("#history-section");
            var $historyNamesButton = $("<button>");
            $historyNamesButton.html(searchInput);
            // register click event
            $historyNamesButton.click(function (){
                var thisBtnVal = $(this).html();
                // videos.innerHTML = "";
                getPokemon(thisBtnVal);
            });
            $historySection.append($historyNamesButton);
        }

        youtubeQuery(searchInput);
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
            // videos.innerHTML = "";
            getPokemon(thisBtnVal);
            youtubeQuery(thisBtnVal);
        });
        $historySection.append($historyNamesButton);
    } 
}
