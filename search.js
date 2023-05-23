// muuttujat koko skriptin käytössä:

// hakutermi (string)
// yksittäisen pokemonin data (JSON-objekti)
// tallennus päällä / pois (boolean)
// virheviestiteksti kun mitään ei löydy mistään (string)

// 1. haku käynnistyy, haetaan hakutermi lomakkeesta

// 2. tarkistetaan, onko localStoragessa haetun niminen pokemon
    // 2A. jos on..
        // laitetaan löytyneen pokemonin data välimuistiin muuttujaan
        // laitetaan muistiin myös esim. boolean, että pokemonia ei tarvitse tallentaa localStorageen uudelleen
    // 2B. jos ei ole, niin haetaan Pokeapista sillä nimellä
        // jos APIsta löytyi pokemon, tallennetaan se välimuistiin muuttujaan 
    
// 3. lopuksi tarkistetaan, onko meillä välimuistissa/muuttujassa tallessa löytynyt pokemon
    // jos on, niin näytetään sen tiedot sivulla
    // jos ei ole, näytetään virheviesti "ei sen nimistä pokemonia"

// 4. tarkistetaan aiemmin tallennettu boolean, pitääkö pokemon tallentaa localStorageen
    // jos pitää, tallennetaan