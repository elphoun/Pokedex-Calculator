const pokemonNames = {
    "bulbasaur": "0001",
    "ivysaur": "0002",
    "venusaur": "0003",
    "charmander": "0004",
    "charmeleon": "0005",
    "charizard": "0006",
    "squirtle": "0007",
    "wartortle": "0008",
    "blastoise": "0009",
    "caterpie": "0010",
    "metapod": "0011",
    "butterfree": "0012",
    "weedle": "0013",
    "kakuna": "0014",
    "beedrill": "0015",
    "pidgey": "0016",
    "pidgeotto": "0017",
    "pidgeot": "0018",
    "rattata": "0019",
    "raticate": "0020",
    "spearow": "0021",
    "fearow": "0022",
    "ekans": "0023",
    "arbok": "0024",
    "pikachu": "0025",
    "raichu": "0026",
    "sandshrew": "0027",
    "sandslash": "0028",
    "nidoran♀": "0029",
    "nidorina": "0030",
    "nidoqueen": "0031",
    "nidoran♂": "0032",
    "nidorino": "0033",
    "nidoking": "0034",
    "clefairy": "0035",
    "clefable": "0036",
    "vulpix": "0037",
    "ninetales": "0038",
    "jigglypuff": "0039",
    "wigglytuff": "0040",
    "zubat": "0041",
    "golbat": "0042",
    "oddish": "0043",
    "gloom": "0044",
    "vileplume": "0045",
    "paras": "0046",
    "parasect": "0047",
    "venonat": "0048",
    "venomoth": "0049",
    "diglett": "0050",
    "dugtrio": "0051",
    "meowth": "0052",
    "persian": "0053",
    "psyduck": "0054",
    "golduck": "0055",
    "mankey": "0056",
    "primeape": "0057",
    "growlithe": "0058",
    "arcanine": "0059",
    "poliwag": "0060",
    "poliwhirl": "0061",
    "poliwrath": "0062",
    "abra": "0063",
    "kadabra": "0064",
    "alakazam": "0065",
    "machop": "0066",
    "machoke": "0067",
    "machamp": "0068",
    "bellsprout": "0069",
    "weepinbell": "0070",
    "victreebel": "0071",
    "tentacool": "0072",
    "tentacruel": "0073",
    "geodude": "0074",
    "graveler": "0075",
    "golem": "0076",
    "ponyta": "0077",
    "rapidash": "0078",
    "slowpoke": "0079",
    "slowbro": "0080",
    "magnemite": "0081",
    "magneton": "0082",
    "farfetch'd": "0083",
    "doduo": "0084",
    "dodrio": "0085",
    "seel": "0086",
    "dewgong": "0087",
    "grimer": "0088",
    "muk": "0089",
    "shellder": "0090",
    "cloyster": "0091",
    "gastly": "0092",
    "haunter": "0093",
    "gengar": "0094",
    "onix": "0095",
    "drowzee": "0096",
    "hypno": "0097",
    "krabby": "0098",
    "kingler": "0099",
    "voltorb": "0100",
    "electrode": "0101",
    "exeggcute": "0102",
    "exeggutor": "0103",
    "cubone": "0104",
    "marowak": "0105",
    "hitmonlee": "0106",
    "hitmonchan": "0107",
    "lickitung": "0108",
    "koffing": "0109",
    "weezing": "0110",
    "rhyhorn": "0111",
    "rhydon": "0112",
    "chansey": "0113",
    "tangela": "0114",
    "kangaskhan": "0115",
    "horsea": "0116",
    "seadra": "0117",
    "goldeen": "0118",
    "seaking": "0119",
    "staryu": "0120",
    "starmie": "0121",
    "mr. mime": "0122",
    "scyther": "0123",
    "jynx": "0124",
    "electabuzz": "0125",
    "magmar": "0126",
    "pinsir": "0127",
    "tauros": "0128",
    "magikarp": "0129",
    "gyarados": "0130",
    "lapras": "0131",
    "ditto": "0132",
    "eevee": "0133",
    "vaporeon": "0134",
    "jolteon": "0135",
    "flareon": "0136",
    "porygon": "0137",
    "omanyte": "0138",
    "omastar": "0139",
    "kabuto": "0140",
    "kabutops": "0141",
    "aerodactyl": "0142",
    "snorlax": "0143",
    "articuno": "0144",
    "zapdos": "0145",
    "moltres": "0146",
    "dratini": "0147",
    "dragonair": "0148",
    "dragonite": "0149",
    "mewtwo": "0150",
    "mew": "0151"
};

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('atk-input-box');
    const pokemonImage = document.getElementById('atk-sprite');
    const resultsDiv = document.querySelector('.search-bar-atk .results');

    // Set default image to substitute.png
    pokemonImage.src = 'sprites/pokemon/substitute.png';
    pokemonImage.alt = 'Substitute';

    // Function to update the image based on search input
    function updatePokemonImage() {
        const searchValue = searchInput.value.toLowerCase().trim();
        const searchTerm = pokemonNames[searchValue] || searchValue;
        pokemonImage.src = `sprites/pokemon/${searchTerm}.png`;
        pokemonImage.alt = searchTerm;
        pokemonImage.onerror = () => {
            pokemonImage.src = 'sprites/pokemon/substitute.png';
            pokemonImage.alt = 'Pokemon not found';
        };
    }

    // Add event listener for Enter key
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updatePokemonImage();
            if (resultsDiv) {
                resultsDiv.innerHTML = '';
            }
        }
    });

    // Initial update
    updatePokemonImage();
});
