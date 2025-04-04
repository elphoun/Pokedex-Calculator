const pokemonKanto = [
    "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", 
    "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", 
    "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", 
    "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", 
    "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", 
    "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", 
    "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", 
    "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", 
    "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", 
    "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", 
    "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", 
    "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", 
    "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", 
    "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", 
    "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", 
    "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", 
    "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", 
    "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", 
    "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", 
    "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", 
    "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", 
    "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", 
    "Mewtwo", "Mew"
];

const atkresultsBox = document.querySelector(".atk-results");
const atkinputBox = document.getElementById("atk-input-box");

atkinputBox.onkeyup = function(){
    let result = [];
    let input = atkinputBox.value;
    if (input.length) {
        result = pokemonKanto.filter((keyword)=>{
                return keyword.toLowerCase().includes(input.toLowerCase());
            });
        console.log(result);
    }
    atkdisplay(result);

    if (!result.length) {
        atkresultsBox.innerHTML = "";
    }
}

function atkdisplay(result) {
    const content = result.map((list)=>{
        return "<li onclick=atkselectInput(this)>" + list + "</li>";
    });
    atkresultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function atkselectInput(list) {
    atkinputBox.value = list.innerHTML;
    atkresultsBox.innerHTML = "";
    
    const searchValue = atkinputBox.value.toLowerCase().trim();
    const pokemonImage = document.getElementById('atk-sprite');

    const pokemonNumber = pokemonNames[searchValue];
    if (pokemonNumber) {
        pokemonImage.src = `sprites/pokemon/${pokemonNumber}.png`;
        pokemonImage.alt = searchValue;
    } else {
        pokemonImage.src = 'sprites/pokemon/substitute.png';
        pokemonImage.alt = 'Pokemon not found';
    }
}