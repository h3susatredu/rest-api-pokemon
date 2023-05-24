// Työmuistissa on lista Pokemoneja. Tähän haetaan dataa localStoragesta ja/tai APIsta, riippuen tilanteesta. Aluksi tyhjä.
var pokemonList = [];
// Luodaan yksittäistä käsiteltävää pokemonia varten muuttuja, joka on aluksi tyhjä.
var handledPokemon = null;
// Luodaan lista, jossa on muistissa näytillä olevat pokemonit.
// Se tallennetaan myös localStorageen
displayList = [];


// Liitetään Search-nappiin onclick-funktiokutsu täältä JS:n puolelta
document.getElementById("searchBtn").addEventListener("click", function(event) {
    // estetään sivun uudelleenlataus submit-napista
    event.preventDefault();
    searchByText();
})
// Jos localStoragessa on displayListissä pokemoneja, näytetään ne sivulla heti
if(localStorage.getItem("displayList")){
    displayList = JSON.parse(localStorage.getItem("displayList"));

    for (let i = 0; i < displayList.length; i++) {
        displayPokemon(displayList[i]);
    }
}



function searchByText() {
    // haetaan käyttäjän syöttämä hakutermi searcText-muuttujaan
    const searchText = document.getElementById("search").value;

    // jos tekstikentässä ei ole mitään, yritetään hakea kaikki 1281 pokemonia, ensin localStoragesta, sitten APIsta
    if (searchText == "") {

    }
    else {
        // jos tekstikentässä on tekstiä, aletaan hakea yksittäistä pokemonia sillä nimellä,
        // eli jatketaan tästä aiemmin koodattuun tapaan
        checkLocalStorage(searchText);
    }
}

function checkLocalStorage(searchText) {
    // tarkistetaan, löytyykö localStoragen pokemonList-arraysta Pokemon annetulla nimellä

    // Jos localStoragen "pokemonList"-avainta ei ole ollenkaan, haetaan hakutermin mukaista osumaa heti APIsta
    if(localStorage.getItem("pokemonList") == null) {
        getDataFromAPI(searchText);
        return;
    }
    // Tähän kohtaan tullaan, jos "pokemonList"-avain löytyy localStoragesta. Sitten aletaan etsiä sieltä hakutermin mukaista Pokemonin nimeä.
    pokemonList = JSON.parse(localStorage.getItem("pokemonList"));
    // Huom: for of -luuppi. Normaali for-luuppikin toimisi.


    let matchFound = false;

    for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index];
        // Jos löytyy, käytetään löydettyä dataa localStoragesta
        if(pokemon.name === searchText) {
            // Tallennetaan löytyneen pokemonin data selaimen välimuistiin handledPokemon-muuttujaan
            handledPokemon = pokemon;
            matchFound = true;
            // lopetetaan luupin suoritus
            break;
        }
    }
    // jos localStoragesta löytyi pokemon..
    if(matchFound === true) {
        // näytetään handledPokemonin tiedot HTML-sivulla
        displayPokemon(handledPokemon);
        // lisätään näytettävä pokemon näytettävien pokemonien listaan
        displayList.push(handledPokemon);
        localStorage.setItem("displayList", JSON.stringify(displayList));
    }
    else {
        // Jos ei löydy, tehdään API-kutsu
        getDataFromAPI(searchText);
    }
}

async function getDataFromAPI(searchText) {
    // API-kutsu: GET hakutermiä vastaava Pokemon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`);
    // Kaivetaan APIn vastauksesta JSON-data
    const jsonData = await response.json();
    // Tallennetaan JSON-data selaimen "välimuistiin"/cacheen/RAMiin
    pokemonList.push(jsonData);
    // Tallennetaan välimuistissa oleva pokemonList localStorageen
    localStorage.setItem("pokemonList", JSON.stringify(pokemonList));

    // näytetään apista haettu pokemon sivulla
    displayPokemon(jsonData);
    // lisätään näytettävä pokemon näytettävien pokemonien listaan
    displayList.push(pokemon);
    localStorage.setItem("displayList", JSON.stringify(displayList));
}

async function getAllPokemonData() {
    let allPokemonRequest = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281";

    // TODO: tee tähän funktioon API-kutsu, jossa pyydetään GET-pyynnöllä
    // allPokemnoRequest -url, ja laitetaan vastauksesta löytyvä data talteen
    // data on lista 1281:sta pokemonista, joista näkyy nimi ja pokemonin oma url
    // Katso mallia ylemmän funktion alkuosasta
}


// lisää yksittäisen pokemonin tiedot näkymään sivulle
function displayPokemon(pokemon) {
    console.log("Displaying:" + pokemon.name);

    let pokeBox = document.createElement("div");

    pokeBox.innerHTML = `
    <h2 class="pokeTitle">${pokemon.name}</h2>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="pokeImage">
    `;

    document.getElementById("pokeList").appendChild(pokeBox);
}