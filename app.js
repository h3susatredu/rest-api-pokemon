// Työmuistissa on lista Pokemoneja. Tähän haetaan dataa localStoragesta ja/tai APIsta, riippuen tilanteesta. Aluksi tyhjä.
var pokemonList = [];
// Luodaan yksittäistä käsiteltävää pokemonia varten muuttuja, joka on aluksi tyhjä.
var handledPokemon = null;

function searchByText() {
    // haetaan käyttäjän syöttämä hakutermi searcText-muuttujaan
    const searchText = document.getElementById("search").value;
    checkLocalStorage(searchText);
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
    for (const pokemon of pokemonList) {
        // Jos löytyy, käytetään löydettyä dataa localStoragesta
        if(pokemon.name === searchText) {
            console.log("MATCH!! OSUMA!! LÖYTYI!!")
            // Tallennetaan löytyneen pokemonin data selaimen välimuistiin handledPokemon-muuttujaan
            handledPokemon = pokemon;
            // TODO: näytetään handledPokemonin tiedot HTML-sivulla
            displayPokemon(handledPokemon);
            return;
        }
        // Jos ei löydy, tehdään API-kutsu
        else {
            getDataFromAPI(searchText);
        }
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
}


function displayPokemon(pokemon) {
    console.log("Displaying:" + pokemon.name);
}