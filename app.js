// Työmuistissa on lista Pokemoneja. Tähän haetaan dataa localStoragesta ja/tai APIsta, riippuen tilanteesta. Aluksi tyhjä.
var pokemonList = [];
// Luodaan yksittäistä käsiteltävää pokemonia varten muuttuja, joka on aluksi tyhjä.
var handledPokemon = null;
// Luodaan lista, jossa on muistissa näytillä olevat pokemonit.
// Se tallennetaan myös localStorageen
var displayList = [];


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
        alert("Please type a Pokemon name to search.");
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
        
        // jos displayListissä on jo haettu Pokemon, niin lopetetaan tähän
        for (let i = 0; i < displayList.length; i++) {
            if(displayList[i].name === searchText) {
                // haettu pokemon on jo displayListissä, älä näytä uudelleen!
                // lopetetaan tämän funktion (checkLocalStorage) suoritus tähän
                return;
            }
        }

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
    displayList.push(jsonData);
    localStorage.setItem("displayList", JSON.stringify(displayList));
}


// TODO: tee tähän funktioon API-kutsu, jossa pyydetään GET-pyynnöllä
// allPokemnoRequest -url, ja laitetaan vastauksesta löytyvä data talteen
// data on lista 1281:sta pokemonista, joista näkyy nimi ja pokemonin oma url
// Katso mallia ylemmän funktion alkuosasta
async function getAllPokemonData() {

    if( localStorage.getItem("allPokemonData") == null) { 
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281");
        const jsonData = await response.json();
        localStorage.setItem("allPokemonData", JSON.stringify(jsonData));
    }
    displayAllNamesList();
}

getAllPokemonData();


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


function displayAllNamesList() {
    // haetaan kaikkien pokemonien nimi- ja url -data localStoragesta
    const namesData = JSON.parse(localStorage.getItem("allPokemonData"));
    
    // ladataan kaikkien pokemonien nimet listView -näkymässä olevaan listaan
    let namesList = document.getElementById("list");
    for (let i = 0; i < namesData.results.length; i++) {

        // otetaan pokemonin id-numero sen urlista (numero alkaa urlin 34. merkistä ja voi olla enintään 5 merkkiä pitkä)
        let pokemonId = namesData.results[i].url.substr(34, 5);
        // korvataan id-numerosta mahdollisesti löytyvä /-merkki tyhjällä ""
        pokemonId = pokemonId.replace(/\/+$/, "");
        // luodaan nyt siivotulla pokemon id-numerolla pokemonin sen kuvan osoite
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
        // lisätään listaan listaelementti, jossa on pokemonin urlista tehdyn linkin sisällä pokemonin nimi ja kuva
        namesList.innerHTML += `<li class="listedName"><a href="${namesData.results[i].url}">${namesData.results[i].name} <img src="${imgUrl}" class="listedImage" /></a></li>`;
    }

    // ladataan searchViewin hakukentän dataListiin pokemonien nimet
    const pokemonNames = namesData.results.map(pokemon => pokemon.name);
    const dataList = document.getElementById("pokemonNames");
    pokemonNames.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        dataList.appendChild(option);
    });
}